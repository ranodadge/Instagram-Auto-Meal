const { Message, Events } = require("discord.js");
const { client } = require("../../index");
const Dokdo = require("dokdo");
const DokdoHandler = new Dokdo.Client(client, {
  aliases: ["d", "ㅇ"],
  prefix: `!`,
  owners: ["890187595517157377", "712500798617026570"],
});

module.exports = {
  name: Events.MessageCreate,
  /**
   *
   * @param {Message} message
   */
  async execute(message) {
      DokdoHandler.run(message);
  },
};
