# Pay It Forward Peer

This nodejs is a back end of the payitforward project

## Pre-build
- run `npm install`

## Build
- run `npm run build`

## Set .env file
- copy .env.tmp to .env
- fill in the private key of home, alice and newlandfund
- make sure that home account has tokens

## Run
- run `npm run start`
- or `node ./dist/index.js`

## Use Case
###  Transfer tokens from home to the harmonyOne account (type='account') or smart contract (type='contract') of alice (to='alice') or of newlandfund (to='newlandfund')
- send restful request from curl or postman, `POST, http://localhost:3000/harmonyOne/transfer`
- with body: 
`{
    "from": "home",
    "to": "newlandfund",     
    "amount": "1000",
    "type": "contract"       
}`

### Alice requires tokens from newland fund by making promise for future giving back
- restful request, `POST, http://localhost:3000/harmonyOne/consume/withpromise?amount=20'
- with body:
`{
    "name": "1st promise",
    "amount": 20
}`

### Alice list all of the promise
- restful request, `GET, http://localhost:3000/harmonyOne/promises?account=alice`

### Alice redeems promise with its index
- restful request, `DELETE, http://localhost:3000/harmonyOne/promises?index=0`

### Alice withdraws tokens from her smart contract
- restful request, `POST, http://localhost:3000/harmonyOne/contract/withdraw`
- with body: 
`{
    "account": "alice",
    "amount": "20"
}`