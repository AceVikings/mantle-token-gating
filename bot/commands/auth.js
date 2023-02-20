const { SlashCommandBuilder } = require("discord.js");
const { ethers } = require("ethers");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let watchedFilters = [];
const watchMap = new Map();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("auth")
    .setDescription("Connect your account to your wallet")
    .addStringOption((option) =>
      option
        .setName("auth-type")
        .setDescription("Scope of authentication (local or global)")
        .setRequired(true)
        .addChoices(
          { name: "Local", value: "Local" },
          { name: "Global", value: "Global" }
        )
    ),
  async execute(interaction) {
    console.log(interaction.user.id);
    let auth = interaction.options.getString("auth-type");
    if (auth === "Local") {
      if (!interaction.guild.id) {
        await interaction.reply({
          content: "Auth failed, local Auth needs to start in a server",
          ephemeral: true,
        });
      } else {
        let token = jwt.sign(
          { id: interaction.user.id, server: interaction.guild.id },
          process.env.SECRET
        );
        await interaction.reply({
          embeds: [
            {
              description: `[Verify here](http://localhost:3000/verify/${token})`,
            },
          ],
          ephemeral: true,
        });
      }
    }
    if (auth === "Global") {
      let token = jwt.sign({ id: interaction.user.id }, process.env.SECRET);
      await interaction.reply({
        embeds: [
          {
            description: `[Verify here](http://localhost:3000/verify/${token})`,
          },
        ],
        ephemeral: true,
      });
    }
  },
};
