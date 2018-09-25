import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import { app, BrowserWindow, ipcMain } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'
import url from 'url'
import events from './libs/ipcMainEvents'

let mainWindow = null

// Registramos los eventos del ipcMain
events.forEach((event) => {
  ipcMain.on(event.name, event.func)
})

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    height: 530,
    minHeight: 530,
    minWidth: 700,
    resizable: false,
    title: 'SAPI - UNAMBA',
    width: 700,
  })

  mainWindow.setMenu(null)

  if (isDev) {
    mainWindow.loadURL('http://127.0.0.1:8080')

    try {
      await installExtension(REACT_DEVELOPER_TOOLS)
      mainWindow.webContents.openDevTools()
    } catch (error) {
      // Pass
    }
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    )
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
