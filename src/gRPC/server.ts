import "dotenv/config";
import * as grpc from "grpc";

import echoHandler from "../handler/echo-handler";

const port: string | number = process.env.gRPC_PORT || 30051;

export const startgRPCServer = (): void => {

    const gRPCServer = new grpc.Server();

   gRPCServer.addService(echoHandler.service, echoHandler.handler);

   gRPCServer.bindAsync(
       `localhost:${port}`,
       grpc.ServerCredentials.createInsecure(),
       (err: Error, port: number) => {

            if (err) {
                return console.error(err);
            }

            console.log(`gRPC is listening on ${port}`);
       }    
   );

   gRPCServer.start();
};
