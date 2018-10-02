import * as express from 'express';
import * as redis from 'redis';

export class Greeting { 
    
    public routes(app): void { //received the express instance from app.ts file         
        // example of handling the same route with another function
        app.route('/hello')
        .get((req: express.Request, res: express.Response, next: express.NextFunction) => {            
            console.log('%s special hello handler activated - User-Agent: %s', new Date().toLocaleString(), req.get('User-Agent'));
            next();
        })

        // simple handler example
        app.route('/hello')
        .get((req: express.Request, res: express.Response) => {            
            let demoOutput = 'Hello dear friend!';
            res.status(200).send(demoOutput);
        })

        app.route('/hello/:name')
        .get((req: express.Request, res: express.Response) => {
            const name = req.params.name;
            if (name === 'World') {
                throw new Error("No more Greeting World please!");
            }

            let demoOutput = 'Hello ' + name + '!';
            res.status(200).send(demoOutput);
        })

        // simple REDIS test
        app.route('/redis-echo')
        .get((req: express.Request, res: express.Response) => {            
            const client = redis.createClient('redis://redis.mrmarkus-sandbox.svc:6379');
            
            client.on("error", function (err) {
                console.log("REDIS error " + err);
            });

            client.set("redisecho", "testval " + new Date().toLocaleString(), redis.print);

            client.quit;

            let demoOutput = 'Redis echo done';
            res.status(200).send(demoOutput);
        })


    }
}