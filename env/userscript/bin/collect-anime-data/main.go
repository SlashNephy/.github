package main

import (
	"context"
	"log/slog"
	"net/http"
	"os"

	"github.com/goccy/go-json"

	_ "collect-anime-data/logger"
	"collect-anime-data/processor"
)

func main() {
	ctx := context.Background()
	httpClient := &http.Client{}

	baseDir, err := getBaseDir()
	if err != nil {
		slog.ErrorContext(ctx, "failed to get base dir", slog.Any("err", err))
		return
	}

	cacheDir := baseDir + "/cache"
	anilist := processor.NewAniListProcessor(httpClient, cacheDir)
	mal := processor.NewMALProcessor(httpClient, cacheDir)

	anilistTitles, err := anilist.FetchTitles(ctx)
	if err != nil {
		slog.ErrorContext(ctx, "failed to fetch AniList titles", slog.Any("err", err))
		return
	}

	malTitles, err := mal.FetchTitles(ctx)
	if err != nil {
		slog.ErrorContext(ctx, "failed to fetch MAL titles", slog.Any("err", err))
		return
	}

	titles, err := processor.MergeTitles(append(anilistTitles, malTitles...)...)
	if err != nil {
		slog.ErrorContext(ctx, "failed to merge titles", slog.Any("err", err))
		return
	}

	content, err := json.Marshal(titles)
	if err != nil {
		slog.ErrorContext(ctx, "failed to marshal titles", slog.Any("err", err))
		return
	}

	outputPath := baseDir + "/dist/titles.json"
	if err = os.WriteFile(outputPath, content, 0644); err != nil {
		slog.ErrorContext(ctx, "failed to write titles.json", slog.Any("err", err))
		return
	}
}

func getBaseDir() (string, error) {
	baseDir, ok := os.LookupEnv("BASE_DIR")
	if ok {
		return baseDir, nil
	}

	homeDir, err := os.UserHomeDir()
	if err != nil {
		return "", err
	}

	return homeDir + "/.github/env/userscript/bin/collect-anime-data", nil
}
