import { app, shell, BrowserWindow ,ipcMain} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

const login_width = 530;
const register_height = 635;


function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon:icon,
    width: login_width,
    height: register_height,
    show: false,
    transparent:true,
    autoHideMenuBar: true,
    titleBarStyle:'hidden',
    resizable:false,
    frame: true,
    mediaAccess:true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation:false,
      webSecurity: false,
    }
  })


  ipcMain.on('toMain',(event, args)=>{
    mainWindow.setResizable(true)
    mainWindow.setSize(((args.screenWidth / 5) * 3) + 150,600)
    mainWindow.setMinimumSize(((args.screenWidth / 5) * 3) + 150,600)
    mainWindow.center();
    mainWindow.setMaximizable(true)
    mainWindow.setMaximumSize(((args.screenWidth / 5) * 3) + 200,700)
  })

  ipcMain.on('minimizing',(event,args)=>{
    event.preventDefault(); // 阻止默认最小化行为
    mainWindow.minimize(); // 最小化到任务栏
  })

  ipcMain.on('expandWindow',(event,args)=>{
    let defaultSize = mainWindow.getSize();
    let maxSize = mainWindow.getMaximumSize();
    if (defaultSize[0] === (((args.screenWidth / 5) * 3) + 150) && defaultSize[1] === 600){
      mainWindow.setResizable(true)
      mainWindow.setSize(((args.screenWidth / 5) * 3) + 200,700)
    }else if (maxSize[0] === (((args.screenWidth / 5) * 3) + 200) && maxSize[1] === 700){
      mainWindow.setResizable(true)
      mainWindow.setSize(((args.screenWidth / 5) * 3) + 150,600)
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
   // 窗口调试 mainWindow.webContents.openDevTools()
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
