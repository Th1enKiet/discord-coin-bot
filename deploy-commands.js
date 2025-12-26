const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = "1453807243270295735";
const GUILD_ID = "1255400540880506880";

const commands = [
    new SlashCommandBuilder()
        .setName("money")
        .setDescription("Show your coin"),

    new SlashCommandBuilder()
        .setName("click")
        .setDescription("Click to earn coin"),

    new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Daily"),

    new SlashCommandBuilder()
        .setName("coinflip")
        .setDescription("CoinFlip")
        .addStringOption(o =>
            o.setName("choose")
                .setDescription("heads or tails")
                .setRequired(true)
                .addChoices(
                    { name: "heads", value: "Heads" },
                    { name: "tails", value: "Heads" }
                )
        )
        .addIntegerOption(o =>
            o.setName("money")
                .setDescription("Ammount")
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName("top")
        .setDescription("Top")
].map(c => c.toJSON());

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
    try {
        console.log("⏳ Đang deploy slash command...");
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );
        console.log("✅ Deploy thành công!");
    } catch (e) {
        console.error(e);
    }
})();
