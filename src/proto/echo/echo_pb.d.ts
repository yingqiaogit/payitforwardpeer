// package: echo
// file: echo.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Said extends jspb.Message { 
    getSomething(): string;
    setSomething(value: string): Said;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Said.AsObject;
    static toObject(includeInstance: boolean, msg: Said): Said.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Said, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Said;
    static deserializeBinaryFromReader(message: Said, reader: jspb.BinaryReader): Said;
}

export namespace Said {
    export type AsObject = {
        something: string,
    }
}

export class Repeated extends jspb.Message { 
    getSomething(): string;
    setSomething(value: string): Repeated;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Repeated.AsObject;
    static toObject(includeInstance: boolean, msg: Repeated): Repeated.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Repeated, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Repeated;
    static deserializeBinaryFromReader(message: Repeated, reader: jspb.BinaryReader): Repeated;
}

export namespace Repeated {
    export type AsObject = {
        something: string,
    }
}
