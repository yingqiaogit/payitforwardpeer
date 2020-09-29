# Pay It Forward Peer

This nodejs is a back end of the payitforward project

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

