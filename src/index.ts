require('dotenv').config();
import { ExtendedClient } from './structures/Client';
const api = require('./api/ApiHandler');

export const client = new ExtendedClient();

api.init();

client.start();
