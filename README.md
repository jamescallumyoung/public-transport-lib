# Public Transport API

A promise-based JavaScript library for the `transport.opendata.ch` API.

 ## Installation
 
 ```npm install --save @jych/public-transport-lib```
 
 ## Usage
 
 The lib can be used as either a JS module or as a CLI application. 
 
 ### JS Module
 
 To include the lib in your JS codebase, just `require` it:
 
 ```
 const Transport = require('@jych/public-transport-lib');
 const transport = new Transport();
 // use it... 
 ```
 ### CLI Application
 
 The CLI app is registered automatically when you install the module via NPM.
 
 To invoke the app, run:
 
 ```
 $ transporter [opts] <command> [command-opts] [command-args]
 ```
 
 #### Commands
 
 The CLI app uses sub-commands in the same style as Git.
 
 For a full listing of available commands, run:
 
 ```
 $ transporter --help
 ```
 
 You can get help with a command with
 
 ```
 $ transporter <command> --help
 ```
 
 #### Example CLI usage
 
 ```
 $ transporter find-station "Zurich"
 -> Zürich HB [8503000]
    Zürich Oerlikon [8503006]
    Zürich Hardbrücke [8503020]
    Zürich Stadelhofen [8503003]
    Zürich Flughafen [8503016]
    Zürich, Bellevue [8576193]
    Zürich Altstetten [8503001]
    Zürich, Central [8588078]
    Zürich, Paradeplatz [8591299]
    Zürich, Bahnhofquai/HB [8587349]
    
 $ transporter departures "Zürich HB" --help
 -> Searching for Departures from Station "Zürich HB"
    Found 10:
    Zürich HB @ 17:47 ► Ziegelbrücke @ 18:41
    Zürich HB @ 17:49 ► Winterthur @ 18:25
    Zürich HB @ 17:49 ► Affoltern am Albis @ 18:18
    Zürich HB @ 17:49 ► Pfäffikon ZH @ 18:23
    Zürich HB @ 17:51 ► Zug @ 18:24
    Zürich HB @ 17:52 ► Zürich Flughafen @ 18:04
    Zürich HB @ 17:52 ► Dielsdorf @ 18:15
    Zürich HB @ 17:53 ► Bern @ 19:21
    Zürich HB @ 17:54 ► Pfäffikon SZ @ 18:38
    Zürich HB @ 17:55 ► Winterthur @ 18:19
 ```
