module.exports = {
  name: 'random',
  description: 'Make req to the random API',
  execute(client, message) {
    const fetch = require('node-fetch');
    //const config: any = JSON.parse(fs.readFileSync('../../../config/config.json', 'utf-8'));
    //const args: any = message.content.slice(prefix.length).trim().split(' ');
    //const command: any = args.shift().toLowerCase();

    prefix = '.';

    const removeQuotes = (str: string): string => {
      return str.replace(/^"(.+(?="$))"$/, '$1');
    };

    const sendMessage = (data: any) => {
      const firstName: string = removeQuotes(JSON.stringify(data.results[0].name.first));
      const lastName: string = removeQuotes(JSON.stringify(data.results[0].name.last));
      const age: string = removeQuotes(JSON.stringify(data.results[0].dob.age));

      message.channel.send(`First name: ${firstName}`);
      message.channel.send(`Last name: ${lastName}`);
      message.channel.send(`Age: ${age}`);
    };

    fetch(`http://api.randomuser.me/`)
      .then((response: any) => response.json())
      .then((data: string) => sendMessage(data));
  },
};
