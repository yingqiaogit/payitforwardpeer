import { autoserialize, Deserialize, Serialize } from 'cerialize';
import { DemoAccount } from './demo-account';

export class AccountBalance {

    @autoserialize name: string;
    @autoserialize ownerAddress: string; 
    @autoserialize ownerBalance: string;
    @autoserialize contractAddress: string;
    @autoserialize contractBalance: string;
    @autoserialize contractOwner: string;
     
    constructor(account: DemoAccount) {
        this.name = account.name;
        this.ownerAddress = account.address;

        this.contractAddress = account.contractAddress || this.contractAddress;
        
    }

    serialize(): any {
        return Serialize(this);
    }

    static deserialize(json: any) : AccountBalance {
        return Deserialize(json, AccountBalance);
    }

    static deserializeArray(json: Array<any>): Array<AccountBalance> {
        return Deserialize(json, AccountBalance);
    }

    static serializeArray(array: Array<AccountBalance>): Array<any> {
        return Serialize(array, AccountBalance);
    }

}