package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"time"
)

type MALClient struct {
	client   *http.Client
	cacheDir string
}

func NewMalClient(client *http.Client, cacheDir string) *MALClient {
	return &MALClient{
		client:   client,
		cacheDir: cacheDir,
	}
}

func (c *MALClient) Fetch(ctx context.Context) ([]*MALAnimeEntry, error) {
	var results []*MALAnimeEntry
	page := 1

	for {
		result, isLast, err := c.loadCache(page)
		if err != nil {
			return nil, err
		}

		if result == nil {
			result, err = c.fetchWithPage(ctx, page)
			if err != nil {
				if errors.Is(err, errRateLimited) {
					time.Sleep(2 * time.Second)
					continue
				}

				return nil, err
			}

			if err = c.saveCache(page, result); err != nil {
				return nil, err
			}

			isLast = !result.Pagination.HasNextPage
			fmt.Printf("[page = %d] fetched %d items\n", page, result.Pagination.Items.Count)
		}

		results = append(results, result)
		if isLast {
			break
		}

		page++
	}

	defer func() {
		fmt.Printf("last page = %d\n", page)
	}()

	return results, nil
}

func (c *MALClient) loadCache(page int) (*MALAnimeEntry, bool, error) {
	cachePath := fmt.Sprintf("%s/mal-%d.json", c.cacheDir, page)

	// cache not found
	if _, err := os.Stat(cachePath); err != nil {
		return nil, false, nil
	}

	fmt.Printf("[page = %d] %s exists, skipping\n", page, cachePath)

	file, err := os.ReadFile(cachePath)
	if err != nil {
		return nil, false, err
	}

	var result MALAnimeEntry
	if err = json.Unmarshal(file, &result); err != nil {
		return nil, false, err
	}

	return &result, !result.Pagination.HasNextPage, nil
}

func (c *MALClient) saveCache(page int, result *MALAnimeEntry) error {
	data, err := json.Marshal(result)
	if err != nil {
		return err
	}

	cachePath := fmt.Sprintf("%s/mal-%d.json", c.cacheDir, page)
	if err = os.WriteFile(cachePath, data, 0644); err != nil {
		return err
	}

	return nil
}

func (c *MALClient) fetchWithPage(ctx context.Context, page int) (*MALAnimeEntry, error) {
	requestURL, err := url.Parse("https://api.jikan.moe/v4/anime")
	if err != nil {
		return nil, err
	}

	query := requestURL.Query()
	query.Set("page", strconv.Itoa(page))
	query.Set("limit", "25")
	query.Set("order_by", "mal_id")
	requestURL.RawQuery = query.Encode()

	request, err := http.NewRequestWithContext(ctx, http.MethodGet, requestURL.String(), nil)
	if err != nil {
		return nil, err
	}

	request.Header.Set("Accept", "application/json")
	request.Header.Set("User-Agent", "collect-anime-data (+https://github.com/SlashNephy/.github)")

	response, err := c.client.Do(request)
	if err != nil {
		return nil, err
	}
	if response.StatusCode == http.StatusTooManyRequests {
		return nil, errRateLimited
	}

	defer func(body io.ReadCloser) {
		_ = body.Close()
	}(response.Body)

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	var entry MALAnimeEntry
	if err = json.Unmarshal(body, &entry); err != nil {
		return nil, err
	}

	return &entry, nil
}

type MALAnimeEntry struct {
	Data []struct {
		MalId  int    `json:"mal_id"`
		Url    string `json:"url"`
		Images struct {
			Jpg struct {
				ImageUrl      string `json:"image_url"`
				SmallImageUrl string `json:"small_image_url"`
				LargeImageUrl string `json:"large_image_url"`
			} `json:"jpg"`
			Webp struct {
				ImageUrl      string `json:"image_url"`
				SmallImageUrl string `json:"small_image_url"`
				LargeImageUrl string `json:"large_image_url"`
			} `json:"webp"`
		} `json:"images"`
		Trailer struct {
			YoutubeId string `json:"youtube_id"`
			Url       string `json:"url"`
			EmbedUrl  string `json:"embed_url"`
		} `json:"trailer"`
		Approved bool `json:"approved"`
		Titles   []struct {
			Type  string `json:"type"`
			Title string `json:"title"`
		} `json:"titles"`
		Title         string   `json:"title"`
		TitleEnglish  string   `json:"title_english"`
		TitleJapanese string   `json:"title_japanese"`
		TitleSynonyms []string `json:"title_synonyms"`
		Type          string   `json:"type"`
		Source        string   `json:"source"`
		Episodes      int      `json:"episodes"`
		Status        string   `json:"status"`
		Airing        bool     `json:"airing"`
		Aired         struct {
			From string `json:"from"`
			To   string `json:"to"`
			Prop struct {
				From struct {
					Day   int `json:"day"`
					Month int `json:"month"`
					Year  int `json:"year"`
				} `json:"from"`
				To struct {
					Day   int `json:"day"`
					Month int `json:"month"`
					Year  int `json:"year"`
				} `json:"to"`
				String string `json:"string"`
			} `json:"prop"`
		} `json:"aired"`
		Duration   string  `json:"duration"`
		Rating     string  `json:"rating"`
		Score      float64 `json:"score"`
		ScoredBy   int     `json:"scored_by"`
		Rank       int     `json:"rank"`
		Popularity int     `json:"popularity"`
		Members    int     `json:"members"`
		Favorites  int     `json:"favorites"`
		Synopsis   string  `json:"synopsis"`
		Background string  `json:"background"`
		Season     string  `json:"season"`
		Year       int     `json:"year"`
		Broadcast  struct {
			Day      string `json:"day"`
			Time     string `json:"time"`
			Timezone string `json:"timezone"`
			String   string `json:"string"`
		} `json:"broadcast"`
		Producers []struct {
			MalId int    `json:"mal_id"`
			Type  string `json:"type"`
			Name  string `json:"name"`
			Url   string `json:"url"`
		} `json:"producers"`
		Licensors []struct {
			MalId int    `json:"mal_id"`
			Type  string `json:"type"`
			Name  string `json:"name"`
			Url   string `json:"url"`
		} `json:"licensors"`
		Studios []struct {
			MalId int    `json:"mal_id"`
			Type  string `json:"type"`
			Name  string `json:"name"`
			Url   string `json:"url"`
		} `json:"studios"`
		Genres []struct {
			MalId int    `json:"mal_id"`
			Type  string `json:"type"`
			Name  string `json:"name"`
			Url   string `json:"url"`
		} `json:"genres"`
		ExplicitGenres []struct {
			MalId int    `json:"mal_id"`
			Type  string `json:"type"`
			Name  string `json:"name"`
			Url   string `json:"url"`
		} `json:"explicit_genres"`
		Themes []struct {
			MalId int    `json:"mal_id"`
			Type  string `json:"type"`
			Name  string `json:"name"`
			Url   string `json:"url"`
		} `json:"themes"`
		Demographics []struct {
			MalId int    `json:"mal_id"`
			Type  string `json:"type"`
			Name  string `json:"name"`
			Url   string `json:"url"`
		} `json:"demographics"`
	} `json:"data"`
	Pagination struct {
		LastVisiblePage int  `json:"last_visible_page"`
		HasNextPage     bool `json:"has_next_page"`
		Items           struct {
			Count   int `json:"count"`
			Total   int `json:"total"`
			PerPage int `json:"per_page"`
		} `json:"items"`
	} `json:"pagination"`
}
