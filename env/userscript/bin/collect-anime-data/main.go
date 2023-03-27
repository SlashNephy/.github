package main

import (
	"context"
	"net/http"
	"os"

	"github.com/goccy/go-json"
	"go.uber.org/zap"

	_ "collect-anime-data/logger"
	"collect-anime-data/processor"
)

func main() {
	ctx := context.Background()
	httpClient := http.DefaultClient

	baseDir, err := getBaseDir()
	if err != nil {
		zap.L().Fatal("failed to get base dir", zap.Error(err))
	}

	cacheDir := baseDir + "/cache"
	anilist := processor.NewAniListProcessor(httpClient, cacheDir)
	mal := processor.NewMALProcessor(httpClient, cacheDir)

	anilistTitles, err := anilist.FetchTitles(ctx)
	if err != nil {
		zap.L().Fatal("failed to fetch AniList titles", zap.Error(err))
	}

	malTitles, err := mal.FetchTitles(ctx)
	if err != nil {
		zap.L().Fatal("failed to fetch MAL titles", zap.Error(err))
	}

	titles, err := processor.MergeTitles(append(anilistTitles, malTitles...)...)
	if err != nil {
		zap.L().Fatal("failed to merge titles", zap.Error(err))
	}

	content, err := json.Marshal(titles)
	if err != nil {
		zap.L().Fatal("failed to marshal titles", zap.Error(err))
	}

	outputPath := baseDir + "/dist/titles.json"
	if err = os.WriteFile(outputPath, content, 0644); err != nil {
		zap.L().Fatal("failed to write titles.json", zap.Error(err))
	}
}

func getBaseDir() (string, error) {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return "", err
	}

	return homeDir + "/.github/env/userscript/bin/collect-anime-data", nil
}
