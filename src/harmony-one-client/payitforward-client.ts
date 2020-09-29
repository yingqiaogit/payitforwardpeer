import { Harmony } from '@harmony-js/core';
import { ChainID,
         ChainType,
         hexToNumber,
         numberToHex,
         fromWei,
         Units,
         Unit } from '@harmony-js/utils';
import { Account } from '@harmony-js/account';

import { Messenger, HttpProvider } from '@harmony-js/network';
import { toBech32 } from '@harmony-js/crypto';

import { config } from '../config/config';
import { DemoAccount } from '../model/demo-account';
import { AccountBalance as AccountInfo } from '../model/account-info';
import { TransferRequest } from '../model/transfer-request';

import { ContractClientFactory } from './contract-client-factory';
import { WithdrawRequest } from '../model/withdraw-request';
import { WalletContractClient } from './wallet-contract-client';
import { FuturePromise } from '../model/future-promise';
import { PromiseListElement } from '../model/promise-list';

export class PayItForwardClient {
    

    private hmyClient: Harmony;

    private demoAccounts: any;

    constructor() {
        
        this.hmyClient = new Harmony (
            config.network,
            {
                chainType: ChainType.Harmony,
                chainId: ChainID.HmyTestnet,
            },
        );

        const accounts: Array<DemoAccount> = DemoAccount.deserializeArray(config.accounts);

        this.demoAccounts = {};
        
        accounts.forEach((account: DemoAccount) => {

            account.hmyAccount = new Account(
                account.privateKey,
                new Messenger(
                    new HttpProvider(config.network),
                    ChainType.Harmony,
                    ChainID.HmyTestnet,
                ));

            if ( account.contractPath ) {

                // get a contractClient
                account.contractClient = ContractClientFactory.contractClient(account);
            }    

            this.demoAccounts[account.name] = account;        
        });
    }

    getAccounts(): Array<DemoAccount> {
        return Object.values(this.demoAccounts);
    }

    private getDemoAccount(name: string): DemoAccount {

        return this.demoAccounts[name] as DemoAccount;
    }

    async deployContract(accountName: string): Promise<string> {

        const demoAccount = this.getDemoAccount(accountName);
        
        const deployedAt = await demoAccount.contractClient.deployContract();

        await demoAccount.contractClient.setOwner();

        return deployedAt;
    }

    async getContractOwner(accountName:string): Promise<string> {

        const demoAccount = this.getDemoAccount(accountName);

        return demoAccount.contractClient.getOwner();
    }

    async setContractOwner(accountName:string): Promise<string> {

        const demoAccount = this.getDemoAccount(accountName);

        await demoAccount.contractClient.setOwner();

        return this.getContractOwner(accountName);
    }

    async getContractBalance(accountName:string): Promise<string> {

        const demoAccount = this.getDemoAccount(accountName);

        return demoAccount.contractClient.getBalance();
    }

    async peekAccount(accountName: string): Promise<AccountInfo> {

        const demoAccount = this.getDemoAccount(accountName);
        const accountInfo: AccountInfo = new AccountInfo(demoAccount);

        let response = await this.hmyClient.blockchain.getBalance({address: accountInfo.ownerAddress});

        accountInfo.ownerBalance = fromWei(hexToNumber(response.result), Units.one);

        if (accountInfo.contractAddress) {
            
            // response = await this.hmyClient.blockchain.getBalance({address: accountBalance.contractAddress});
            //accountBalance.contractBalance = fromWei(hexToNumber(response.result), Units.one);

            accountInfo.contractOwner = await demoAccount.contractClient.getOwner();

            accountInfo.contractBalance = await demoAccount.contractClient.getBalance();            
        }

        return accountInfo;
    }

    // transfer token from home to the address of an account or of a contract
    async transferFund(transferRequest: TransferRequest): Promise<Array<AccountInfo>> {

        const transferClient = new Harmony (
            config.network,
            {
                chainType: ChainType.Harmony,
                chainId: ChainID.HmyTestnet,
            },
        );

        const account: DemoAccount = this.demoAccounts[transferRequest.to] as DemoAccount;

        // transfer fund to account from testnet account contained in example
        
        transferClient.wallet.addByPrivateKey(
            (this.demoAccounts[transferRequest.from] as DemoAccount).privateKey
             || '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');
        
        const  address = transferRequest.type === "account" ? 
            account.address : toBech32(account.contractAddress);

        const txn = transferClient.transactions.newTx({
            to: address,                  
            value: new Unit(transferRequest.amount).asOne().toWei(),
            // gas limit, you can use string
            gasLimit: '50000',
            // send token from shardID
            shardID: 0,
            // send token to toShardID
            toShardID: 0,
            // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
            gasPrice: new Unit('1').asGwei().toWei(),
          });

        const signedTxn = await transferClient.wallet.signTransaction(txn);
        const txnHash = await transferClient.blockchain.sendTransaction(signedTxn);
        
        return Promise.all([this.peekAccount(transferRequest.from), this.peekAccount(transferRequest.to)]);
    }

    /**
     * 
     * @param accountName 
     * @param amount in One
     */
    async withdrawFromContract(request: WithdrawRequest): Promise<boolean> {

        const account = this.getDemoAccount(request.account);

        await account.contractClient.withdraw(request.amount);

        return true;
    }

    async donate(from: string, to: string, amount: number): Promise<boolean> {
        
        const fromAccount = this.getDemoAccount(from);

        const toAccount = this.getDemoAccount(to);

        await (fromAccount.contractClient as WalletContractClient).donate(toAccount, amount);                
        return true;
    }

    async consume(consumer: string, provider: string, amount: number): Promise<boolean> {
        
        const consumerAccount = this.getDemoAccount(consumer);

        const providerAccount = this.getDemoAccount(provider);

        await (consumerAccount.contractClient as WalletContractClient).consume(providerAccount, amount);                
        return true;
    }
    
    async consumeWithPromise(consumer: string, provider: string, amount: number, future: FuturePromise): Promise<boolean> {
        
        const consumerAccount = this.getDemoAccount(consumer);

        const providerAccount = this.getDemoAccount(provider);

        await (consumerAccount.contractClient as WalletContractClient)
                                .consumeWithPromise(providerAccount, amount, future);

        return true;
    }

    async redeemPromise(from: string, to: string, promiseIndex: number): Promise<boolean> {
        
        const redeemAccount = this.getDemoAccount(from);

        const transferToAccount = this.getDemoAccount(to);

        await (redeemAccount.contractClient as WalletContractClient)
                                .redeemPromise(transferToAccount, promiseIndex);

        return true;
    }

    
    async getFuturePromises(accountName: string): Promise<Array<PromiseListElement>> {

        const demoAccount = this.getDemoAccount(accountName);

        return (demoAccount.contractClient as WalletContractClient).getFuturePromises();        
    }
}
