const {ipcRenderer, remote} = require('electron');

const currentWindow = remote.getCurrentWindow();

window.onload = () => updateView();

ipcRenderer.on('updated-preview', (e, data) => {
  updateView();
});

function updateView() {
  document.open();
  document.write(currentWindow.data);
  document.close();
}