package main

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
)

func main() {
	ctx := context.Background()
	client := http.DefaultClient

	homeDir, err := os.UserHomeDir()
	if err != nil {
		panic(err)
	}

	outDir := homeDir + "/.github/env/userscript/bin/collect-anime-data/dist"
	mal := NewMalClient(client, outDir)
	entries, err := mal.Fetch(ctx)
	if err != nil {
		panic(err)
	}

	titles := map[string][]string{}
	for _, entry := range entries {
		for _, anime := range entry.Data {
			var (
				japaneseTitles    []string
				nonJapaneseTitles []string
			)
			for _, title := range anime.Titles {
				if title.Type == "Japanese" {
					japaneseTitles = append(japaneseTitles, title.Title)
				} else {
					nonJapaneseTitles = append(nonJapaneseTitles, title.Title)
				}
			}

			if len(japaneseTitles) == 0 {
				continue
			}

			// trim duplicates
			japaneseTitles = removeDuplicate(japaneseTitles)
			nonJapaneseTitles = removeDuplicate(nonJapaneseTitles)

			for _, title := range nonJapaneseTitles {
				// skip if same title
				if len(japaneseTitles) == 1 && title == japaneseTitles[0] {
					continue
				}

				if existingJapaneseTitles, ok := titles[title]; ok {
					titles[title] = removeDuplicate(append(existingJapaneseTitles, japaneseTitles...))
				} else {
					titles[title] = japaneseTitles
				}
			}
		}
	}

	content, err := json.Marshal(titles)
	if err != nil {
		panic(err)
	}

	if err = os.WriteFile(outDir+"/titles.json", content, 0644); err != nil {
		panic(err)
	}
}

func removeDuplicate(slice []string) []string {
	keys := map[string]bool{}
	var result []string
	for _, item := range slice {
		if _, value := keys[item]; !value {
			keys[item] = true
			result = append(result, item)
		}
	}

	return result
}
