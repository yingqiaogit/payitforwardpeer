import { autoserialize, Deserialize, deserialize, Serialize } from 'cerialize';

export class TransferRequest {
    
    // account name of transferring from
    @autoserialize from: string;
    // account name of transferring to
    @autoserialize to: string;
    // the amount for transferring
    @autoserialize amount: number;
    @autoserialize type: string;
    
    static deserialize(json: any) : TransferRequest {
        return Deserialize(json, TransferRequest);
    }

    static deserializeArray(json: Array<any>): Array<TransferRequest> {
        return Deserialize(json, TransferRequest);
    }

    static serializeArray(array: Array<TransferRequest>): Array<any> {
        return Serialize(array, TransferRequest);
    }
}