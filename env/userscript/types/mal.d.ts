export type GetAnimeScoreResponse = {
  id: number
  title: string
  main_picture: {
    medium: string
    large: string
  }
  mean: number | null
}
