const { MessageEmbed } = require("discord.js");
const COLOR = require("../../utils/colors");
const { GROUP } = require("../../utils/groups");
const log = require("../../utils/logger");
const MCAPI = require("../../utils/MinecraftAPI");
const Players = require("../../models/Players");
module.exports.run = async ({ message, args, prefix }) => {
    let embed = new MessageEmbed();
    if (args[1]) {
        const playerUuid = await MCAPI.getUuid(args[1]);
        const playerName = await MCAPI.getName(playerUuid);

        if (playerUuid) {
            let pl = await Players.findOne({ "uuid": playerUuid })
            embed.setColor(COLOR.INFO)
                .setTitle(`${playerName.replace(/_/g, "\\_")}'s Profile`)
                .setThumbnail(`https://crafatar.com/renders/head/${playerUuid}`)
                .addField("Team", (pl && pl.team) ? pl.team : "None")
                .addField("Rank", (pl && pl.rank) ? pl.rank : "None")
                .addField("UUID", playerUuid);
        }
        else
            embed.setColor(COLOR.WARN)
                .setDescription("No User Found")
        // .addField("Leagues", "CCL");
    }
    else
        embed.setColor(COLOR.WARN)
            .setDescription("No User provided")
    message.channel.send(embed)
}

module.exports.help = (async () => {
    return {
        command: "player",
        aliases: ["profile", "p", "getplayer", "who"],
        description: "Shows the information from a Player",
        permission: (await GROUP).DEFAULT,
        help: "player [MC IGN]"
    }
})()