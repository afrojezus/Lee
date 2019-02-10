const {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  Menu,
  TouchBar
} = require('electron');
const { TouchBarButton, TouchBarLabel, TouchBarSpacer } = TouchBar;
const { getPluginEntry } = require('mpv.js');

const path = require('path');
const isDev = require('electron-is-dev');

const pluginDir = path.join(
  path.dirname(require.resolve('mpv.js')),
  'build',
  'Release'
);

if (process.platform !== 'linux') {
  process.chdir(pluginDir);
}
// To support a broader number of systems.
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch(
  'register-pepper-plugins',
  getPluginEntry(pluginDir)
);

let mainWindow;

createWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: '#111',
    minWidth: 900,
    show: false,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js',
      plugins: true
    },
    height: 860,
    width: 1280
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    } = require('electron-devtools-installer');

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`);
      })
      .catch(err => {
        console.log('An error occurred: ', err);
      });

    installExtension(REDUX_DEVTOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`);
      })
      .catch(err => {
        console.log('An error occurred: ', err);
      });
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    ipcMain.on('open-external-window', (event, arg) => {
      shell.openExternal(arg);
    });
  });
};

generateMenu = () => {
  const template = [
    {
      label: 'File',
      submenu: [{ role: 'about' }, { role: 'quit' }]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
        { role: 'Preferences' }
      ]
    },
    {
      label: 'Playback',
      submenu: [
        { role: 'Play/Pause' },
        { role: 'Next' },
        { role: 'Previous' },
        { role: 'Stop' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }]
    },
    {
      role: 'help',
      submenu: [
        {
          click() {
            require('electron').shell.openExternal(
              'https://getstream.io/winds'
            );
          },
          label: 'Learn More'
        },
        {
          click() {
            require('electron').shell.openExternal(
              'https://github.com/GetStream/Winds/issues'
            );
          },
          label: 'File Issue on GitHub'
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

app.on('ready', () => {
  createWindow();
  generateMenu();
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('load-page', (event, arg) => {
  mainWindow.loadURL(arg);
});
