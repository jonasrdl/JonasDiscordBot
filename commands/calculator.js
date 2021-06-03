module.exports = {
  name: 'calculator',
  description: 'Calculates two numbers',
  execute(client, message, Discord) {
    prefix = '.';

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    const number1 = Number(args[0]);
    const operator = args[1];
    const number2 = Number(args[2]);

    if (number1 === NaN || number2 === NaN) {
      message.channel.send('Invalid input, try again.');

      return;
    }
    if (operator === '+') {
      const result = Number(number1) + Number(number2);
      message.channel.send('Result: ' + result);
    } else if (operator === '-') {
      const result = Number(number1) - Number(number2);
      message.channel.send('Result: ' + result);
    } else if (operator === '/') {
      if (Number(number2) === 0) {
        message.channel.send('Division by 0 is not allowed!');
        return;
      }

      const result = Number(number1) / Number(number2);
      message.channel.send('Result: ' + result);
    } else if (operator === '*') {
      const result = Number(number1) * Number(number2);
      message.channel.send('Result: ' + result);
    }
  },
};
