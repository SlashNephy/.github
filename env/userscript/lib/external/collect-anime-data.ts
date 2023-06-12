export type AnimeTitleMap = Record<string, string[]>

export async function fetchAnimeTitles(branch = 'master'): Promise<AnimeTitleMap> {
  const response = await fetch(
    `https://raw.githubusercontent.com/SlashNephy/.github/${branch}/env/userscript/bin/collect-anime-data/dist/titles.json`
  )
  return response.json()
}
