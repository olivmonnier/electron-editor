const {ipcRenderer, remote} = require('electron');
const codemirror = require('codemirror');
require('codemirror/addon/fold/xml-fold.js');
require('codemirror/addon/edit/matchtags.js');
require('codemirror/addon/edit/closetag.js');
require('codemirror/addon/hint/show-hint.js');
require('codemirror/addon/hint/xml-hint.js');
require('codemirror/addon/hint/html-hint.js');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/htmlmixed/htmlmixed.js');
require('codemirror/mode/css/css.js');

let data = require('./variables'), delay;

const editorOptions = {
  mode: data['mode'], 
  tabMode: 'indent',
  lineNumbers: true,
  tabSize: 2,
  extraKeys: {"Ctrl-Space": "autocomplete"},
  matchTags: {bothTags: true},
  autoCloseTags: true
}
const editor = codemirror.fromTextArea(document.querySelector('#editor'), editorOptions);

editor.on('change', () => {
  clearTimeout(delay);
  delay = setTimeout(updatePreview, 300);
});

function updatePreview() {
  const { mode } = data;

  data[getTypeActive(mode)] = editor.getValue();
  ipcRenderer.send('update-preview', data);
}

function getTypeActive(mode) {
  if (mode === 'htmlmixed') {
    return 'html'
  } else if(mode === 'css') {
    return 'css'
  } else if (mode === 'application/json') {
    return 'json'
  }
}

module.exports = {
  editor,
  getTypeActive
};