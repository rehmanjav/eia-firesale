"use strict";

const { app, BrowserWindow } = require('electron');

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({ show: false, webPreferences: {nodeIntegration: true, contextIsolation: ?????} });

    mainWindow.loadFile('./app/index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});