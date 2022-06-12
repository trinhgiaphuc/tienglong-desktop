import 'dotenv/config';
import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import fetch from 'electron-fetch';
import { RequestChannels, ResponseChannels } from './typings';

if (require('electron-squirrel-startup')) {
  app.quit();
}

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: RequestChannels, args: unknown[]): void;
        on(
          channel: ResponseChannels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(
          channel: ResponseChannels,
          func: (...args: unknown[]) => void
        ): void;
      };
      shell: {
        signUp: () => void;
        resetPassword: () => void;
      };
    };
  }
}

let mainWindow: BrowserWindow = null;

const BASE_URL = 'https://tienglong.vercel.app/api';
let TOKEN: string;

async function createWindow(): Promise<void> {
  mainWindow = new BrowserWindow({
    center: true,
    hasShadow: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    const { origin } = new URL(url);
    if (origin === 'https://tienglong-34e90.firebaseapp.com') {
      return { action: 'allow' };
    } else {
      return { action: 'deny' };
    }
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();

  ipcMain.on('get-today-words', handleSendTodayWords);
  ipcMain.on('set-auth', handleSetAuth);
  ipcMain.on('create-word', handleCreateWord);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

 async function fetcher(
  path: string,
  data: unknown = undefined
): Promise<unknown> {
  const res = await fetch(`${BASE_URL}/${path}`, {
     method: data ? 'POST' : 'GET',
     headers: {
       'Content-type': 'Application/json',
       'cookie': `USER_ACCESS_TOKEN=${TOKEN}`
     },
     body: JSON.stringify(data)
  });
   return res.json();
}

async function handleSendTodayWords() {
  const res = await fetch(`${BASE_URL}/word/today-words`);
  const data = await res.json();
  mainWindow.webContents.send('words', data);
}

async function handleSetAuth(
  e: IpcMainEvent,
  infoArray: [{ token: string; uid: string }]
) {
  const { token, uid } = infoArray[0];
  TOKEN = token;

  try {
    const res = await fetch(`${BASE_URL}/user/${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
      },
    });
    const userData: unknown = await res.json();
    mainWindow.webContents.send('user-data', userData);
  } catch (error) {
    console.error(error);
    mainWindow.webContents.send('user-data', null);
  }
}

async function handleCreateWord(
  e: IpcMainEvent,
  theWord: [
    { word: string; definition: string; example: string; tags: string[] }
  ]
) {
  const res = await fetcher('word/create', theWord[0]);
  console.log(res)
}
