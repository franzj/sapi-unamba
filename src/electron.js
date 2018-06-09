import { app, BrowserWindow, ipcMain } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'
import url from 'url'
import events from './libs/ipcMainEvents'


let mainWindow = null

// Registramos los eventos del ipcMain
for (let i = 0; i < events.length; i++) {
  ipcMain.on(events[i].name, events[i].func)
}

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 450,
    minHeight: 450,
    minWidth: 650,
    resizable: false,
    title: 'SAPI - UNAMBA',
    width: 650,
  })

  mainWindow.setMenu(null)

  if (isDev) {
    mainWindow.loadURL('http://127.0.0.1:8080')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
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
