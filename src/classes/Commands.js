const { createFuncAST } = require( "../utils/helpers/functions.js" );
const { Group } = require( "./structures/dist" );

class Command {
    constructor(d = {}, client) {
        Object.defineProperty(this, "__client__", { value: client });
        Object.entries(d).forEach((x) => (this[x[0]] = x[1]));
        this.functions = this.serializeFunctions();
        this.codeLines = this.serializeCode();
    }

    serializeFunctions() {
        let Functions = this.__client__.functionManager.functions;
        let code = this.code
            ?.replace(/\\]/g, "#LEFT#")
            .split("\\[")
            .join("#RIGHT#")
            .replace("\\,", "#COMMA#");
        const funcs = createFuncAST(`$execMain[${code}]`);
        return funcs;
    }

    serializeCode() {
        return this.code?.split("\n");
    }

    toString() {
        return JSON.stringify(this);
    }

    toArray() {
        return Object.entries(this);
    }

    values() {
        return Object.values(this);
    }

    keys() {
        return Object.keys(this);
    }
}

class CommandManager {
    awaited;
    messageDelete;
    messageUpdate;
    messageDeleteBulk;
    guildJoin;
    guildLeave;
    guildUpdate;
    guildUnavailable;
    roleCreate;
    roleUpdate;
    roleDelete;
    channelCreate;
    channelUpdate;
    channelDelete;
    channelPinsUpdate;
    stageInstanceCreate;
    stageInstanceUpdate;
    stageInstanceDelete;
    threadCreate;
    threadUpdate;
    threadDelete;
    threadListSync;
    threadMemberUpdate;
    threadMembersUpdate;
    join;
    leave;
    memberUpdate;
    membersUpdate;
    memberAvailable;
    membersChunk;
    emojiCreate;
    emojiDelete;
    emojiUpdate;
    banAdd;
    banRemove;
    reactionAdd;
    reactionRemove;
    reactionRemoveAll;
    reactionRemoveEmoji;
    presenceUpdate;
    voiceStateUpdate;
    applicationCmdCreate;
    applicationCmdDelete;
    onApplicationCmdUpdate;
    userUpdate;
    variableCreate;
    variableDelete;
    variableUpdate;
    ready;
    functionError;
    loop;
    timeout;
    pulse;
    rateLimit;
    webhookUpdate;

    constructor(client, formCommand = true, customCmds = []) {
        client.cmd = this;
        this.client = client;
        this.isClientCommand = formCommand;

        if (formCommand) {
            this.formCommand();
        } else {
            this.customCmds = customCmds;
            this.formCustomCommand(customCmds);
        }
    }

    get types() {
        return [
            "default",
            "awaited",
            "messageDelete",
            "messageUpdate",
            "messageDeleteBulk",
            "guildJoin",
            "guildUpdate",
            "guildLeave",
            "guildUnavailable",
            "roleCreate",
            "roleUpdate",
            "roleDelete",
            "channelCreate",
            "channelUpdate",
            "channelDelete",
            "channelPinsUpdate",
            "stageInstanceCreate",
            "stageInstanceUpdate",
            "stageInstanceDelete",
            "stickerCreate",
            "stickerDelete",
            "stickerUpdate",
            "threadCreate",
            "threadDelete",
            "threadListSync",
            "threadMemberUpdate",
            "threadMembersUpdate",
            "threadUpdate",
            "join",
            "leave",
            "memberUpdate",
            "memberAvailable",
            "membersChunk",
            "emojiCreate",
            "emojiUpdate",
            "emojiDelete",
            "banAdd",
            "banRemove",
            "webhookUpdate",
            "voiceStateUpdate",
            "presenceUpdate",
            "reactionAdd",
            "reactionRemove",
            "reactionRemoveEmoji",
            "reactionRemoveAll",
            "typingStart",
            "loop",
            "timeout",
            "pulse",
            "ready",
            "variableCreate",
            "variableDelete",
            "variableUpdate",
            "functionError",
            "interaction",
            "applicationCmdCreate",
            "applicationCmdUpdate",
            "applicationCmdDelete",
            "userUpdate",
            "rateLimit",
            "shardReady",
            "shardResume",
            "shardReconnecting",
            "shardDisconnect",
            "shardError",
        ];
    }

    formCommand() {
        this.types.forEach((x) => (this[x] = new Group()));
        this.interaction = {
            selectMenu: new Group(),
            button: new Group(),
            slash: new Group(),
            modal: new Group(),
        };
    }

    createCommand(d = {}) {
        d.type = d.type || "default";
        if (d.type === "interaction") {
            this[d.type][d.prototype].set(
                this[d.type][d.prototype].size,
                new Command(d, this.client),
            );
        } else {
            this[d.type].set(this[d.type].size, new Command(d, this.client));
        }
    }

    formCustomCommand(customCmds) {
        customCmds.forEach((x) => {
            this[x] = new Group();
        });
        if (!customCmds.includes("default")) this.default = new Group();
    }
}

module.exports = {
  CommandManager,
  Command,
};