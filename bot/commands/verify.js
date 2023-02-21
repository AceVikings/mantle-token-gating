const { SlashCommandBuilder } = require("discord.js");
const { ethers, Contract } = require("ethers");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const erc20abi = require("../abi/erc20.json");
const erc721abi = require("../abi/erc721.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verify address to receive role"),
  async execute(interaction) {
    const provider = new ethers.JsonRpcProvider(process.env.RPC);
    let guild = interaction.guildId;
    let user = interaction.user;
    if (!guild) {
      await interaction.reply({
        content: "command can only be run in servers",
        ephemeral: true,
      });
      return;
    }
    let serverData;
    let userData;
    userData = await fetch(
      `http://localhost:9000/discord/${user.id}?server=${guild}`
    );
    userData = await userData.json();
    serverData = await fetch(`http://localhost:9000/discord/server/${guild}`);
    serverData = await serverData.json();

    let address = userData.address;
    for (let i = 0; i < serverData.gate.length; i++) {
      if (serverData.gate[i].type === "erc721") {
        let contract = new Contract(
          serverData.gate[i].contract,
          erc721abi,
          provider
        );
        let balance = await contract.balanceOf(address);
        if (balance >= serverData.gate[i].balance) {
          interaction.member.roles.add(serverData.gate[i].role);
        }
      } else {
        let contract = new Contract(
          serverData.gate[i].contract,
          erc20abi,
          provider
        );
        let balance = await contract.balanceOf(address);
        if (balance >= serverData.gate[i].balance) {
          interaction.member.roles.add(serverData.gate[i].role);
        }
      }
    }
    await interaction.reply({
      content: "Roles added",
      ephemeral: true,
    });
  },
};
