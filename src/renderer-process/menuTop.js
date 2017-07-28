const {ipcRenderer, remote} = require('electron');
const { editor, getTypeActive } = require('./editor');

let data = require('./variables');

const btnNewDocument = document.querySelector('#new')
const btnSaveFile = document.querySelector('#save');
const btnPreview = document.querySelector('#preview');

btnNewDocument.addEventListener('click', () => {
  ipcRenderer.send('new-document');
});

btnSaveFile.addEventListener('click', () => {
  ipcRenderer.send('save-file', data);
});

btnPreview.addEventListener('click', () => {
  ipcRenderer.send('new-preview', data);
});

ipcRenderer.on('reset-document', () => {
  const type = getTypeActive(data['mode']);

  Object.assign(data, {
    html: '',
    css: '',
    json: '{\n\n}'
  });

  editor.setValue(data[type]);
  ipcRenderer.send('update-preview', data);
});