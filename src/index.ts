
import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { EchoController } from "./controller/echo-controller";

import { startgRPCServer } from "./gRPC/server";

const init = async () => {
    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request: Request, h: ResponseToolkit) => {
      
            return {response: `Welcome!`};
    
        } 
    });

    server.route({
        method: 'GET',
        path: '/{name}',
        handler: (request: Request, h: ResponseToolkit) => {
      
            return {response: `Hello World from ${request.params.name}!`};
    
        } 
    });

    server.route({
        method: 'GET',
        path: '/echo/{name}',
        handler: EchoController.echoHandler
    });

    await server.start();

    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

startgRPCServer();