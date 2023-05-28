export class Chat {

    constructor() {
        this.input = document.getElementById('messageInput');
        this.messages = document.getElementById('chatMessages');
        this.messages.value = '';
        this.button = document.getElementById('sendMessageButton');
        console.log({input: this.input, messages: this.messages, button: this.button});
    }

    onButtonClick(callback) {
        this.button.addEventListener('click', (event) => {
            if(this.input.value === '') return;
            callback(this.input.value);
            this.input.value = '';
        });
    }

    addMessages(messages) {
        messages.forEach((message) => {
            if(window.name !== message.author) {
                this.messages.value += `== ${message.author} ==\n${message.text}\n\n`;
            } else {
                this.messages.value += `== ${message.author} (Me) ==\n${message.text}\n\n`;
            }
        });
        this.messages.scrollTop = this.messages.scrollHeight;
    }
}
