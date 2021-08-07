module.exports = {
  name: 'calculator',
  description: 'Calculates two numbers',
  execute(client, message) {
    let prefix: string = '.';

    const args: string[] = message.content.slice(prefix.length).trim().split(' ');
    const command: any = args.shift().toLowerCase();
    const number1: number = Number(args[0]);
    const operator: string = args[1];
    const number2: number = Number(args[2]);

    if (isNaN(number1) || isNaN(number2)) {
      message.channel.send('Invalid input, try again.').then(() => console.log('Sent error'));

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
        message.channel.send('Division by 0 is not allowed!' + ' 🧠🤓');
        return;
      }

      const result: number = Number(number1) / Number(number2);
      message.channel.send('Result: ' + result);
    } else if (operator === '*') {
      const result: number = Number(number1) * Number(number2);
      message.channel.send('Result: ' + result);
    }
  },
};
