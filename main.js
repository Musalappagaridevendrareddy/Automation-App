const {app, BrowserWindow, Menu} = require('electron')

function createWindow () {
    window = new BrowserWindow({
        width: 1024,
        height: 768,
    }
    )

    window.setIcon( './asserts/images/d1.jpg')
    window.setTitle("Automate Stuff 🛴");

    var menu = Menu.buildFromTemplate([
      {
        label: 'File',
        submenu: [
          {
            label: 'Main Menu',
            click: () => { window.loadFile('./asserts/html/index.html') }
          },
          {
            label: 'Records',
            // onclick load info.html in main window
            click: () => { window.loadFile('./asserts/html/records.html') }
          },
          {
            role: 'reload'
          },
          {
            role: 'togglefullscreen'
          },
          {
            //inspect element
            role: 'toggledevtools'
          },
          // exit fullscreen
          {
            label: 'Exit Fullscreen',
            accelerator: 'F11',
            click: function() {
              window.setFullScreen(false);
            }
          },
          {type:'separator'},  // Add this
              {
                  label:'Exit', 
                  click() { 
                      app.quit() 
                  } 
              }
        ]
      },
      {
          label: 'Edit',
              submenu: [
              { role: 'cut' },
              { role: 'copy' },
              { role: 'paste' },
              { role: 'delete' },
              { role: 'selectall' },
          ]
      },
      {
          label: 'Help',
          submenu: [
              {
                  label: 'About',
                  click: () => { window.loadFile('./asserts/html/about.html') }
              },
              {
                  label: "Help",
                  click: () => { window.loadFile('./asserts/html/info.html') }
              }
            ]
                  
      }
    ])
    Menu.setApplicationMenu(menu); 

    window.loadFile('./asserts/html/index.html')
    
}



app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
})