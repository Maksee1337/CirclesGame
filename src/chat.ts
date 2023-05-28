import {MessageInterface} from "./interfaces/chat.interface.js";

export class Chat {
    messages: MessageInterface[] = [{
        author: 'Server',
        text: `Started at ${new Date().toLocaleString()}`,
    }];
    onNewMessageCallback: any;
    constructor() {

    }
    public onNewMessage = (callback: any) => {
        this.onNewMessageCallback = callback;
    }

    public addMessage = (message: MessageInterface) => {
        this.messages.push(message);
        this.onNewMessageCallback(message);
    }

    public getMessages = (n: number) => {
        return [...this.messages.slice(-n)];
    }
}
