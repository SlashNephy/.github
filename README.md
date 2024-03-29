# .github

## Contents

| path                | description                            | workflow                                                                                                                                                                                                                 |
|---------------------|----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `env/$env`          | Dotfiles and configuration files       | below                                                                                                                                                                                                                    |
| `script`            | All-in-one installation/backup scripts | [![Check .github/script](https://github.com/SlashNephy/.github/actions/workflows/_check-script.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-script.yml?query=branch%3Amaster)          |
| `.github/workflows` | Shared reusable workflows              | [![Check .github/workflows](https://github.com/SlashNephy/.github/actions/workflows/_check-workflows.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-workflows.yml?query=branch%3Amaster) |

| `$env`         | description                                                                                           | workflow                                                                                                                                                                                                                    |
|----------------|-------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `discord`      | [BetterDiscord](https://betterdiscord.app/) plugins / themes                                          | [![Check .github/discord](https://github.com/SlashNephy/.github/actions/workflows/_check-discord.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-discord.yml?query=branch%3Amaster)          |
| `git`          | [Git](https://git-scm.com/) configurations                                                            | none                                                                                                                                                                                                                        |
| `gradle`       | [Gradle](https://gradle.org/) plugins                                                                 | [![Check .github/gradle](https://github.com/SlashNephy/.github/actions/workflows/_check-gradle.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-gradle.yml?query=branch%3Amaster)             |
| `homebrew`     | [Homebrew](https://brew.sh/index_ja) installed list                                                   | none                                                                                                                                                                                                                        |
| `htop`         | [htop](https://htop.dev/) configurations                                                              | none                                                                                                                                                                                                                        |
| `jest`         | [Jest](https://jestjs.io/ja/) configurations                                                          | [![Check .github/jest](https://github.com/SlashNephy/.github/actions/workflows/_check-jest.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-jest.yml?query=branch%3Amaster)                   |
| `ls`           | [ls](https://github.com/coreutils/coreutils/blob/master/src/ls.c) configurations                      | none                                                                                                                                                                                                                        |
| `nano`         | [nano](https://nano-editor.org/) configurations                                                       | none                                                                                                                                                                                                                        |
| `pacman`       | [pacman](https://archlinux.org/pacman/) installed list                                                | none                                                                                                                                                                                                                        |
| `renovate`     | [renovate](https://renovatebot.com/) configurations                                                   | [![Check .github/renovate](https://github.com/SlashNephy/.github/actions/workflows/_check-renovate.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-renovate.yml?query=branch%3Amaster)       |
| `ssh`          | [OpenSSH](https://www.openssh.com/) configurations                                                    | none                                                                                                                                                                                                                        |
| `stylelint`    | [stylelint](https://stylelint.io/) rules                                                              | [![Check .github/stylelint](https://github.com/SlashNephy/.github/actions/workflows/_check-stylelint.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-stylelint.yml?query=branch%3Amaster)    |
| `textlint`     | [textlint](https://textlint.github.io/) rules                                                         | [![Check .github/textlint](https://github.com/SlashNephy/.github/actions/workflows/_check-textlint.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-textlint.yml?query=branch%3Amaster)       |
| `typescript`   | [TypeScript](https://www.typescriptlang.org/) extensions                                              | [![Check .github/typescript](https://github.com/SlashNephy/.github/actions/workflows/_check-typescript.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-typescript.yml?query=branch%3Amaster) |
| `userstyle`    | UserCSS collection (mainly developed for [Stylus](https://add0n.com/stylus.html))                     | [![Check .github/userstyle](https://github.com/SlashNephy/.github/actions/workflows/_check-userstyle.yml/badge.svg)](https://github.com/SlashNephy/.github/actions/workflows/_check-userstyle.yml?query=branch%3Amaster)    |
| `wsl`          | [Windows Subsystem for Linux](https://docs.microsoft.com/ja-jp/windows/wsl/install) configurations    | none                                                                                                                                                                                                                        |
| `yamlfmt`      | [yamlfmt](https://github.com/google/yamlfmt) rules                                                    | none                                                                                                                                                                                                                        |
| `yamllint`     | [yamllint](https://yamllint.readthedocs.io/) rules                                                    | none                                                                                                                                                                                                                        |
| `yarn`         | [Yarn](https://yarnpkg.com/) configurations                                                           | none                                                                                                                                                                                                                        |
| `zsh`          | [zsh](https://www.zsh.org/) profiles                                                                  | none                                                                                                                                                                                                                        |

## Restore the environment

### Arch Linux / macOS

```console
$ git clone git@github.com:SlashNephy/.github.git ~/.github
$ bash ~/.github/script/install.sh
```

### Windows

```console
$ git clone git@github.com:SlashNephy/.github.git ~\.github
$ pwsh .github\script\install.ps1
```
