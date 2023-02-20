const { SlashCommandBuilder } = require("discord.js");
const { ethers } = require("ethers");

const gateMap = new Map();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-gating")
    .setDescription("Set gating setting for the channel")
    .addStringOption((option) =>
      option
        .setName("token-type")
        .setDescription("Token type to verify")
        .setRequired(true)
        .addChoices(
          { name: "NFT", value: "erc721" },
          { name: "ERC20", value: "erc20" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("contract")
        .setDescription("Contract address of token")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("balance-required")
        .setDescription("Minimum balance to assign role (in wei for ERC20)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("role")
        .setDescription("name of the role")
        .setRequired(true)
    ),
  async execute(interaction) {
    let type = interaction.options.getString("token-type");
    let contract = interaction.options.getString("contract");
    let balance = interaction.options.getInteger("balance-required");
    let role = interaction.options.getString("role");
    let roleId = (
      await interaction.guild.roles.cache.find((r) => r.name == role)
    )?.id;
    if (!ethers.isAddress(contract)) {
      await interaction.reply({
        content: "Invalid contract address",
        ephemeral: true,
      });
    } else {
      gateMap.set(interaction.guildId, {
        type: type,
        contract: contract,
        balance: balance,
        role: roleId,
      });
      await interaction.reply({
        content: "ok",
        ephemeral: true,
      });
    }
  },
};
