const {app, BrowserWindow} = require('electron');
require('electron-debug')({enabled: true});
const path = require('path');
const url = require('url');

let win;

function createWindow() {
    win = new BrowserWindow({width: 800, height: 300, icon: "Icon.ico"});

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Disable the menubar
    win.setMenu(null);

    // Setting the window title
    win.setTitle('UTF-8 Converter Utility');

    win.on('closed', () => {
        win = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.