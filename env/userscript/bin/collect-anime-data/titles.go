package main

import (
	"encoding/json"
	"os"
)

type Titles map[string][]string

func mergeTitles(entries []*MALAnimeEntry) Titles {
	titles := Titles{}

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

	return titles
}

func dumpTitles(titles Titles, outDir string) error {
	content, err := json.Marshal(titles)
	if err != nil {
		return err
	}

	return os.WriteFile(outDir+"/titles.json", content, 0644)
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
