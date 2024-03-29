import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
} from 'discord.js';
import { CommandType } from '../typings/Command';
import glob from 'glob';
import { promisify } from 'util';
import { RegisterCommandsOptions } from '../typings/client';
import { Event } from './Event';
import { client } from '..';

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
  commands: Collection<string, CommandType> = new Collection();

  constructor() {
    super({ intents: 32767 });
  }

  start(): void {
    this.registerModules();
    this.login(process.env.botToken);
  }

  setActivity(): void {
    client.user.setActivity(process.env.ACTIVITY, {
      type: 'PLAYING',
    });
  }

  async importFile(filePath: string): Promise<any> {
    return (await import(filePath))?.default;
  }

  async registerCommands({ commands }: RegisterCommandsOptions): Promise<void> {
    const guildId: string = process.env.guildId;
    let global: boolean = true;

    if (global) {
      // Global
      await this.application?.commands.set(commands);
      console.log('Registering global commands');
    } else {
      // Guild
      await this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log(`Registering commands to ${guildId}`);
    }
  }

  async registerModules(): Promise<void> {
    // Commands
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandFiles: string[] = await globPromise(
      `${__dirname}/../commands/*/*{.ts,.js}`,
    );

    commandFiles.forEach(async (filePath: string) => {
      const command: CommandType = await this.importFile(filePath);
      if (!command.name) return;

      this.commands.set(command.name, command);
      slashCommands.push(command);
    });

    this.on('ready', () => {
      this.registerCommands({
        commands: slashCommands,
      });

      this.setActivity();
    });

    // Event
    const eventFiles: string[] = await globPromise(
      `${__dirname}/../events/*{.ts,.js}`,
    );

    eventFiles.forEach(async (filePath: string) => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath);
      this.on(event.event, event.run);
    });
  }
}
