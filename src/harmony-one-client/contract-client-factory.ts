import { DemoAccount } from "../model/demo-account";
import { ContractClient } from "./contract-client";
import { FundContractClient } from "./Fund-contract-client";
import { WalletContractClient } from "./wallet-contract-client";

export class ContractClientFactory {

    static contractClient(account: DemoAccount) : ContractClient {

        return account.name === 'alice' ? 
                new WalletContractClient(account) : new FundContractClient(account);
    }
}