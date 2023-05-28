import {Connection} from './connection.js';
import {Game} from './game.js';
import {json} from 'stream/consumers';
import {Commands} from './commands.js';
import {Chat} from "./chat.js";
import {MessageInterface} from "./interfaces/chat.interface.js";

const connection = new Connection({port: 12345});
const game = new Game();
const chat = new Chat();

connection.onCanvasClick((data: any, client: any) => {
    game.click(data, client);
});

connection.onNewPlayer((data: any, client: any) => {
    setImmediate(() => {
        game.addPlayer(client, data.name);
        const message = JSON.stringify(new Commands('render', game.getObjects()));
        const messageChat = JSON.stringify(new Commands('chatMessage', chat.getMessages(20)));
        client.send(message);
        client.send(messageChat);
        console.log('new player');
    });
});

connection.onDisconnect((client: any) => {
    game.RemovePlayer(client);
});

connection.onChatMessage((data: any, client: any) => {
    const author = game.getPlayerByClient(client)?.name;
    if (!author) return;
    const message: MessageInterface = {
        author,
        text: data.text
    }
    chat.addMessage(message);
});

chat.onNewMessage(() => {
    const message = JSON.stringify(new Commands('chatMessage', chat.getMessages(1)));
    game.getPlayers().forEach(({client}) => {
        client.send(message);
    });
});

game.onChangeCanvas(() => {
    const message = JSON.stringify(new Commands('render', game.getObjects()));
    game.getPlayers().forEach(({client}) => {
        client.send(message);
    });
});


game.onChangeLeaderboard(() => {
    // console.log('leaderboard changed');
    // console.log(game.getLeaderboard());
    const message = JSON.stringify(new Commands('leaderboard', game.getLeaderboard()));
    console.log(message);
    game.getPlayers().forEach(({client}) => {
        client.send(message);
    });
});
