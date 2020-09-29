import { autoserialize, Deserialize, deserialize, Serialize } from 'cerialize';

export class WithdrawRequest {
    
    // account name of transferring from
    @autoserialize account: string;
    @autoserialize amount: number;
    
    static deserialize(json: any) : WithdrawRequest {
        return Deserialize(json, WithdrawRequest);
    }

    static deserializeArray(json: Array<any>): Array<WithdrawRequest> {
        return Deserialize(json, WithdrawRequest);
    }

    static serializeArray(array: Array<WithdrawRequest>): Array<any> {
        return Serialize(array, WithdrawRequest);
    }
}