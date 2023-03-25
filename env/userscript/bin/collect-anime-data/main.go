package main

import (
	"context"
	"net/http"
	"os"
)

func main() {
	ctx := context.Background()
	client := http.DefaultClient

	baseDir, err := getBaseDir()
	if err != nil {
		panic(err)
	}

	mal := NewMalClient(client, baseDir+"/cache")
	entries, err := mal.Fetch(ctx)
	if err != nil {
		panic(err)
	}

	titles := mergeTitles(entries)
	if err = dumpTitles(titles, baseDir+"/dist"); err != nil {
		panic(err)
	}
}

func getBaseDir() (string, error) {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return "", err
	}

	return homeDir + "/.github/env/userscript/bin/collect-anime-data", nil
}
