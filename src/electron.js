const {app, BrowserWindow} = require('electron'),
  isDev = require('electron-is-dev'),
  path = require('path'),
  url = require('url')


let mainWindow = null

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    'height': 450,
    'minHeight': 450,
    'minWidth': 650,
    'resizable': false,
    'title': 'SAPI - UNAMBA',
    'width': 650
  })

  mainWindow.setMenu(null)

  if (isDev) {
    mainWindow.loadURL('http://127.0.0.1:8080')
  } else {
    mainWindow.loadURL(url.format({
      'pathname': path.join(__dirname, 'index.html'),
      'protocol': 'file:',
      'slashes': true
    }))
  }


  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
