import { autoserialize, Deserialize, deserialize, Serialize } from 'cerialize';

import { Account } from '@harmony-js/account';
import { ContractClient } from '../harmony-one-client/contract-client';

export class DemoAccount {

    @autoserialize name: string;
    @autoserialize address: string;
    @deserialize privateKey: string;
    @autoserialize contractPath: string;
    @autoserialize contractAddress: string;
    
    hmyAccount: Account;
    contractClient: ContractClient;

    static deserialize(json: any) : DemoAccount {
        return Deserialize(json, DemoAccount);
    }

    static deserializeArray(json: Array<any>): Array<DemoAccount> {
        return Deserialize(json, DemoAccount);
    }

    static serializeArray(array: Array<DemoAccount>): Array<any> {
        return Serialize(array, DemoAccount);
    }
}