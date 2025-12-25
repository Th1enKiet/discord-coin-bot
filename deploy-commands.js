const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = "1453807243270295735";
const GUILD_ID = "1255400540880506880";

const commands = [
    new SlashCommandBuilder()
        .setName("balance")
        .setDescription("Xem số coin"),

    new SlashCommandBuilder()
        .setName("click")
        .setDescription("Click kiếm coin"),

    new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Nhận thưởng ngày"),

    new SlashCommandBuilder()
        .setName("coin")
        .setDescription("Tung đồng xu")
        .addStringOption(o =>
            o.setName("chon")
                .setDescription("sấp hoặc ngửa")
                .setRequired(true)
                .addChoices(
                    { name: "Sấp", value: "sap" },
                    { name: "Ngửa", value: "ngua" }
                )
        )
        .addIntegerOption(o =>
            o.setName("tien")
                .setDescription("Số coin cược")
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName("top")
        .setDescription("Bảng xếp hạng")
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
