const express       = require('express'),
    expphbs         = require('express-handlebars'),
    hbsHelpers      = require('handlebars-helpers'),
    hbsLayouts      = require('handlebars-layouts'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    errorhandler    = require('errorhandler'),
    csrf            = require('csurf'),
    morgan          = require('morgan'),
    favicon         = require('serve-favicon'),
    
    router          = require('./routes/router'),
    database        = require('./lib/database'),
    seeder          = require('./lib/dbSeeder'),
    app             = express(),
    port            = 4000;


    /**
     * Startup class to bootstrap Web server
     * TODO: Check if this file should be Typescript
     * @class Server
     */
    class Server {

        constructor(){
            this.initViewEngine();
            this.initExpressMiddleware();
            this.initCustomMiddleware();
            this.initDbSeeder();
            this.initRoutes();
            this.start();
        }


        start() {
            app.listen(port, (err) => {
                console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
            })
        }

        initViewEngine() {
            app.set('view engine', 'ejs');
        // const hbs = exphbs.create({
        //     extname: '.hbs',
        //     defaultLayout: 'master'
        // });
        // app.engine('hbs', hbs.engine);
        // app.set('view engine', 'hbs');
        // hbsLayouts.register(hbs.handlebars, {});
    }

    initExpressMiddleWare() {
        app.use(favicon(__dirname + '/public/images/favicon.ico'));
        app.use(express.static(__dirname + '/public'));
        app.use(morgan('dev'));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(errorhandler());
        app.use(cookieParser());
        //app.use(csrf({ cookie: true }));

        //app.use((req, res, next) => {
        //    var csrfToken = req.csrfToken();
        //    res.locals._csrf = csrfToken;
        //    res.cookie('XSRF-TOKEN', csrfToken);
        //    next();
        //});

        process.on('uncaughtException', (err) => {
            if (err) console.log(err, err.stack);
        });
    }

        /**
         * Initialize Routes based on folder structure
         * 
         * @memberOf Server
         */
        initRoutes(){
            router.load(app, './controllers');

            // redirect all others to index.
            app.all('/*', function(req, res) {
                res.sendFile(`${__dirname}/public/index.html`);
            })
        }
    }