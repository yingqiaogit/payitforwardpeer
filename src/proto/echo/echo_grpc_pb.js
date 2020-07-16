// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var echo_pb = require('./echo_pb.js');

function serialize_echo_Repeated(arg) {
  if (!(arg instanceof echo_pb.Repeated)) {
    throw new Error('Expected argument of type echo.Repeated');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_echo_Repeated(buffer_arg) {
  return echo_pb.Repeated.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_echo_Said(arg) {
  if (!(arg instanceof echo_pb.Said)) {
    throw new Error('Expected argument of type echo.Said');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_echo_Said(buffer_arg) {
  return echo_pb.Said.deserializeBinary(new Uint8Array(buffer_arg));
}


// the service of echo
var EchoService = exports.EchoService = {
  // get echo
getEcho: {
    path: '/echo.Echo/GetEcho',
    requestStream: false,
    responseStream: false,
    requestType: echo_pb.Said,
    responseType: echo_pb.Repeated,
    requestSerialize: serialize_echo_Said,
    requestDeserialize: deserialize_echo_Said,
    responseSerialize: serialize_echo_Repeated,
    responseDeserialize: deserialize_echo_Repeated,
  },
};

exports.EchoClient = grpc.makeGenericClientConstructor(EchoService);
