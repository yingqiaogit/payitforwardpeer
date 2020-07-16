
import {EchoClient} from "../proto/echo/echo_grpc_pb";

import * as grpc from "grpc";
import { Said, Repeated } from "../proto/echo/echo_pb";

export class EchoClientService {

    private client: EchoClient = 
            new EchoClient("localhost:30051", grpc.credentials.createInsecure());

    async getEcho(said: Said): Promise<Repeated> {

        return new Promise<Repeated>((resolve: Function, reject: Function) => {

            this.client.getEcho(said, (err: grpc.ServiceError, repeated: Repeated) => {

                if (err) {
                    return reject(err);
                }

                resolve(repeated);
            })
        });
    }
}

