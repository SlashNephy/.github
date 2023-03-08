export type DefaultLanguage = 'en'
export type Language = 'ja' | DefaultLanguage
export type Localization = Partial<Record<Exclude<Language, DefaultLanguage>, string>> & Record<DefaultLanguage, string>

export class LocalizableString {
  public constructor(public readonly localization: Localization) {}

  private static _orEmpty(a: string | undefined, b: string): string {
    return a !== undefined && a.length > 0 ? a : b
  }

  public toString(): string {
    switch (navigator.language) {
      case 'ja':
        return LocalizableString._orEmpty(this.localization.ja, this.localization.en)
      default:
        return this.localization.en
    }
  }

  public format(...args: unknown[]): string {
    return this.toString().replace(
      /{(\d+)}/g,
      (match: string, index: number): string => args[index]?.toString() ?? 'undefined'
    )
  }

  public toError(): Error {
    return new Error(this.toString())
  }
}
