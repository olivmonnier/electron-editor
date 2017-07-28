const {ipcMain, BrowserWindow} = require('electron');
const path = require('path');
const { processHtml } = require('./index');

let previewWindow;

ipcMain.on('new-preview', (e, data) => {
  previewWindow = new BrowserWindow({ width: 800, height: 600 });
  previewWindow.data = processHtml(data);
  previewWindow.setMenu(null);
  previewWindow.loadURL(path.join('file://', __dirname, '../windows/preview.html'));
  previewWindow.on('ready-to-show', () => previewWindow.show());
  previewWindow.on('closed', () => (previewWindow = null));
});

ipcMain.on('update-preview', (e, data) => {
  if(previewWindow) {
    previewWindow.data = processHtml(data);
    previewWindow.send('updated-preview', previewWindow.data);
  }
});
  
module.exports = previewWindow;