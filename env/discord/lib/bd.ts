import { babel } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

import type { RollupOptions } from 'rollup'

export const buildOptions = (banner: Banner): RollupOptions => ({
  input: `src/${banner.id}.ts`,
  output: {
    banner: buildBanner(banner),
    file: `plugins/${banner.id}.plugin.js`,
  },
  plugins: [
    typescript(),
    babel({
      babelHelpers: 'bundled',
    }),
  ],
})

export type Banner = {
  id: string
  name: string
  author: {
    name: string
    id: number
  }
  version: string
  description: string
  invite?: string
  donate?: string
  patreon?: string
  website?: string
}

const buildBanner = (banner: Banner): string => {
  const lines: (string | null)[] = [
    '/**',
    ` * @name ${banner.name}`,
    ` * @author ${banner.author.name}`,
    ` * @authorId ${banner.author.id}`,
    ` * @version ${banner.version}`,
    ` * @description ${banner.description}`,
    banner.invite !== undefined ? ` * @invite ${banner.invite}` : null,
    banner.donate !== undefined ? ` * @donate ${banner.donate}` : null,
    banner.patreon !== undefined ? ` * @patreon https://www.patreon.com/${banner.patreon}` : null,
    banner.website !== undefined ? ` * @website ${banner.website}` : null,
    ` * @source https://github.com/SlashNephy/.github/tree/master/env/discord/src/${banner.id}.ts`,
    ` * @updateUrl https://github.com/SlashNephy/.github/tree/raw/env/discord/plugins/${banner.id}.plugin.js`,
    ' */',
    `/*@cc_on
@if (@_jscript)

    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\\\BetterDiscord\\\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \\n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();

@else@*/`,
  ]

  return lines.filter((line) => line).join('\n')
}
