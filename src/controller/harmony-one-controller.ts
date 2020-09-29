import { Request, ResponseToolkit } from "@hapi/hapi";
import { ExampleClient } from "../harmony-one-client/example-client";
import { PayItForwardClient } from "../harmony-one-client/payitforward-client";
import { AccountBalance } from "../model/account-info";
import { DemoAccount } from "../model/demo-account";
import { FuturePromise } from "../model/future-promise";
import { PromiseListElement } from "../model/promise-list";
import { TransferRequest } from "../model/transfer-request";
import { WithdrawRequest } from "../model/withdraw-request";

const ALICE='alice';
const NEWLANDFUND='newlandfund';
export class HarmonyOneController {

    static payItForward = new PayItForwardClient();
    static example = new ExampleClient();

    static peekAccount = async (request: Request, h: ResponseToolkit) => { 

        const accountName = String(request.query.account);

        const balance: AccountBalance = await HarmonyOneController.payItForward.peekAccount(accountName);

        return balance.serialize();
    }

    static listAccountsHandler = async (request: Request, h: ResponseToolkit) => { 

        return DemoAccount.serializeArray(HarmonyOneController.payItForward.getAccounts());
    }

    static transferFundHandler = async (request: Request, h: ResponseToolkit) => { 

        const transferRequest = TransferRequest.deserialize(request.payload);
        
        const balances: Array<AccountBalance> = 
            await HarmonyOneController.payItForward.transferFund(transferRequest);

        return AccountBalance.serializeArray(balances);
    }

    static deployContractHandler = async (request: Request, h: ResponseToolkit) => {

        const accountName = String(request.query.account);
        
        const deployedAddress = await HarmonyOneController.payItForward.deployContract(accountName);

        return {deployedAt: deployedAddress};
    }

    static getContractOwnerHandler = async (request: Request, h: ResponseToolkit) => {

        const accountName = String(request.query.account);
        
        const owner = await HarmonyOneController.payItForward.getContractOwner(accountName);

        return {owner: owner};
    }

    static setContractOwnerHandler = async (request: Request, h: ResponseToolkit) => {

        const accountName = String(request.query.account);
        
        const owner = await HarmonyOneController.payItForward.setContractOwner(accountName);

        return {owner: owner};
    }

    static getContractBalanceHandler = async (request: Request, h: ResponseToolkit) => {

        const accountName = String(request.query.account);
        
        const balance = await HarmonyOneController.payItForward.getContractBalance(accountName);

        return {balance: balance};
    }

    static withdrawFromContractHandler = async (request: Request, h: ResponseToolkit) => {

        const withdrawRequest = WithdrawRequest.deserialize(request.payload);
        
        const success = await HarmonyOneController
                    .payItForward.withdrawFromContract(withdrawRequest);

        return {success: success};
    }

    static donateHandler = async (request: Request, h: ResponseToolkit) => {

        const amount = Number(request.query.amount);
        
        // only one donate currently, from alice to newlandfund
        const success = await HarmonyOneController
                .payItForward.donate(ALICE, NEWLANDFUND, amount);

        return {success: success};
    }

    static redeemPromiseHandler = async (request: Request, h: ResponseToolkit) => {

        const index = Number(request.query.index);
        
        // only one donate currently, from alice to newlandfund
        const success = await HarmonyOneController
                .payItForward.redeemPromise(ALICE, NEWLANDFUND, index);

        return {success: success};
    }
    
    static consumeHandler = async (request: Request, h: ResponseToolkit) => {

        const amount = Number(request.query.amount);
        
        // only one donate currently, from alice to newlandfund
        const success = await HarmonyOneController
                .payItForward.consume(ALICE, NEWLANDFUND, amount);

        return {success: success};
    }

    static consumeWithPromiseHandler = async (request: Request, h: ResponseToolkit) => {

        const amount = Number(request.query.amount);
        
        const future = FuturePromise.deserialize(request.payload);

        // only one donate currently, from alice to newlandfund
        const success = await HarmonyOneController
                .payItForward.consumeWithPromise(ALICE, NEWLANDFUND, amount, future);

        return {success: success};
    }   

    static getPromises = async (request: Request, h: ResponseToolkit) => {

        const accountName = String(request.query.account);
        
        const futures = await HarmonyOneController.payItForward.getFuturePromises(accountName);

        return PromiseListElement.deserializeArray(futures);
    }   

    //------------------------------------------------------------------------------
    static deployExample = async (request: Request, h: ResponseToolkit) => {

        const deployedAddress = await HarmonyOneController.example.deployExample();

        return {deployedAt: deployedAddress};
    }

    static count = async (request: Request, h: ResponseToolkit) => {

        const result = await HarmonyOneController.example.getCount();

        return { getResult: result};
    }

    static incrementCounter = async (request: Request, h: ResponseToolkit) => {

        const count = await HarmonyOneController.example.increment();

        return { count: count};
    }

    static jump = async (request: Request, h: ResponseToolkit) => {

        const count = await HarmonyOneController.example.jumpTo();

        return { count: count};
    }

    static owner = async (request: Request, h: ResponseToolkit) => {

        const owner = await HarmonyOneController.example.getOwner();

        return { owner: owner};
    }

    static setOwner = async (request: Request, h: ResponseToolkit) => {

        const owner = await HarmonyOneController.example.setOwner();

        return { owner: owner};
    }
    
    static sender = async (request: Request, h: ResponseToolkit) => {

        const sender = await HarmonyOneController.example.getSender();

        return { sender: sender};
    }
}