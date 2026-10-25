const { app, BrowserWindow, shell } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 750,
    minWidth: 800,
    minHeight: 500,
    autoHideMenuBar: true,
    title: 'ChatApp',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL('https://chatapp.lat');

  // Links to other sites (Google, YouTube, Spotify) open in the default browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith('https://chatapp.lat')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });
}

// Only one instance of the app at a time
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.whenReady().then(createWindow);
}

app.on('window-all-closed', () => app.quit());