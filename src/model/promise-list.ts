import { autoserialize, Deserialize, Serialize } from 'cerialize';

export class PromiseListElement {

    @autoserialize name: string;
    @autoserialize index: number; 
    
    constructor(name: string, index: number) {
        this.name = name;
        this.index = index;
    }

    serialize(): any {
        return Serialize(this);
    }

    static deserialize(json: any) : PromiseListElement {
        return Deserialize(json, PromiseListElement);
    }

    static deserializeArray(json: Array<any>): Array<PromiseListElement> {
        return Deserialize(json, PromiseListElement);
    }

    static serializeArray(array: Array<PromiseListElement>): Array<any> {
        return Serialize(array, PromiseListElement);
    }

}