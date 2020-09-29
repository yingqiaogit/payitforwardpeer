
import { config } from "../config/config";
import { DemoAccount } from "../model/demo-account";

import * as path from 'path';

import { ChainID,
         ChainType,
         hexToNumber,
         fromWei,
         Units,
         Unit } from '@harmony-js/utils';
import { Wallet } from '@harmony-js/account';
import { ContractFactory, Contract } from '@harmony-js/contract';
import { Messenger, HttpProvider } from '@harmony-js/network';
import { BN, toBech32, toChecksumAddress } from '@harmony-js/crypto';

// the purpose of this client is to test deloying contact and 
// calling its methods
export abstract class ContractClient{

    protected account: DemoAccount;  
    
    protected contractWriter: Contract; 
    protected contractReader: Contract;
    
    private contractJson: any;

    constructor(account: DemoAccount) {

      this.account = account;
      this.contractJson = require(path.resolve(this.account.contractPath));

      if (this.account.contractAddress) {

        this.setContract(this.account.contractAddress);
      }

    }

    private setContract(contractAddr?: string) {
      this.contractReader = this.getContract(this.account.contractAddress);
      this.contractWriter = this.getContract(this.account.contractAddress);
      this.contractWriter.wallet.addByPrivateKey(this.account.privateKey);
    }

    private getContract(contractAddr?: string): Contract{
    
        const wallet = new Wallet(
          new Messenger(
            new HttpProvider(config.network),
            ChainType.Harmony,
            ChainID.HmyTestnet,
          ),
        );
    
        const factory = new ContractFactory(wallet);
      
        return contractAddr? factory.createContract(this.contractJson.abi, contractAddr) : 
          factory.createContract(this.contractJson.abi);
    }
    
    // deploy the counter contract
    async deployContract(): Promise<string> {

        const contract = this.getContract();

        const options3 = { data: this.contractJson.bytecode }; // contractConstructor needs contract bytecode to deploy
          
        contract.wallet.addByPrivateKey(this.account.privateKey);
                  
        let gas: string = await contract.methods.contractConstructor(options3).estimateGas(this.options1);
        let options2 = {...this.options2, gasLimit: hexToNumber(gas)};

        let response = await contract.methods.contractConstructor(options3).send(options2)

        console.log(response.transaction.receipt);

        const contractAddr = response.transaction.receipt.contractAddress;        

        this.setContract(contractAddr);

        return `${contractAddr} ${toBech32(contractAddr)}`;
    }

    // get balance
    async getBalance(): Promise<string> {

      const method = this.contractReader.methods.getBalance();

      const gas = await method.estimateGas(this.options1);
      
      let options2 = {...this.options2, gasLimit: hexToNumber(gas)};
      
      const balance = await method.call(options2);

      return fromWei(balance, Units.one)
   }

   // get owner
   async getOwner(): Promise<string> {

    const method = this.contractReader.methods.getOwner();

    const gas = await method.estimateGas(this.options1);

    let options2 = {...this.options2, gasLimit: hexToNumber(gas) };

    const result = await method.call(options2);

    return `${result} ${toBech32(result)}`;
  }

  // set owner
  async setOwner(): Promise<void> {
       
    const method = this.contractWriter.methods.setOwner(toChecksumAddress(this.account.address));

    const gas = await method.estimateGas(this.options1);

    let options2 = {...this.options2, gasLimit: hexToNumber(gas)};

    const response = await method.send(options2);

    console.log(response.transaction.receipt);    
  } 

  // withdraw One token from contract to owner's account
  async withdraw(amount: number): Promise<boolean> {

      const method = this.contractWriter.methods
                .withdraw(toChecksumAddress(this.account.address),
                          new Unit(amount).asOne().toWei());

      const gas: string = await method.estimateGas(this.options1)
      const options2 = {...this.options2, gasLimit: hexToNumber(gas)};

      const response = await method.send(options2);
      
      console.log(response.transaction.receipt);

      return true;
  }

  
  protected get options1(): { gasPrice:string} {
    return  { gasPrice: '0x3B9ACA00' }; 
  }

  protected get options2(): { gasPrice:string, gasLimit: string} {
    return  { gasPrice: '1000000000', gasLimit: '10000000'};
  }
}

