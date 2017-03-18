const   fs      = require('fs'),
        path    = require('path'),
        express = require('express');


class Router {

    constructor(){
        this.startFolder = null;
    }

    /**
     * Called once during initial server startup.
     * Maps routes dependent on the folder structure of 'controllers'
     * @param {} app 
     * @param {any} folderName 
     * 
     * @memberOf Router
     */
    load(app, folderName) {

        if(!this.startFolder) { this.startFolder = path.basename(folderName); }

        fs.readdirSync(folderName).forEach((file) => {

            const fullName = path.join(folderName, file);
            const stat = fs.lstatSync(fullName);

            if(stat.isDirectory()) {
                // Walk through the folder structure recursively.
                this.load(app, fullName);
            } else if(file.toLowerCase().indexOf('.ts')) {
                // Collect path to typescript file and use it to construct the route
                let dirs = path.dirname(fullName).split(path.sep);

                if(dirs[0].toLowerCase() === this.startFolder.toLowerCase()) {
                    dirs.splice(0, 1);
                }

                const router = express.Router();
                // Generate Route
                // Make sure the line below actually works
                const baseRoute = `/${dirs.join('/')}`;
                console.log(`Created route: ${baseRoute} for ${fullName}`);

                // load the Typescript file ('controller') and pass the router to it.
                const controllerClass = require(`../${fullName}`);
                const controller = new controllerClass(router);

                // Associate the route with the router
                app.use(baseRoute, router);
            }
        })
    }
    
}

module.exports = new Router();