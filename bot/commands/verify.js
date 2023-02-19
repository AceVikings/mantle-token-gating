const { SlashCommandBuilder } = require("discord.js");
const { ethers } = require("ethers");

let watchedFilters = [];
const watchMap = new Map();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verify address to receive role")
    .addStringOption((option) =>
      option
        .setName("auth-token")
        .setDescription("Auth token received from our website")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply({
      content: "ok",
      ephemeral: true,
    });
  },
};
