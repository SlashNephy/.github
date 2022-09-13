# .github

My dotfiles and GitHub Action reusable workflows collection

## Contents

| path                | description                            | workflow                                                                                                                                                                                           |
|---------------------|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `env/$env`          | Dotfiles and configuration files       | below                                                                                                                                                                                              |
| `script`            | All-in-one installation/backup scripts | [![Check .github/script](https://github.com/SlashNephy/.github/actions/workflows/_check-script.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-script.yml)          |
| `.github/workflows` | Shared reusable workflows              | [![Check .github/workflows](https://github.com/SlashNephy/.github/actions/workflows/_check-workflows.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-workflows.yml) |

| `$env`       | description                  | workflow                                                                                                                                                                                              |
|--------------|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| discord      | BetterDiscord plugins/themes | [![Check .github/discord](https://github.com/SlashNephy/.github/actions/workflows/_check-discord.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-discord.yml)          |
| editorconfig | Editorconfig configurations  | none                                                                                                                                                                                                  |
| eslint       | ESLint rules                 | [![Check .github/eslint](https://github.com/SlashNephy/.github/actions/workflows/_check-eslint.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-eslint.yml)             |
| git          | Git configurations           | none                                                                                                                                                                                                  |
| github       | GitHub tools                 | [![Check .github/github](https://github.com/SlashNephy/.github/actions/workflows/_check-github.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-github.yml)             |
| gradle       | Gradle plugins               | [![Check .github/gradle](https://github.com/SlashNephy/.github/actions/workflows/_check-gradle.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-gradle.yml)             |
| homebrew     | Homebrew installed list      | none                                                                                                                                                                                                  |
| htop         | htop configurations          | none                                                                                                                                                                                                  |
| jest         | Jest configurations          | [![Check .github/jest](https://github.com/SlashNephy/.github/actions/workflows/_check-jest.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-jest.yml)                   |
| ls           | ls configurations            | none                                                                                                                                                                                                  |
| nano         | nano configurations          | none                                                                                                                                                                                                  |
| pacman       | pacman installed list        | none                                                                                                                                                                                                  |
| prettier     | prettier configurations      | [![Check .github/prettier](https://github.com/SlashNephy/.github/actions/workflows/_check-prettier.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-prettier.yml)       |
| renovate     | renovate configurations      | [![Check .github/renovate](https://github.com/SlashNephy/.github/actions/workflows/_check-renovate.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-renovate.yml)       |
| ssh          | OpenSSH configurations       | none                                                                                                                                                                                                  |
| stylelint    | stylelint rules              | [![Check .github/stylelint](https://github.com/SlashNephy/.github/actions/workflows/_check-stylelint.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-stylelint.yml)    |
| textlint     | textlint rules               | [![Check .github/textlint](https://github.com/SlashNephy/.github/actions/workflows/_check-textlint.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-textlint.yml)       |
| typescript   | TypeScript extensions        | [![Check .github/typescript](https://github.com/SlashNephy/.github/actions/workflows/_check-typescript.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-typescript.yml) |
| userscript   | UserScript collection        | [![Check .github/userscript](https://github.com/SlashNephy/.github/actions/workflows/_check-userscript.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-userscript.yml) |
| userstyle    | UserCSS collection           | none                                                                                                                                                                                                  |
| wsl          | WSL configurations           | none                                                                                                                                                                                                  |
| yamlfmt      | yamlfmt rules                | none                                                                                                                                                                                                  |
| yamllint     | yamllint rules               | none                                                                                                                                                                                                  |
| yarn         | Yarn configurations          | none                                                                                                                                                                                                  |
| zsh          | zsh profiles                 | none                                                                                                                                                                                                  |


## Restore the environment

### Arch Linux / macOS

```console
$ git clone git@github.com:SlashNephy/.github.git ~/.github
$ bash ~/.github/script/install.sh
```

### Windows

```console
$ git clone git@github.com:SlashNephy/.github.git ~\.github
$ powershell ~\.github\script\install.ps1
```
