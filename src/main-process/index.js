const { ipcMain, dialog } = require('electron');
const nunjucks = require('nunjucks');
const fs = require('fs');

nunjucks.configure({ autoescape: true });

ipcMain.on('new-document', (e) => {
  const messageBoxOptions = {
    type: 'question',
    buttons: ['OK', 'Cancel'],
    cancelId: 1,
    message: 'Are you sure for a new document ?'
  }

  dialog.showMessageBox(messageBoxOptions, (response) => {
    if (response === 0) {
      e.sender.send('reset-document');
    }
  });
}); 

ipcMain.on('save-file', (e, data) => {
  const saveDialogOptions = {
    filters: [
      {name: 'HTML', extensions: ['html']}
    ]
  }
 
  dialog.showSaveDialog(saveDialogOptions, filepath => {
    if (filepath) {
      fs.writeFileSync(filepath, processHtml(data))
    }
  })
});

function processHtml(data) {
  const { html, css, json } = data;

  let htmlString;

  try {
    htmlString = nunjucks.renderString(html, isJson(json) ? JSON.parse(json) : {}) ;
  } catch(e) {
    htmlString = '';
  } 

  htmlString = buildPage(css, htmlString);

  return htmlString;
} 

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function buildPage(cssString, htmlString) {
  return `
    <html>
      <head>
        <style>
          ${cssString}
        </style>
      </head>
      <body>
        ${htmlString}
      </body>
    </html>
  `
}

module.exports = {
  processHtml
} 