package external

import (
	"context"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strconv"
	"time"

	"github.com/goccy/go-json"
	"go.uber.org/zap"
)

type MALClient struct {
	httpClient *http.Client
}

func NewMALClient(httpClient *http.Client) *MALClient {
	return &MALClient{
		httpClient: httpClient,
	}
}

type MALMediaEntry struct {
	Data []struct {
		Titles []struct {
			Type  string `json:"type"`
			Title string `json:"title"`
		} `json:"titles"`
	} `json:"data"`
	Pagination struct {
		HasNextPage bool `json:"has_next_page"`
	} `json:"pagination"`
}

func (c *MALClient) fetchMediaWithPage(ctx context.Context, page int) (*MALMediaEntry, error) {
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

	request.Header.Set("User-Agent", "collect-anime-data (+https://github.com/SlashNephy/.github)")

	response, err := c.httpClient.Do(request)
	if err != nil {
		return nil, err
	}
	if response.StatusCode == http.StatusTooManyRequests {
		return nil, ErrRateLimited
	}

	defer func(body io.ReadCloser) {
		_ = body.Close()
	}(response.Body)

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	var result MALMediaEntry
	if err = json.Unmarshal(body, &result); err != nil {
		return nil, err
	}

	zap.L().Info("fetched media", zap.Int("page", page))
	return &result, nil
}

func (c *MALClient) FetchMediaAll(ctx context.Context) ([]*MALMediaEntry, error) {
	var results []*MALMediaEntry
	page := 1

	defer func() {
		zap.L().Info("last page", zap.Int("page", page))
	}()

	for {
		result, err := c.fetchMediaWithPage(ctx, page)
		if err != nil {
			if errors.Is(err, ErrRateLimited) {
				time.Sleep(time.Second)
				continue
			}

			return nil, err
		}

		results = append(results, result)

		if !result.Pagination.HasNextPage || len(result.Data) == 0 {
			return results, nil
		}

		page++
	}
}

type CachingMALClient struct {
	*MALClient
	cacheDir string
}

func NewCachingMALClient(client *MALClient, cacheDir string) *CachingMALClient {
	return &CachingMALClient{
		MALClient: client,
		cacheDir:  cacheDir,
	}
}

func (c *CachingMALClient) FetchMediaAll(ctx context.Context) ([]*MALMediaEntry, error) {
	var results []*MALMediaEntry
	page := 1

	defer func() {
		zap.L().Info("last page", zap.Int("page", page))
	}()

	for {
		var result MALMediaEntry
		cachePath := fmt.Sprintf("%s/mal-%d.json", c.cacheDir, page)
		found, err := loadCache(cachePath, &result)
		if err != nil {
			return nil, err
		}

		if found {
			zap.L().Debug("use cached response", zap.Int("page", page), zap.String("path", cachePath))
		} else {
			r, err := c.fetchMediaWithPage(ctx, page)
			if err != nil {
				if errors.Is(err, ErrRateLimited) {
					time.Sleep(time.Second)
					continue
				}
			}

			result = *r
			if err = saveCache(cachePath, &result); err != nil {
				return nil, err
			}
		}

		results = append(results, &result)

		if !result.Pagination.HasNextPage || len(result.Data) == 0 {
			return results, nil
		}

		page++
	}
}
