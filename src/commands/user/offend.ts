import { Command } from '../../structures/Command';
export default new Command({
  name: 'offend',
  options: [
    {
      name: 'user',
      description: 'User u want to offend',
      type: 'MENTIONABLE',
      required: true,
    },
  ],
  description: 'Offend someone',
  run: async ({ interaction }) => {
    const user: any = interaction.options.getMentionable('user');
    const userID = user.user.id;
    const sender = interaction.user.id;

    switch (user.user.username) {
      case 'Jonas Bot':
        return interaction.followUp('You are stupid, not me!');
      case 'jvnxs7':
        return interaction.followUp(
          'Nice try, i cannot offend my own creator!',
        );
      case sender:
        return interaction.followUp(
          'Why do you want to offend yourself? But ok, you are stupid!',
        );
      default:
        return interaction.followUp(`<@${userID}> you are stupid!`);
    }
  },
});
