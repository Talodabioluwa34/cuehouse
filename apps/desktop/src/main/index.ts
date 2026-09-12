import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'

let boothWindow: BrowserWindow | null = null
let displayWindow: BrowserWindow | null = null

const isDev = !app.isPackaged

function createBoothWindow(): void {
  boothWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    title: 'CueHouse Live',
    backgroundColor: '#070A0E',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  })

  boothWindow.on('closed', () => {
    boothWindow = null
    if (displayWindow && !displayWindow.isDestroyed()) {
      displayWindow.close()
    }
  })

  if (isDev && process.env['ELECTRON_RENDERER_URL']) {
    boothWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    boothWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function createDisplayWindow(): void {
  if (displayWindow && !displayWindow.isDestroyed()) {
    displayWindow.focus()
    return
  }

  displayWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: 'CueHouse · House Display',
    backgroundColor: '#000000',
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  })

  displayWindow.on('closed', () => {
    displayWindow = null
    boothWindow?.webContents.send('display:closed')
  })

  const base =
    isDev && process.env['ELECTRON_RENDERER_URL']
      ? process.env['ELECTRON_RENDERER_URL']
      : null

  if (base) {
    displayWindow.loadURL(`${base}#/display`)
  } else {
    displayWindow.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: '/display'
    })
  }
}

app.whenReady().then(() => {
  createBoothWindow()

  ipcMain.handle('display:open', () => {
    createDisplayWindow()
    return { ok: true }
  })

  ipcMain.handle('display:black', () => {
    displayWindow?.webContents.send('house:set', { mode: 'black' })
    return { ok: true }
  })

  ipcMain.handle('house:present', (_evt, payload: { reference: string; text: string }) => {
    if (!displayWindow || displayWindow.isDestroyed()) {
      createDisplayWindow()
    }
    displayWindow?.webContents.send('house:set', {
      mode: 'verse',
      reference: payload.reference,
      text: payload.text
    })
    return { ok: true }
  })

  ipcMain.on('open-external', (_evt, url: string) => {
    shell.openExternal(url)
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createBoothWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
