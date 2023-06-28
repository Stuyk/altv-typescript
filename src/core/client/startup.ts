import * as alt from 'alt-client';
import { Chat } from '../systems/chat/client';

alt.onServer('log:Console', handleLogConsole);

function handleLogConsole(msg: string) {
    alt.log(msg);
}

Chat.init();
