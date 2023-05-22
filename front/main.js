import { Graphics } from './graphics.js';
import { Connection } from './connection.js';
import { CanvasClick } from './commands.js';

export function main() {
  const graphics = new Graphics();
  const connection = new Connection();

  // connection.onMessage((event) => {
  //   console.log('Received message:', event.data);
  // });

  graphics.onCanvasClick((x, y) => {
    connection.send(JSON.stringify(new CanvasClick({ x, y })));
    console.log(new CanvasClick({ x, y }));
  });

    connection.onRender((data) => {
        graphics.render(data);
      console.log('Render', data);
    });

    connection.onUpdateLeaderboard((data) => {
        graphics.updateLeaderboard(data);
    });
}
