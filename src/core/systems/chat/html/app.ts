let chatOpened: boolean = false;
let buffer: string[] = [];
let currentBufferIndex: number = -1;
let timeout: NodeJS.Timeout | null = null;
let messagesBlock: HTMLElement | null = null;
let msgListBlock: HTMLElement | null = null;
let msgInputBlock: HTMLElement | null = null;
let msgInputLine: HTMLInputElement | null = null;

const windowClone: any = window || {};

if (windowClone.alt === undefined) {
    // @ts-ignore
    windowClone.alt = {
        emit: () => {
        },
        on: () => {
        }
    };
}

function colorify(text: string): string {
    let matches: { found: string; index: number }[] = [];
    let m: RegExpExecArray | null = null;
    let curPos: number = 0;

    do {
        m = /\{[A-Fa-f0-9]{3}\}|\{[A-Fa-f0-9]{6}\}/g.exec(text.substr(curPos));

        if (!m) {
            break;
        }

        matches.push({
            found: m[0],
            index: m.index + curPos
        });

        curPos = curPos + m.index + m[0].length;
    } while (m !== null);

    if (matches.length > 0) {
        text += '</font>';

        for (let i = matches.length - 1; i >= 0; --i) {
            let color = matches[i].found.substring(1, matches[i].found.length - 1);
            let insertHtml = (i != 0 ? '</font>' : '') + '<font color="#' + color + '">';
            text =
                text.slice(0, matches[i].index) +
                insertHtml +
                text.slice(matches[i].index + matches[i].found.length, text.length);
        }
    }

    return text;
}

function checkOverflow(): void {
    if (messagesBlock?.clientHeight! > msgListBlock?.clientHeight!) {
        if (!msgListBlock?.classList.contains('overflowed')) {
            msgListBlock?.classList.add('overflowed');
        }
    } else if (msgListBlock?.classList.contains('overflowed')) {
        msgListBlock?.classList.remove('overflowed');
    }
}

function openChat(insertSlash: boolean): void {
    clearTimeout(timeout!);

    if (!chatOpened) {
        document.querySelector('.chatbox')?.classList.add('active');

        if (insertSlash) {
            msgInputLine!.value = '/';
        }

        msgInputBlock!.style.display = 'block';
        msgInputBlock!.style.opacity = '1';
        msgInputLine!.focus();

        chatOpened = true;
    }
}

function closeChat(): void {
    if (chatOpened) {
        document.querySelector('.chatbox')?.classList.remove('active');

        msgInputLine!.blur();
        msgInputBlock!.style.display = 'none';

        chatOpened = false;
    }
}

windowClone.addEventListener('load', () => {
    messagesBlock = document.querySelector('.messages');
    msgListBlock = document.querySelector('.msglist');
    msgInputBlock = document.querySelector('.msginput');
    msgInputLine = document.querySelector('.msginput input');

    document.querySelector('#message')!.addEventListener('submit', (e) => {
        e.preventDefault();

        windowClone.alt.emit('chatmessage', msgInputLine!.value);

        saveBuffer();
        closeChat();

        msgInputLine!.value = '';
    });

    msgInputLine!.addEventListener('keydown', (e) => {
        if (e.keyCode === 9) {
            e.preventDefault();
        } else if (e.keyCode === 40) {
            e.preventDefault();

            if (currentBufferIndex > 0) {
                loadBuffer(--currentBufferIndex);
            } else if (currentBufferIndex === 0) {
                currentBufferIndex = -1;
                msgInputLine!.value = '';
            }
        } else if (e.keyCode === 38) {
            e.preventDefault();

            if (currentBufferIndex < buffer.length - 1) {
                loadBuffer(++currentBufferIndex);
            }
        }
    });

    windowClone.alt.emit('chatloaded');
});

function saveBuffer(): void {
    if (!msgInputLine!.value) return;
    if (buffer.length > 100) {
        buffer.pop();
    }

    buffer.unshift(msgInputLine!.value);
    currentBufferIndex = -1;
}

function loadBuffer(idx: number): void {
    msgInputLine!.value = buffer[idx];
}

function highlightChat(): void {
    msgListBlock?.scrollTo({
        left: 0,
        top: msgListBlock.scrollHeight,
        behavior: 'smooth'
    });

    document.querySelector('.chatbox')?.classList.add('active');

    clearTimeout(timeout!);
    timeout = setTimeout(
        () => document.querySelector('.chatbox')?.classList.remove('active'),
        4000
    );
}

function addString(text: string): void {
    if (messagesBlock?.children.length! > 100) {
        messagesBlock?.removeChild(messagesBlock.children[0]);
    }

    const msg = document.createElement('p');
    msg.innerHTML = text;
    messagesBlock?.appendChild(msg);

    checkOverflow();
    highlightChat();
}

windowClone.alt.on('addString', (text: string) => addString(colorify(text)));
windowClone.alt.on('addMessage', (name: string, text: string) =>
    addString('<b>' + name + ': </b>' + colorify(text))
);
windowClone.alt.on('openChat', openChat);
windowClone.alt.on('closeChat', closeChat);
