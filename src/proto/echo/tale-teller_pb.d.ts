// package: echo
// file: tale-teller.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Title extends jspb.Message { 
    getName(): string;
    setName(value: string): Title;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Title.AsObject;
    static toObject(includeInstance: boolean, msg: Title): Title.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Title, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Title;
    static deserializeBinaryFromReader(message: Title, reader: jspb.BinaryReader): Title;
}

export namespace Title {
    export type AsObject = {
        name: string,
    }
}

export class Story extends jspb.Message { 
    getContent(): string;
    setContent(value: string): Story;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Story.AsObject;
    static toObject(includeInstance: boolean, msg: Story): Story.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Story, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Story;
    static deserializeBinaryFromReader(message: Story, reader: jspb.BinaryReader): Story;
}

export namespace Story {
    export type AsObject = {
        content: string,
    }
}
