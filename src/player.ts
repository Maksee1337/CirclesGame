export class Player {
    client: any;
    name: string;
    score = 0;
    constructor(client: any, name: string){
        this.name = name;
        this.client = client;
    }

    addScore(points: number){
        this.score += points;
    }
}
