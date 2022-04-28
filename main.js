const fs = require('fs');
const url = require('url');
const path = require('path');
const electron = require('electron');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

app.on('ready', () =>{
    //creating a app window
    mainWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration : true,
            contextIsolation: false
        }
    });

    //the html main window load
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'camera.html'),
        protocol: 'file',
        slashes: true
    }))

    //creating a menu and setting it
    //mainMenu = Menu.buildFromTemplate(mainTemplate)
    //Menu.setApplicationMenu(mainMenu)
})


//the main menu template
const mainTemplate = [
    {
        label: 'Roi',
        submenu:[
            {
            
            }
        ]
    }
]
