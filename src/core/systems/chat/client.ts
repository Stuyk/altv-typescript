import * as alt from 'alt-client';

export abstract class Chat {
    private static buffer: Array<{ name: string; text: string }> = [];

    private static loaded: boolean = false;
    private static opened: boolean = false;

    private static view: alt.WebView = new alt.WebView('http://resource/systems/chat/html/index.html');

    static init() {
        alt.log('(Client) Chat System Initialized');

        this.view.on('chatloaded', () => {
            for (const msg of this.buffer) {
                this.addMessage(msg.name, msg.text);
            }

            this.loaded = true;
        });

        this.view.on('chatmessage', (text) => {
            alt.emitServer('chat:message', text);

            this.opened = false;
            alt.toggleGameControls(true);
            this.view.unfocus();
        });

        alt.onServer('chat:message', this.pushMessage);

        alt.on('keyup', (key) => {
            if (this.loaded) {
                if (!this.opened && key === 0x54 && alt.gameControlsEnabled()) {
                    this.opened = true;
                    this.view.emit('openChat', false);
                    alt.toggleGameControls(false);
                    this.view.focus();
                } else if (!this.opened && key === 0xbf && alt.gameControlsEnabled()) {
                    this.opened = true;
                    this.view.emit('openChat', true);
                    alt.toggleGameControls(false);
                    this.view.focus();
                } else if (this.opened && key == 0x1b) {
                    this.opened = false;
                    this.view.emit('closeChat');
                    alt.toggleGameControls(true);
                    this.view.unfocus();
                }
            }
        });
    }

    static addMessage(name: string, text: string) {
        if (name) {
            Chat.view.emit('addMessage', name, text);
        } else {
            Chat.view.emit('addString', text);
        }
    }

    static pushMessage(name: string, text: string) {
        if (!Chat.loaded) {
            Chat.buffer.push({ name, text });
        } else {
            Chat.addMessage(name, text);
        }
    }
}
