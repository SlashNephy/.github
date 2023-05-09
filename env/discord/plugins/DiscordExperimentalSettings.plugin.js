/**
 * @name Discord Experimental Settings
 * @author SlashNephy
 * @authorId 187577389419724800
 * @version 0.1.1
 * @description Enable hidden Discord Experimental Settings.
 * @source https://github.com/SlashNephy/.github/tree/master/env/discord/src/DiscordExperimentalSettings.ts
 * @updateUrl https://github.com/SlashNephy/.github/tree/raw/env/discord/plugins/DiscordExperimentalSettings.plugin.js
 */
/*@cc_on
@if (@_jscript)

    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();

@else@*/
const main = () => {
    let wpRequire;
    window.webpackChunkdiscord_app.push([
        [Math.random()],
        {},
        (req) => {
            wpRequire = req;
        },
    ]);
    const mod = Object.values(wpRequire.c).find((x) => typeof x?.exports?.default?.isDeveloper !== 'undefined');
    const usermod = Object.values(wpRequire.c).find((x) => x?.exports?.default?.getUsers);
    const nodes = Object.values(mod.exports.default._dispatcher._actionHandlers._dependencyGraph.nodes);
    try {
        nodes
            .find((x) => x.name == 'ExperimentStore')
            .actionHandler.CONNECTION_OPEN({ user: { flags: 1 }, type: 'CONNECTION_OPEN' });
    }
    catch (e) { }
    const oldGetUser = usermod.exports.default.__proto__.getCurrentUser;
    usermod.exports.default.__proto__.getCurrentUser = () => ({ hasFlag: () => true });
    nodes.find((x) => x.name == 'DeveloperExperimentStore').actionHandler.CONNECTION_OPEN();
    usermod.exports.default.__proto__.getCurrentUser = oldGetUser;
};
module.exports = class {
    start() {
        main();
    }
    stop() { }
};
