import express, { Router } from 'express';

interface Options {
    port: number;
    routes: Router;
}


export class Server {
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port    , routes } = options;

        this.port = port;
        this.routes = routes;
    }

    async start(){
        //Middleware
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


        //* Define your middlewares here
        this.app.use(this.routes);


        //* Start the server and listen on the specified port
        this.app.listen(this.port, () => {
            console.log('server started on port ' + this.port);
        });
    }
}