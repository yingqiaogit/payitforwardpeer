import * as grpc from "grpc";

import { Said, Repeated } from "../proto/echo/echo_pb";
import { EchoService, IEchoServer } from "../proto/echo/echo_grpc_pb";


class EchoHandler implements IEchoServer {

    getEcho = (call: grpc.ServerUnaryCall<Said>, 
            callback: grpc.sendUnaryData<Repeated>) : void => {

                const echoBack = new Repeated();

                echoBack.setSomething(`Echo of ${call.request.getSomething()}`);

                callback(null, echoBack);
            };    
}

export default {
    service: EchoService,
    handler: new EchoHandler()
};