import { Connection } from './connection.js';
import { Game } from './game.js';
import { json } from 'stream/consumers';
import { Commands } from './commands.js';

const connection = new Connection({ port: 12345 });
const game = new Game();

const clients: any = [];

connection.onCanvasClick((data: any, client: any) => {
  game.click(data, client);
});

connection.onNewPlayer((data: any, client: any) => {
  setImmediate(() => {
    game.addPlayer(client, data.name);
    const message = JSON.stringify(new Commands('render', game.getObjects()));
    client.send(message);
    console.log('new player');
  });
});

connection.onDisconnect((client: any) => {
  game.RemovePlayer(client);
});

game.onChangeCanvas(() => {
  const message = JSON.stringify(new Commands('render', game.getObjects()));
  game.getPlayers().forEach(({ client }) => {
    client.send(message);
  });
});

// game.onClick(() => {
//   console.log('click');
// });

game.onChangeLeaderboard(() => {
  // console.log('leaderboard changed');
  // console.log(game.getLeaderboard());
  const message = JSON.stringify(new Commands('leaderboard', game.getLeaderboard()));
  console.log(message);
  game.getPlayers().forEach(({ client }) => {
    client.send(message);
  });
});
