/**
 * @name BetterPictureInPicture
 * @description Simple plugin that allows you to resize the picture-in-picture popup using the mouse wheel and the settings.
 * @version 0.0.4
 * @author nik9
 * @authorId 241175583709593600
 * @authorLink https://megaworld.space
 * @website https://github.com/nik9play/BetterDiscordPlugins/tree/main/Plugins/BetterPictureInPicture
 * @source https://raw.githubusercontent.com/nik9play/BetterDiscordPlugins/main/Releases/BetterPictureInPicture.plugin.js
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
const config = {
    main: "index.js",
    info: {
        name: "BetterPictureInPicture",
        authors: [
            {
                name: "nik9",
                discord_id: "241175583709593600",
                github_username: "nik9play"
            }
        ],
        version: "0.0.4",
        description: "Simple plugin that allows you to resize the picture-in-picture popup using the mouse wheel and the settings.",
        authorLink: "https://megaworld.space",
        paypalLink: "https://vk.com/app6887721_-197274096",
        github: "https://github.com/nik9play/BetterDiscordPlugins/tree/main/Plugins/BetterPictureInPicture",
        github_raw: "https://raw.githubusercontent.com/nik9play/BetterDiscordPlugins/main/Releases/BetterPictureInPicture.plugin.js"
    },
    changelog: [
        {
            title: "Fixes",
            items: [
                "Fix aspect ratio and tweak animation speed."
            ]
        },
        {
            title: "Mouse wheel zoom",
            items: [
                "Now you can change size of popup with mouse wheel."
            ]
        },
        {
            title: "Fixes",
            items: [
                "A lot of fixes."
            ]
        }
    ],
    defaultConfig: [
        {
            type: "slider",
            id: "popupsize",
            name: "PiP size",
            note: "Set the PiP popup size in percent",
            value: 100,
            min: 50,
            max: 300,
            markers: [
                50,
                75,
                100,
                125,
                150,
                175,
                200,
                250,
                300
            ],
            stickToMarkers: false,
            units: "%"
        },
        {
            type: "switch",
            id: "hideswitch",
            name: "Hide the PiP popup",
            note: "Hide the PiP popup completely",
            value: false
        },
        {
            type: "switch",
            id: "customswitch",
            name: "Set custom size",
            note: "Set custom size in pixels",
            value: false
        },
        {
            type: "textbox",
            id: "customwidth",
            name: "Width",
            note: "Set the width of popup",
            value: "320",
            placeholder: "Size in pixels"
        },
        {
            type: "textbox",
            id: "customheight",
            name: "Height",
            note: "Set the height of popup",
            value: "180",
            placeholder: "Size in pixels"
        }
    ]
};
class Dummy {
    constructor() {this._config = config;}
    start() {}
    stop() {}
}
 
if (!global.ZeresPluginLibrary) {
    BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.name ?? config.info.name} is missing. Please click Download Now to install it.`, {
        confirmText: "Download Now",
        cancelText: "Cancel",
        onConfirm: () => {
            require("request").get("https://betterdiscord.app/gh-redirect?id=9", async (err, resp, body) => {
                if (err) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
                if (resp.statusCode === 302) {
                    require("request").get(resp.headers.location, async (error, response, content) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), content, r));
                    });
                }
                else {
                    await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                }
            });
        }
    });
}
 
module.exports = !global.ZeresPluginLibrary ? Dummy : (([Plugin, Api]) => {
     const plugin = (Plugin, Library) => {
  const { Logger, DOMTools } = Library

  return class BetterPictureInPicture extends Plugin {

    onStart() {
      Logger.log('Started')
      this.setSize()
      // Logger.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }))
      if (this.settings['hideswitch']) {
        BdApi.injectCSS('betterpictureinpicturecss-hide', `div[class^="pictureInPictureWindow-"] {display:none!important}`)
      }

      BdApi.injectCSS('betterpictureinpicturecss-animation', `div[class^="pictureInPictureVideo-"] {transition: width .2s cubic-bezier(0.65,0.05,0.36,1), height .2s cubic-bezier(0.65,0.05,0.36,1);}`)
      BdApi.injectCSS('betterpictureinpicturecss', `div[class^="pictureInPictureVideo-"] {width: var(--bpip-width);height:var(--bpip-height)!important}`)

      DOMTools.observer.subscribe(changes => {
        if (changes.addedNodes.length > 0) {
          Logger.log('PiP started.')
          this.onPipStarted(changes.addedNodes[0])
        }
        if (changes.removedNodes.length > 0) {
          Logger.log('PiP stopped.')
        }
      },
      changes => { return changes.target?.classList[0]?.startsWith('pictureInPicture-') }
      )

      function wheelSize(e) {
        if (this.settings['customswitch']) {
          let scaleX = parseFloat(this.settings['customwidth'])
          scaleX += e.deltaY * -0.1
          let scaleY = parseFloat(this.settings['customheight'])
          scaleY += e.deltaY * -0.05625
          
          this.settings['customwidth'] = scaleX
          this.settings['customheight'] = scaleY
        } else {
          let scale = parseFloat(this.settings['popupsize'])
          scale += e.deltaY * -0.1
          if (scale < 50) scale = 50
          if (scale > 300) scale = 300
          this.settings['popupsize'] = scale
        }
        this.setSize()
        this.saveSettings(this.settings)
      }

      this.wheelSize = wheelSize.bind(this)
      
      const window = DOMTools.query('div[class^="pictureInPictureWindow-"]')
      if (window)
        this.onPipStarted(window)
    }

    onStop() {
      Logger.log('Stopped')
      BdApi.clearCSS('betterpictureinpicturecss')
      BdApi.clearCSS('betterpictureinpicturecss-animation')
      BdApi.clearCSS('betterpictureinpicturecss-hide')
      BdApi.clearCSS('betterpictureinpicture-vars')

      DOMTools.observer.unsubscribeAll()

      const window = DOMTools.query('div[class^="pictureInPictureWindow-"]')
      window?.removeEventListener('wheel', this.wheelSize)
    }

    onPipStarted(target) {
      target.addEventListener('wheel', this.wheelSize)
    }

    setSize() {
      Logger.log('Size changed')
      BdApi.clearCSS('betterpictureinpicture-vars')
      if (this.settings['customswitch']) {
        BdApi.injectCSS('betterpictureinpicture-vars', `:root {--bpip-width: ${this.settings['customwidth']}px; --bpip-height: ${this.settings['customheight']}px;}`)
      } else {
        const width = 320 * (this.settings['popupsize'] / 100)
        const height = 180 * (this.settings['popupsize'] / 100)

        BdApi.injectCSS('betterpictureinpicture-vars', `:root {--bpip-width: ${width}px; --bpip-height: ${height}px;}`)      }
    }

    getSettingsPanel() {
      const panel = this.buildSettingsPanel()
      panel.onChange = (e, v) => {
        if (e === 'customwidth' || e === 'customheight') {
          if (isNaN(v)) {
            this.settings[e] = this.defaultSettings[e]
          }
        }

        if (this.settings['hideswitch']) {
          BdApi.clearCSS('betterpictureinpicturecss-hide')
          BdApi.injectCSS('betterpictureinpicturecss-hide', `div[class^="pictureInPictureWindow-"] {display:none!important}`)
        } else {
          BdApi.clearCSS('betterpictureinpicturecss-hide')
        }

        this.saveSettings(this.settings)
        this.setSize()
      }
      return panel.getElement()
    }
  }
};
     return plugin(Plugin, Api);
})(global.ZeresPluginLibrary.buildPlugin(config));
/*@end@*/