module.exports = {
  name: 'random',
  description: 'Make request to the random API',
  execute(client: any, message: any) {
    const fetch = require('node-fetch');

    const removeQuotes = (str: string): string => {
      return str.replace(/^"(.+(?="$))"$/, '$1');
    };

    const sendMessage = (data: any) => {
      const firstName: string = removeQuotes(JSON.stringify(data.results[0].name.first));
      const lastName: string = removeQuotes(JSON.stringify(data.results[0].name.last));
      const age: string = removeQuotes(JSON.stringify(data.results[0].dob.age));
      const picture: string = data.results[0].picture.large;

      message.channel.send(`First name: ${firstName}`);
      message.channel.send(`Last name: ${lastName}`);
      message.channel.send(`Age: ${age}`);
      message.channel.send(`${picture}`);
    };

    fetch(`http://api.randomuser.me/`)
      .then((response: any) => response.json())
      .then((data: string) => sendMessage(data));
  },
};
