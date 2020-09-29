import { autoserialize, Deserialize, Serialize } from 'cerialize';

export class FuturePromise {

    @autoserialize name: string;
    @autoserialize amount: string; 
     
    serialize(): any {
        return Serialize(this);
    }

    static deserialize(json: any) : FuturePromise {
        return Deserialize(json, FuturePromise);
    }

    static deserializeArray(json: Array<any>): Array<FuturePromise> {
        return Deserialize(json, FuturePromise);
    }

    static serializeArray(array: Array<FuturePromise>): Array<any> {
        return Serialize(array, FuturePromise);
    }

}