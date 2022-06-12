import { contextBridge, ipcRenderer, IpcRendererEvent, shell } from 'electron';
import { RequestChannels, ResponseChannels } from './typings';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: RequestChannels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: ResponseChannels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);
      return function unsubscribe() {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: ResponseChannels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  shell: {
    signUp() {
      shell.openExternal('https://tienglong.vercel.app/enter');
    },
    resetPassword() {
      shell.openExternal('https://tienglong.vercel.app/user/forgot-password');
    },
  },
});
