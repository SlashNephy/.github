package processor

import (
	"context"
	"net/http"

	"collect-anime-data/external"
)

type AniListProcessor struct {
	client *external.CachingAniListClient
}

func NewAniListProcessor(httpClient *http.Client, cacheDir string) *AniListProcessor {
	return &AniListProcessor{
		client: external.NewCachingAniListClient(external.NewAniListClient(httpClient), cacheDir),
	}
}

func (p *AniListProcessor) FetchTitles(ctx context.Context) ([]*MediaTitle, error) {
	results, err := p.client.FetchMediaAll(ctx)
	if err != nil {
		return nil, err
	}

	var titles []*MediaTitle
	for _, result := range results {
		for _, media := range result.Page.Media {
			if media.Title.Native == nil {
				continue
			}

			title := NewMediaTitle()
			if media.Title.English != nil {
				title.English.Add(*media.Title.English)
			}
			if media.Title.Romaji != nil {
				title.English.Add(*media.Title.Romaji)
			}
			title.Japanese.Add(*media.Title.Native)

			titles = append(titles, title)
		}
	}

	return titles, nil
}

var _ Service = &MALProcessor{}
