const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = process.env.TOKEN;
let data = require("./data.json");

function saveData() {
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
}

function getUser(id) {
    if (!data[id]) {
        data[id] = { money: 1000, lastDaily: 0 };
        saveData();
    }
    return data[id];
}

function formatTime(ms) {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    return `${h} giờ ${m} phút`;
}

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const user = getUser(interaction.user.id);

    if (interaction.commandName === "balance") {
        return interaction.reply(`💰 Bạn có ${user.money} coin`);
    }

    if (interaction.commandName === "click") {
        const earn = Math.floor(Math.random() * 10) + 5;
        user.money += earn;
        saveData();
        return interaction.reply(`🖱 Bạn kiếm được ${earn} coin`);
    }

    if (interaction.commandName === "daily") {
        const now = Date.now();
        const cd = 24 * 60 * 60 * 1000;

        if (now - user.lastDaily < cd) {
            return interaction.reply({
                content: `⏳ Còn ${formatTime(cd - (now - user.lastDaily))}`,
                ephemeral: true
            });
        }

        const reward = Math.floor(Math.random() * 500) + 500;
        user.money += reward;
        user.lastDaily = now;
        saveData();
        return interaction.reply(`🎁 Nhận ${reward} coin`);
    }

    if (interaction.commandName === "coin") {
        const choice = interaction.options.getString("chon");
        const bet = interaction.options.getInteger("tien");

        if (user.money < bet)
            return interaction.reply({ content: "❌ Không đủ tiền", ephemeral: true });

        const result = Math.random() < 0.5 ? "sap" : "ngua";

        if (choice === result) {
            user.money += bet;
            interaction.reply(`🪙 ${result.toUpperCase()} — THẮNG +${bet}`);
        } else {
            user.money -= bet;
            interaction.reply(`🪙 ${result.toUpperCase()} — THUA -${bet}`);
        }
        saveData();
    }

    if (interaction.commandName === "top") {
        const top = Object.entries(data)
            .sort((a, b) => b[1].money - a[1].money)
            .slice(0, 10);

        let text = "🏆 TOP COIN\n";
        top.forEach((u, i) => {
            text += `${i + 1}. ${u[0]} — ${u[1].money}\n`;
        });
        interaction.reply(text);
    }
});


client.login(process.env.TOKEN);
