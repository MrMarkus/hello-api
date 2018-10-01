import * as express from 'express';
import { Greeting } from "./routes/greeting";
class App {

    public app: express.Application;
    public greetingRoutes: Greeting = new Greeting();

    constructor() {
        this.app = express(); //run the express instance and store in app
        this.config();
        this.greetingRoutes.routes(this.app);
        console.log('debug: 456');
    }

    private config(): void {
        // support application/json type post data
        this.app.use(express.json());

        // support application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({
            extended: false
        }));

        // simple error handler
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.error(err.stack);
            res.status(500).send('We are sorry. Service is not available.');
        });

        // simple requests logger
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log('%s - %s %s', new Date().toLocaleString(), req.method , req.path);
            next();
        });

    }

}

export default new App().app;