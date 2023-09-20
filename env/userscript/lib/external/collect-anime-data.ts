export type AnimeTitleMap = Record<string, string[]>

export async function fetchAnimeTitles(branch = 'master'): Promise<AnimeTitleMap> {
  const response = await fetch(
    `https://raw.githubusercontent.com/SlashNephy/anime-titles-map/${branch}/dist/japanese.json`
  )
  return response.json()
}
