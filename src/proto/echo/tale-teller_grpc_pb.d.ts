// package: echo
// file: tale-teller.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as tale_teller_pb from "./tale-teller_pb";

interface ITaleTellerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getTale: ITaleTellerService_IGetTale;
}

interface ITaleTellerService_IGetTale extends grpc.MethodDefinition<tale_teller_pb.Title, tale_teller_pb.Story> {
    path: string; // "/echo.TaleTeller/GetTale"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<tale_teller_pb.Title>;
    requestDeserialize: grpc.deserialize<tale_teller_pb.Title>;
    responseSerialize: grpc.serialize<tale_teller_pb.Story>;
    responseDeserialize: grpc.deserialize<tale_teller_pb.Story>;
}

export const TaleTellerService: ITaleTellerService;

export interface ITaleTellerServer {
    getTale: grpc.handleUnaryCall<tale_teller_pb.Title, tale_teller_pb.Story>;
}

export interface ITaleTellerClient {
    getTale(request: tale_teller_pb.Title, callback: (error: grpc.ServiceError | null, response: tale_teller_pb.Story) => void): grpc.ClientUnaryCall;
    getTale(request: tale_teller_pb.Title, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: tale_teller_pb.Story) => void): grpc.ClientUnaryCall;
    getTale(request: tale_teller_pb.Title, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: tale_teller_pb.Story) => void): grpc.ClientUnaryCall;
}

export class TaleTellerClient extends grpc.Client implements ITaleTellerClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getTale(request: tale_teller_pb.Title, callback: (error: grpc.ServiceError | null, response: tale_teller_pb.Story) => void): grpc.ClientUnaryCall;
    public getTale(request: tale_teller_pb.Title, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: tale_teller_pb.Story) => void): grpc.ClientUnaryCall;
    public getTale(request: tale_teller_pb.Title, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: tale_teller_pb.Story) => void): grpc.ClientUnaryCall;
}
