import { Figure } from './objects/figure.js';
import { Circle } from './objects/circle.js';
import { Colors } from './objects/colors.js';
import { Player } from './player.js';

export class Game {
  players: Player[] = [];

  canvasSize = 800;
  objects: Figure[] = [];
  numberOfObjects = 0;
  interval: any;
  onChangeCallback: any;
  onChangeLeaderboardCallback: any;
  onClickCallback: any;

  private getRandomObject(): Figure {
    return new Circle({
      x: Math.random() * this.canvasSize,
      y: Math.random() * this.canvasSize,
      radius: Math.random() * 100 + 10,
      color: Colors.getRandomColor(),
    });
  }

  private isValidObject(newObject: Figure) {
    for (const object of this.objects) {
      if (object.type === 'circle') {
        const dx = object.options.x - newObject.options.x;
        const dy = object.options.y - newObject.options.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < object.options.radius + newObject.options.radius + 5) {
          console.log('Error: circle');
          return false;
        }
      }
    }
    return true;
  }

  private findObjectIndexByPoint({ x, y }: any) {
    console.log('isClickedByObject', { x, y });
    for (let i = 0; i < this.objects.length; i++) {
      const object = this.objects[i];
      if (object.type === 'circle') {
        const { options } = object;
        const distance = Math.sqrt((x - options.x) ** 2 + (y - options.y) ** 2);
        const res = distance - options.radius;
        if (res < 0) return i;
      }
    }

    return -1;
  }

  constructor() {
    console.log('Game created');
    this.interval = setInterval(() => {
      if (this.numberOfObjects < 5) {
        this.numberOfObjects++;

        while (true) {
          const object = this.getRandomObject();
          if (this.isValidObject(object)) {
            this.objects.push(object);
            this.onChangeCallback();
            break;
          }
        }
      }
    }, 100);
  }

  public getObjects(): Figure[] {
    return this.objects;
  }

  public onChangeCanvas(callback: any) {
    this.onChangeCallback = callback;
  }

  public onChangeLeaderboard(callback: any) {
    this.onChangeLeaderboardCallback = callback;
  }

  public getPlayerByClient(client: any) {
    return this.players.find((player) => player.client === client);
  }

  public click({ x, y }: any, client: any) {
    const objectIndex = this.findObjectIndexByPoint({ x, y });
    console.log(objectIndex);
    if (objectIndex !== -1) {
      const player = this.getPlayerByClient(client);
      if (player) {
        player.addScore(this.objects[objectIndex].amount);
        this.objects.splice(objectIndex, 1);
        this.numberOfObjects--;
        // this.onClickCallback();
        this.onChangeLeaderboardCallback();
      }
    } else {
      console.log('click false');
    }
  }

  public onClick(callback: any) {
    this.onClickCallback = callback;
  }

  public addPlayer(client: any, name: string) {
    this.players.push(new Player(client, name));
    this.onChangeLeaderboardCallback();
  }

  public getLeaderboard() {
    return this.players
      .map((player) => ({
        name: player.name,
        score: player.score,
      }))
      .sort((a, b) => b.score - a.score);
  }

  public getPlayers() {
    return this.players;
  }

  public RemovePlayer(client: any) {
    this.players = this.players.filter((player) => player.client !== client);
    this.onChangeLeaderboardCallback();
  }
}
