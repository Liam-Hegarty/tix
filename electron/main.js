
const { app, BrowserWindow, nativeImage } = require('electron')
const path = require('path')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    icon: __dirname + "tix-icon.ico"
  })

  mainWindow.loadFile('build/index.html')
  mainWindow.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  app.quit()
})

const icon = nativeImage.createFromPath(__dirname + "/docs/tix-icon.ico")
app.dock.setIcon(icon)