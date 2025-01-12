// This is a test folder that was used during development. Do not consider this an example.
const {isPrimary} = require('cluster');
const {Fleet} = require('../../dist/index');
const path = require('path');
const {inspect} = require('util');
const {Intents} = require('oceanic.js');

require('dotenv').config();

const options = {
  path: path.join(__dirname, './bot.js'),
  token: process.env.token,
  startingStatus: {
    status: 'dnd',
    game: {
      name: 'Starting...',
    },
  },
  shards: 2,
  clusters: 2,
  clientOptions: {
    gateway:{
        intents: [Intents.GUILDS,Intents.GUILD_MESSAGES,Intents.MESSAGE_CONTENT]
    }
  }
};

const Admiral = new Fleet(options);

if (isPrimary) {
	setTimeout(() => {
		Admiral.totalShutdown()
	}, 5e3)
  // Code to only run for your master process
  Admiral.on('log', (m) => console.log(m));
  Admiral.on('debug', (m) => console.debug(m));
  Admiral.on('warn', (m) => console.warn(m));
  Admiral.on('error', (m) => console.error(inspect(m)));


  // Logs stats when they arrive
  // Admiral.on('stats', m => console.log(m));
}
