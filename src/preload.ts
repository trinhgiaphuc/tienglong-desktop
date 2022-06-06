import { contextBridge, ipcRenderer } from 'electron';

process.on('loaded', () => {
  contextBridge.exposeInMainWorld('electronAPI', {
    ipcRenderer: ipcRenderer,
  });
});
