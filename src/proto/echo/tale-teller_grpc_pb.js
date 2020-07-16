// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var tale$teller_pb = require('./tale-teller_pb.js');

function serialize_echo_Story(arg) {
  if (!(arg instanceof tale$teller_pb.Story)) {
    throw new Error('Expected argument of type echo.Story');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_echo_Story(buffer_arg) {
  return tale$teller_pb.Story.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_echo_Title(arg) {
  if (!(arg instanceof tale$teller_pb.Title)) {
    throw new Error('Expected argument of type echo.Title');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_echo_Title(buffer_arg) {
  return tale$teller_pb.Title.deserializeBinary(new Uint8Array(buffer_arg));
}


// the service of echo
var TaleTellerService = exports.TaleTellerService = {
  // get echo
getTale: {
    path: '/echo.TaleTeller/GetTale',
    requestStream: false,
    responseStream: false,
    requestType: tale$teller_pb.Title,
    responseType: tale$teller_pb.Story,
    requestSerialize: serialize_echo_Title,
    requestDeserialize: deserialize_echo_Title,
    responseSerialize: serialize_echo_Story,
    responseDeserialize: deserialize_echo_Story,
  },
};

exports.TaleTellerClient = grpc.makeGenericClientConstructor(TaleTellerService);
