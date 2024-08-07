import express, { Router } from 'express';

interface Options {
    port?: number;
    routes: Router;
}


export class Server {
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port = 3100, routes } = options;

        this.port = port;
        this.routes = routes;
    }

    async start(){
        //* Define your middlewares here
        this.app.use(this.routes);


        //* Start the server and listen on the specified port
        this.app.listen(this.port, () => {
            console.log('server started');
        });
    }
}