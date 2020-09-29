
import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { EchoController } from "./controller/echo-controller";

import { startgRPCServer } from "./gRPC/server";
import { HarmonyOneController } from "./controller/harmony-one-controller";

const init = async () => {
    const server: Server = new Server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: true
        }
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

    server.route({
        method: 'GET',
        path: '/harmonyOne/accounts/info',
        handler: HarmonyOneController.peekAccount
    });

    server.route({
        method: 'GET',
        path: '/harmonyOne/accounts',
        handler: HarmonyOneController.listAccountsHandler
    });

    server.route({
        method: 'POST',
        path: '/harmonyOne/transfer',
        handler: HarmonyOneController.transferFundHandler
    });

    server.route({
        method: 'POST',
        path: '/harmonyOne/deploy',
        handler: HarmonyOneController.deployContractHandler
    });
    
    server.route({
        method: 'GET',
        path: '/harmonyOne/contract/owner',
        handler: HarmonyOneController.getContractOwnerHandler
    });

    server.route({
        method: 'POST',
        path: '/harmonyOne/contract/owner',
        handler: HarmonyOneController.setContractOwnerHandler
    });

    server.route({
        method: 'GET',
        path: '/harmonyOne/contract/balance',
        handler: HarmonyOneController.getContractBalanceHandler
    });

    server.route({
        method: 'POST',
        path: '/harmonyOne/contract/withdraw',
        handler: HarmonyOneController.withdrawFromContractHandler
    });

    server.route({
        method: 'POST',
        path: '/harmonyOne/donate',
        handler: HarmonyOneController.donateHandler
    });

    server.route({
        method: 'POST',
        path: '/harmonyOne/consume',
        handler: HarmonyOneController.consumeHandler
    });

    server.route({
        method: 'POST',
        path: '/harmonyOne/consume/withpromise',
        handler: HarmonyOneController.consumeWithPromiseHandler
    });

    server.route({
        method: 'DELETE',
        path: '/harmonyOne/promises',
        handler: HarmonyOneController.redeemPromiseHandler
    });

    server.route({
        method: 'GET',
        path: '/harmonyOne/promises',
        handler: HarmonyOneController.getPromises
    });

    //-------------------------------------------
    server.route({
        method: 'POST',
        path: '/harmonyOne/counter/deploy',
        handler: HarmonyOneController.deployExample
    });

    server.route({
        method: 'GET',
        path: '/harmonyOne/counter/count',
        handler: HarmonyOneController.count
    });

    server.route({
        method: 'POST',
        path: '/harmonyOne/counter/increment',
        handler: HarmonyOneController.incrementCounter
    });

    server.route({
        method: 'POST',
        path: '/harmonyOne/counter/jump',
        handler: HarmonyOneController.jump
    });

    server.route({
        method: 'POST',
        path: '/harmonyOne/counter/owner',
        handler: HarmonyOneController.setOwner
    });

    server.route({
        method: 'GET',
        path: '/harmonyOne/counter/owner',
        handler: HarmonyOneController.owner
    });

    server.route({
        method: 'GET',
        path: '/harmonyOne/counter/sender',
        handler: HarmonyOneController.sender
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