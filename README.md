# echo-node-typescript-grpc

This node peer contains a RESTful server and gRPC server and client. The echo RESTful service will access the Echo gRPC server through a gRPC client.  

## Pre-build
- run `npm install`

## Build
- run `npm run build`

## Run
- run `npm run start`
- or `node ./dist/index.js`

## Use Case
- open a browser or a restful client (e.g., Postman)
- url `localhost:3000`, get welcome message
- url `localhost:3000/<name>`, replace "\<name\>" with a string, get response from restful service without gRPC
- url `localhost:3000/echo/<name>`, replace "\<name\>" with a string, get response from restful service which accesses the gRPC Echo Server through a gRPC client 

## Generate gRPC server and client from Protocol Buffer file
- run `./scripts/build-protos.sh`

## Port Number
- rest: 3000
- gRPC: 30051

## References
- https://adnanahmed.info/blog/2019/11/01/grpc-with-nodejs-typescript/
- https://github.com/CatsMiaow/node-grpc-typescript
