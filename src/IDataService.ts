import { Observable } from "rxjs";
import {
    IRef, INode, ISelector, IProduct, ITag, IAsset, ILanguage, ITerminal, IStore, IAd,
    ITranslation, ICurrency, IOrderType, IBusinessPeriod, AppTheme
} from "@djonnyx/tornado-types";

export interface IDataService<T = any> {
    getRefs(): Observable<Array<IRef>>;

    getNodes(): Observable<Array<INode>>;

    getSelectors(): Observable<Array<ISelector>>;

    getProducts(): Observable<Array<IProduct>>;

    getTags(): Observable<Array<ITag>>;

    getAssets(): Observable<Array<IAsset>>;

    getLanguages(): Observable<Array<ILanguage>>;

    getTranslations(): Observable<Array<ITranslation>>;

    getBusinessPeriods(): Observable<Array<IBusinessPeriod>>;

    getOrderTypes(): Observable<Array<IOrderType>>;

    getCurrencies(): Observable<Array<ICurrency>>;

    getAds(): Observable<Array<IAd>>;

    getStores(): Observable<Array<IStore>>;

    getTerminals(): Observable<Array<ITerminal>>;

    getThemes(): Observable<Array<T>>;
}