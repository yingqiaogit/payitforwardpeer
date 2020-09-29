import { DemoAccount } from "../model/demo-account";
import { ContractClient } from "./contract-client";

import { hexToNumber, Unit } from '@harmony-js/utils';
import { toChecksumAddress } from '@harmony-js/crypto';
import { FuturePromise } from "../model/future-promise";
import { PromiseListElement } from "../model/promise-list";

export class WalletContractClient extends ContractClient{

    public constructor(account: DemoAccount) {
        super(account);
    }

    // donate: move token from wallet contract to fund contract 

    // consume: move token from fund contract to wallet
    // next step: make promise
    // donate tokens from this contract to the "to" contract
    async donate(to: DemoAccount, amount: number): Promise<boolean> {

        const method = this.contractWriter.methods
                .donate(toChecksumAddress(this.account.address),
                        toChecksumAddress(to.contractAddress),
                        new Unit(amount).asOne().toWei());
    
        const gas: string = await method.estimateGas(this.options1)
        const options2 = {...this.options2, gasLimit: hexToNumber(gas)};
                  
        const response = await method.send(options2);
                        
        console.log(response.transaction.receipt);
                  
        return true;
    }

    async redeemPromise(to: DemoAccount, promiseIndex: number): Promise<boolean> {

        const method = this.contractWriter.methods
                .redeemPromise(toChecksumAddress(this.account.address),
                        toChecksumAddress(to.contractAddress),
                        promiseIndex);
    
        const gas: string = await method.estimateGas(this.options1)
        const options2 = {...this.options2, gasLimit: hexToNumber(gas)};
                  
        const response = await method.send(options2);
                        
        console.log(response.transaction.receipt);
                  
        return true;
    }

    async consume(provider: DemoAccount, amount: number): Promise<boolean> {

        const method = this.contractWriter.methods
                .consume(toChecksumAddress(provider.contractAddress),
                         toChecksumAddress(this.account.address),
                        new Unit(amount).asOne().toWei());
    
        const gas: string = await method.estimateGas(this.options1)
        const options2 = {...this.options2, gasLimit: hexToNumber(gas)};
                  
        const response = await method.send(options2);
                        
        console.log(response.transaction.receipt);
                  
        return true;
    }


    // consume with promise
    async consumeWithPromise(provider: DemoAccount, amount: number, future: FuturePromise): Promise<boolean> {

        const method = this.contractWriter.methods
                .consumeWithPromise(toChecksumAddress(provider.contractAddress),
                         toChecksumAddress(this.account.address),
                        new Unit(amount).asOne().toWei(),
                        `${future.name} amount = ${future.amount}`,
                        new Unit(future.amount).asOne().toWei());
    
        const gas: string = await method.estimateGas(this.options1)
        const options2 = {...this.options2, gasLimit: hexToNumber(gas)};
                  
        const response = await method.send(options2);
                        
        console.log(response.transaction.receipt);
                  
        return true;
    }

    async getFuturePromises(): Promise<Array<PromiseListElement>>{

      const method = this.contractReader.methods.getPromises();

      const gas = await method.estimateGas(this.options1);
      
      let options2 = {...this.options2, gasLimit: hexToNumber(gas)};
      
      const result = await method.call(options2);
    
      let index =0 ;
      const promiseList = (result as Array<string>)
        .map((promiseName: string) => new PromiseListElement(promiseName, index++))

      return promiseList;
    }

}