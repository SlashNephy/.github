/**
 * @name AutoIdleOnAFK
 * @authorLink https://github.com/RoguedBear
 * @version 0.3.0
 * @website https://github.com/RoguedBear/BetterDiscordPlugin-AutoIdleOnAFK
 * @source https://github.com/RoguedBear/BetterDiscordPlugin-AutoIdleOnAFK/releases/latest/download/AutoIdleOnAFK.plugin.js
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

module.exports = (() => {
    const config = {"info":{"name":"AutoIdleOnAFK","authors":[{"name":"RoguedBear","github_username":"RoguedBear"}],"authorLink":"https://github.com/RoguedBear","version":"0.3.0","description":"Automatically updates your discord status to 'idle' when you haven't opened your discord client for more than 5 minutes.\nPlugin only works when your status is 'online' and you are not in a voice channel. \n\nFor Bugs or Feature Requests open an issue on my Github","github":"https://github.com/RoguedBear/BetterDiscordPlugin-AutoIdleOnAFK","github_raw":"https://github.com/RoguedBear/BetterDiscordPlugin-AutoIdleOnAFK/releases/latest/download/AutoIdleOnAFK.plugin.js"},"changelog":[{"type":"added","title":"What's New?","items":["A settings toggle that changes status from AFK to `online` even if this plugin didn't make the change. Useful for multiple devices. *[Disabled by default]* \n(thanks Bobbyl140!)","A settings toggle to disable toast notification `\"Changing status back to online\"`. \n*[notifications Enabled by default]*"]},{"title":"~~~~~~~~~~~~~~~","type":"progress","items":["If you find any bugs or have some feature requests, feel free to open an issue on this plugin's Github","https://github.com/RoguedBear/BetterDiscordPlugin-AutoIdleOnAFK/issues"]}],"main":"index.js","DEBUG":false,"DEBUG_ActuallyChangeStatus":false,"defaultConfig":[{"type":"radio","name":"Change Status To:","note":"the status selected will be switched to when AFK. default: Idle","id":"afkStatus","value":"idle","options":[{"name":"Idle","value":"idle"},{"name":"Invisible","value":"invisible"},{"name":"Do Not Disturb","value":"dnd"}]},{"type":"slider","name":"AFK Timeout (minutes)","note":"minutes to wait before changing your status to Idle/Invisible","id":"afkTimeout","value":5,"defaultValue":5,"min":5,"max":30,"units":"min","markers":[5,10,15,20,25,30]},{"type":"slider","name":"Back To Online Delay (Grace/Cooldown Period)","note":"seconds to wait before changing your status back to Online. if you close or unfocus discord window, status will not be changed","id":"backToOnlineDelay","defaultValue":10,"value":10,"min":5,"max":120,"units":"s","markers":[5,10,30,60,90,120]},{"type":"switch","name":"Always Revert To Online","note":"Come back online even if this plugin didn't change your status. Useful for multiple devices.","id":"alwaysOnline","value":false,"defaultValue":false},{"type":"switch","name":"Show toast messages?","note":"toggles the visibility of \"Changing status back to online\" toast message","id":"showToasts","defaultValue":true,"value":true}]};

    return !global.ZeresPluginLibrary ? class {
        constructor() {this._config = config;}
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Library) => {
    const { Logger, DiscordModules } = Library;
    const {
        SelectedChannelStore: { getVoiceChannelId },
    } = DiscordModules;

    const randomStatusModule = BdApi.findAllModules(
        (m) => m.default && m.default.status
    )[0];
    const UpdateRemoteSettingsModule = BdApi.findModuleByProps(
        "updateRemoteSettings"
    );

    var DEBUG = false;
    function log_debug(module, ...message) {
        if (DEBUG !== true) {
            return;
        } else {
            Logger.debug(module, ...message);
        }
    }

    return class AutoIdleOnAFK extends Plugin {
        constructor() {
            super();

            this.getSettingsPanel = () => {
                return this.buildSettingsPanel().getElement();
            };

            // Some instance variables
            this.afkTimeoutID = undefined; // timeout set by onBlur
            this.backFromAFKTimeoutID = undefined; // timeout set by onFocus
            // key used as a flag to detect if afk was set by the plugin or manually by user
            this.keyIdleSetByPlugin = "IdleSetByPlugin";

            this.OnBlurBounded = this.onBlurFunction.bind(this);
            this.boundOnFocusBounded = this.onFocusFunction.bind(this);
        }

        onStart() {
            if (this._config.DEBUG === true) {
                DEBUG = true;
                log_debug(this);
                log_debug("Current status: " + this.currentStatus());
                log_debug("In Voice Channel: " + this.inVoiceChannel());
                log_debug(
                    "onlineStatusAndNotInVC: " + this.onlineStatusAndNotInVC()
                );
            }
            window.addEventListener("blur", this.OnBlurBounded);
            window.addEventListener("focus", this.boundOnFocusBounded);
        }

        onStop() {
            clearTimeout(this.afkTimeoutID);
            clearTimeout(this.backFromAFKTimeoutID);
            window.removeEventListener("blur", this.OnBlurBounded);
            window.removeEventListener("focus", this.boundOnFocusBounded);
        }

        onBlurFunction() {
            // TODO: remove this
            log_debug("Focus lost from discord window");

            // if user closes discord before the backToOnlineTimeout, clear the
            // pending timeout (if it even exists)
            this.backFromAFKTimeoutID = this.cancelTimeout(
                this.backFromAFKTimeoutID
            );

            var __afkSetByPlugin = BdApi.loadData(
                this._config.info.name,
                this.keyIdleSetByPlugin
            );
            var inVoiceChannelAndIdleSetByPlugin =
                this.inVoiceChannel() && __afkSetByPlugin;

            var inVoiceChannelAndAlwaysOnlineEnabled =
                this.inVoiceChannel() && this.settings.alwaysOnline;

            if (this.onlineStatusAndNotInVC()) {
                var _timeout_ms =
                    this.settings.afkTimeout * (DEBUG ? 2 : 60) * 1000;
                log_debug("setting timeout of " + _timeout_ms + "ms");
                this.afkTimeoutID = setTimeout(() => {
                    if (this.onlineStatusAndNotInVC()) {
                        this.updateStatus(this.settings.afkStatus);
                        BdApi.saveData(
                            this._config.info.name,
                            this.keyIdleSetByPlugin,
                            true
                        );
                    }
                    // If DEBUG is enabled then keep a shorter duration than 60s
                }, _timeout_ms); // converting min to ms
            } else if (
                // if the user is in a VC, idle was set by plugin &
                // their current status == afkStatus
                (inVoiceChannelAndIdleSetByPlugin ||
                    // OR, is user in VC and always online is enabled
                    inVoiceChannelAndAlwaysOnlineEnabled) &&
                this.currentStatus() == this.settings.afkStatus
            ) {
                this.updateStatus("online");
                this.showToast("Changing status back to online, You are in VC");
                BdApi.saveData(
                    this._config.info.name,
                    this.keyIdleSetByPlugin,
                    false
                );
            }
        }

        onFocusFunction() {
            // TODO: remove this
            log_debug("Discord window in focus now");

            // if user opens discord before the afkTimeout, clear the pending
            // timeout (if it even exists)
            this.afkTimeoutID = this.cancelTimeout(this.afkTimeoutID);

            log_debug(
                "Setting timeout of " +
                    this.settings.backToOnlineDelay * 1000 +
                    " ms"
            );
            this.backFromAFKTimeoutID = setTimeout(() => {
                // TODO: Refactor/comment out/test more this part
                var __afkSetByPlugin = BdApi.loadData(
                    this._config.info.name,
                    this.keyIdleSetByPlugin
                );
                var statusIsAFKAndWasSetByPlugin =
                    this.currentStatus() === this.settings.afkStatus &&
                    __afkSetByPlugin === true;

                var statusIsAFKAndAlwaysOnlineIsTrue =
                    this.currentStatus() === this.settings.afkStatus &&
                    this.settings.alwaysOnline === true;

                if (statusIsAFKAndWasSetByPlugin) {
                    this.showToast("Changing status back to online");
                    this.updateStatus("online");
                    BdApi.saveData(
                        this._config.info.name,
                        this.keyIdleSetByPlugin,
                        false
                    );
                } else if (statusIsAFKAndAlwaysOnlineIsTrue) {
                    BdApi.showToast("Changing status back to online");
                    this.updateStatus("online");
                    BdApi.saveData(
                        this._config.info.name,
                        this.keyIdleSetByPlugin,
                        false
                    );
                } else if (__afkSetByPlugin == undefined) {
                    return;
                } else {
                    BdApi.deleteData(
                        this._config.info.name,
                        this.keyIdleSetByPlugin
                    );
                    Logger.info(
                        "User overrode the status. leaving status unchanged..."
                    );
                }
            }, this.settings.backToOnlineDelay * 1000);
        }

        /**
         * Cancles the given timeout id
         * @param {number} timeoutId
         * @returns {undefined}
         */
        cancelTimeout(timeoutId) {
            if (timeoutId != undefined) {
                log_debug("Cancelling timeout " + timeoutId); // TODO: remove this
                clearTimeout(timeoutId);
                return undefined;
            }
        }

        /**
         * @returns {string} the current user status
         */
        currentStatus() {
            return randomStatusModule.default.status;
        }
        /**
         * @returns {boolean} if user is in a VC
         */
        inVoiceChannel() {
            return getVoiceChannelId() !== null;
        }

        /**
         * Returns if the current status is 'online' and the user is not in a
         * voice channel
         * @returns
         */
        onlineStatusAndNotInVC() {
            return (
                this.currentStatus() === "online" &&
                this.inVoiceChannel() === false
            );
        }

        /**
         * Updates the remote status to the param `toStatus`
         * @param {('online'|'idle'|'invisible'|'dnd')} toStatus
         */
        updateStatus(toStatus) {
            if (
                this._config.DEBUG === true &&
                this._config.DEBUG_ActuallyChangeStatus === false
            ) {
                log_debug("Changing (but not changing) status to: " + toStatus);
                return;
            }
            log_debug("Actually changing status to: " + toStatus);
            UpdateRemoteSettingsModule.updateRemoteSettings({
                status: toStatus,
            });
        }

        /**
         * shows toast message based on showToast settings
         * @param {string} msg
         */
        showToast(msg) {
            if (this.settings.showToasts) {
                BdApi.showToast(msg);
            }
        }
    };
};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();

/*@end@*/