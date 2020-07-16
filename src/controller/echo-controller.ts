import { Request, ResponseToolkit } from "@hapi/hapi";
import { EchoClientService } from "../gRPC/client";
import { Said, Repeated } from "../proto/echo/echo_pb";

export class EchoController {

    static echoClientService = new EchoClientService();

    static echoHandler = async (request: Request, h: ResponseToolkit) => { 

        const name = String(request.params.name);

        const said = new Said();

        said.setSomething(name);

        const echoed: Repeated = await EchoController.echoClientService.getEcho(said); 
        
        return {response: `Hello World from ${echoed.getSomething()}`};
    }
}