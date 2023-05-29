import * as alt from 'alt-server';

const enum Status {
    Loading = 'LOADING',
    MainMenu = 'MAIN_MENU',
    DownloadingFiles = 'DOWNLOADING_FILES',
    Connecting = 'CONNECTING',
    InGame = 'IN_GAME',
    Disconnecting = 'DISCONNECTING',
    Error = 'ERROR',
}

const RETRY_DELAY = 2500;
const DEBUG_PORT = 9223;

async function getLocalClientStatus(): Promise<Status | null> {
    try {
        const response = await fetch(`http://127.0.0.1:${DEBUG_PORT}/status`);
        return response.text() as unknown as Status;
    } catch (error) {
        return null;
    }
}

export async function connectLocalClient(): Promise<void> {
    const status = await getLocalClientStatus();
    if (status === null) {
        return;
    }

    if (status !== Status.MainMenu && status !== Status.InGame) {
        setTimeout(() => connectLocalClient(), RETRY_DELAY);
    }

    try {
        await fetch(`http://127.0.0.1:${DEBUG_PORT}/reconnect`, {
            method: 'POST',
            body: 'serverPassword', // only needed when a password is set in the server.toml
        });
    } catch (error) {
        console.log(error);
    }
}

if (alt.debug) {
    connectLocalClient();
}
