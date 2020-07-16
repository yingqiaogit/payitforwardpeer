// package: echo
// file: echo.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as echo_pb from "./echo_pb";

interface IEchoService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getEcho: IEchoService_IGetEcho;
}

interface IEchoService_IGetEcho extends grpc.MethodDefinition<echo_pb.Said, echo_pb.Repeated> {
    path: string; // "/echo.Echo/GetEcho"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<echo_pb.Said>;
    requestDeserialize: grpc.deserialize<echo_pb.Said>;
    responseSerialize: grpc.serialize<echo_pb.Repeated>;
    responseDeserialize: grpc.deserialize<echo_pb.Repeated>;
}

export const EchoService: IEchoService;

export interface IEchoServer {
    getEcho: grpc.handleUnaryCall<echo_pb.Said, echo_pb.Repeated>;
}

export interface IEchoClient {
    getEcho(request: echo_pb.Said, callback: (error: grpc.ServiceError | null, response: echo_pb.Repeated) => void): grpc.ClientUnaryCall;
    getEcho(request: echo_pb.Said, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: echo_pb.Repeated) => void): grpc.ClientUnaryCall;
    getEcho(request: echo_pb.Said, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: echo_pb.Repeated) => void): grpc.ClientUnaryCall;
}

export class EchoClient extends grpc.Client implements IEchoClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getEcho(request: echo_pb.Said, callback: (error: grpc.ServiceError | null, response: echo_pb.Repeated) => void): grpc.ClientUnaryCall;
    public getEcho(request: echo_pb.Said, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: echo_pb.Repeated) => void): grpc.ClientUnaryCall;
    public getEcho(request: echo_pb.Said, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: echo_pb.Repeated) => void): grpc.ClientUnaryCall;
}
