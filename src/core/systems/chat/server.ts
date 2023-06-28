import * as alt from 'alt-server';

export abstract class Chat {
    private static cmdHandlers: { [cmd: string]: (player: alt.Player, args: string[]) => void } = {};

    static init() {
        alt.onClient('chat:message', (player, msg) => {
            if (msg[0] === '/') {
                msg = msg.trim().slice(1);

                if (msg.length > 0) {
                    alt.log('[chat:cmd] ' + player.name + ': /' + msg);

                    let args = msg.split(' ');
                    let cmd = args.shift();

                    this.invokeCmd(player, cmd, args);
                }
            } else {
                msg = msg.trim();

                if (msg.length > 0) {
                    alt.log('[chat:msg] ' + player.name + ': ' + msg);

                    alt.emitClient(player, 'chat:message', player.name, msg.replace(/</g, '&lt;').replace(/'/g, '&#39').replace(/"/g, '&#34'));
                }
            }
        });
    }

    static send(player: alt.Player, msg: string) {
        alt.emitClient(player, 'chat:message', null, msg);
    }

    static registerCmd(cmd: string, callback: (player: alt.Player, args: string[]) => void) {
        cmd = cmd.toLowerCase();

        if (this.cmdHandlers[cmd] !== undefined) {
            alt.logError(`Failed to register command /${cmd}, already registered`);
        } else {
            this.cmdHandlers[cmd] = callback;
        }
    }

    static invokeCmd(player: alt.Player, cmd: string, args: string[]) {
        cmd = cmd.toLowerCase();
        const callback = this.cmdHandlers[cmd];

        if (callback) {
            callback(player, args);
        } else {
            this.send(player, `{FF0000} Unknown command /${cmd}`);
        }
    }
}


