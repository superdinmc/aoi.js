const Interpreter = require("../../core/interpreter.js");
module.exports = async (guild, client) => {
    let chan;
    const cmds = client.cmd.guildLeave.allValues();
    const data = { guild: guild, client: client };
    for (const cmd of cmds) {
        if (cmd?.channel?.includes("$")) {
            const id = await Interpreter(
                client,
                data,
                [],
                { name: "ChannelParser", code: cmd?.channel },
                client.db,
                true,
            );
            chan = client.channels.cache.get(id?.code);
            data.channel = chan;
        } else {
            chan = client.channels.cache.get(cmd.channel);
            data.channel = chan;
        }
        await Interpreter(
            client,
            data,
            [],
            cmd,
            client.db,
            false,
            chan?.id,
            {},
            chan,
        );
    }
};
