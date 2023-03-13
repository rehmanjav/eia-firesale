"use strict";

const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

const getFileFromUser = exports.getFileFromUser = () => {
    dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Markdown Files', extensions: ['md', 'markdown'] },
            { name: 'Text Files', extensions: ['txt'] },
        ]
    }).then(result => {
        const files = result.filePaths;
        if (!files) { return; };
        const file = files[0];
        const content = fs.readFileSync(file).toString();

        console.log(content);
    }).catch((error) => {
        console.log(error)
    });
};

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: true, contextIsolation: false, } });

    mainWindow.loadFile('./app/index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        getFileFromUser();
        mainWindow.webContents.openDevTools();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});