import { Observable, of, forkJoin, Subject } from "rxjs";
import { switchMap, takeUntil, take, catchError } from "rxjs/operators";
import { IRef, IRefs } from "@djonnyx/tornado-types";
import { IDataService } from "./IDataService";

export class RefBuilder {
    protected unsubscribe$ = new Subject<void>();

    private _refsInfoDictionary: { [refName: string]: IRef } = {};

    private _refs: IRefs = {
        languages: null,
        translations: null,
        nodes: null,
        selectors: null,
        products: null,
        tags: null,
        assets: null,
        stores: null,
        terminals: null,
        businessPeriods: null,
        orderTypes: null,
        currencies: null,
        ads: null,
    };

    private _onChange = new Subject<IRefs>();
    public onChange = this._onChange.asObservable();

    constructor(private _service: IDataService) { }

    dispose(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.unsubscribe$ = null;

        if (this._onChange) {
            this._onChange.unsubscribe();
            this._onChange = null;
        }
    }

    get(): void {
        this._service.getRefs().pipe(
            take(1),
            takeUntil(this.unsubscribe$),
        ).subscribe(res => {
            this.checkForUpdateRefs(res);
        });
    }

    private normalizedRequestName(requestName: string): string {
        let result = "";
        const pattern = /([A-Z])/g;

        if (pattern.test(requestName)) {
            for (const char of requestName) {
                console.log(char)
                if (pattern.test(char)) {
                    result += `-${char.toLowerCase()}`;
                } else {
                    result += char;
                }
            }
        }

        return result;
    }

    private checkForUpdateRefs(refsInfo: Array<IRef>): void {
        if (!refsInfo) {
            this._onChange.next(null);
            return;
        }

        let sequenceList = new Array<Observable<boolean>>();

        refsInfo.forEach(refInfo => {
            if (/^(languages|nodes|products|selectors|tags|assets|stores|terminals|bisinessPeriods|orderTypes|currencies|ads)$/.test(refInfo.name)) {

                if (!this._refsInfoDictionary[refInfo.name] || this._refsInfoDictionary[refInfo.name].version !== refInfo.version) {
                    const res = this.updateRefByName(refInfo.name);
                    sequenceList.push(res);
                }
            }

            this._refsInfoDictionary[refInfo.name] = refInfo;
        });

        if (sequenceList.length === 0) {
            this._onChange.next(null);
            return;
        }

        forkJoin(sequenceList).subscribe(res => {
            let needRebuild = false;

            res.forEach(val => {
                if (val) {
                    needRebuild = true;
                }
            });

            if (needRebuild) {
                this._onChange.next(this._refs);
            }
        });
    }

    private updateRefByName(refName: string): Observable<boolean> {
        const req = this.fetchRefByName(refName);

        if (!req) {
            return of(false);
        }

        return req.pipe(
            catchError(err => {
                console.error(err);
                return of(false);
            }),
            switchMap(res => {
                if (res) {
                    this._refs[refName] = res;
                }

                return of(true);
            }),
        );
    }

    private fetchRefByName(refName: string): Observable<any> | null {
        switch (refName) {
            case "nodes":
                return this._service.getNodes();
            case "products":
                return this._service.getProducts();
            case "selectors":
                return this._service.getSelectors();
            case "tags":
                return this._service.getTags();
            case "assets":
                return this._service.getAssets();
            case "languages":
                return this._service.getLanguages();
            case "businessPeriods":
                return this._service.getBusinessPeriods();
            case "orderTypes":
                return this._service.getOrderTypes();
            case "currencies":
                return this._service.getCurrencies();
            case "translations":
                return this._service.getTranslations();
            case "ads":
                return this._service.getAds();
            case "stores":
                return this._service.getStores();
            case "terminals":
                return this._service.getTerminals();
        }

        return null;
    }
}