import { Observable } from "rxjs";
import { IRef, INode, ISelector, IProduct, ITag, IAsset } from "@djonnyx/tornado-types";

export interface IDataService {
    getRefs(): Observable<Array<IRef>>;

    getNodes(): Observable<Array<INode>>;

    getSelectors(): Observable<Array<ISelector>>;

    getProducts(): Observable<Array<IProduct>>;

    getTags(): Observable<Array<ITag>>;

    getAssets(): Observable<Array<IAsset>>;
}