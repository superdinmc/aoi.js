module.exports = async d => {
    const data = d.util.aoiFunc(d);
    if (data.err) return d.error(data.err);

    let [content = "", embeds = "", components = "", files = "", allowedMentions = "all", ephemeral = "false"] = data.inside.splits

    embeds = await d.util.parsers.EmbedParser(embeds, d);

    components = await d.util.parsers.ComponentParser(components, d);

    files = await d.util.parsers.FileParser(files, d);

    allowedMentions = allowedMentions === "all" ? [ "everyone", "users", "roles" ] : (allowedMentions ? allowedMentions?.split(",") : []);

    await d.data.interaction?.reply({
        content: content.trim() === "" ? " " : content.addBrackets(),
        embeds: embeds,
        components: components,
        files,
        allowedMentions: {
            parse: allowedMentions
        },
        ephemeral: ephemeral === "true" || ephemeral === "true"
    })

    return {
        code: d.util.setCode(data)
    }
}
