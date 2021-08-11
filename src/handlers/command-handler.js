const fs = require('fs');

module.exports = (client, Discord) => {
  const command_files = fs.readdirSync('./commands/js').filter((file) => file.endsWith('.js'));

  for (const file of command_files) {
    const command = require(`../commands/js/${file}`);

    if (command.name) {
      client.commands.set(command.name, command);
    }
  }
};
