import { Observable, of, concat, Subject, BehaviorSubject } from "rxjs";
import { switchMap, takeUntil, take, catchError, map } from "rxjs/operators";
import { IRef, IRefs } from "@djonnyx/tornado-types";
import { IDataService } from "./IDataService";

interface IProgress {
    total: number;
    current: number;
}

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

    private _onChange = new Subject<IRefs | null>();
    public onChange = this._onChange.asObservable();

    private _initialProgressState: IProgress = {
        total: 13,
        current: 0,
    }

    protected progressState: IProgress = {
        ...this._initialProgressState,
    }

    private _onProgress = new BehaviorSubject<IProgress>(this.progressState);
    public onProgress = this._onProgress.asObservable();

    constructor(private _service: IDataService) { }

    dispose(): void {
        if (!!this.unsubscribe$) {
            this.unsubscribe$.next();
            this.unsubscribe$.complete();
            this.unsubscribe$ = null;
        }

        if (!!this._onChange) {
            this._onChange.unsubscribe();
            this._onChange = null;
        }

        if (!!this._onProgress) {
            this._onProgress.unsubscribe();
            this._onProgress = null;
        }

        this._refsInfoDictionary = null;
        this._refs = null;
    }

    get(): Observable<IRefs | null> {
        this._service.getRefs().pipe(
            take(1),
            takeUntil(this.unsubscribe$),
        ).subscribe(res => {
            this.checkForUpdateRefs(res);
        });

        return this.onChange;
    }

    private normalizedRequestName(requestName: string): string {
        let result = "";
        const pattern = /([A-Z])/g;

        if (pattern.test(requestName)) {
            for (const char of requestName) {
                if (pattern.test(char)) {
                    result += `-${char.toLowerCase()}`;
                } else {
                    result += char;
                }
            }
        }

        return result;
    }

    private checkForUpdateRefs(refsInfo: Array<IRef> | null): void {
        if (!refsInfo) {
            this._onChange.next(null);
            return;
        }

        let sequenceList = new Array<Observable<any>>();

        refsInfo.forEach(refInfo => {
            let refName: string;
            switch (refInfo.name) {
                case "business-periods":
                    refName = "businessPeriods";
                    break;
                case "order-types":
                    refName = "orderTypes";
                    break;
                default:
                    refName = refInfo.name;
            }

            if (/^(languages|translations|nodes|products|selectors|tags|assets|stores|terminals|businessPeriods|orderTypes|currencies|ads)$/.test(refName)) {
                if (!this._refsInfoDictionary[refName] || this._refsInfoDictionary[refName].version !== refInfo.version) {
                    const res = this.updateRefByName(refName);
                    sequenceList.push(res);
                }
            }

            this._refsInfoDictionary[refName] = refInfo;
        });

        if (sequenceList.length === 0) {
            this._onChange.next(this._refs);
            return;
        }

        const refs = [];

        this.progressState = {...this._initialProgressState};
        this._onProgress.next(this.progressState);

        concat(...sequenceList).subscribe(
            (needUpdate) => {
                this.progressState.current ++;
                this._onProgress.next(this.progressState);
                refs.push(needUpdate);
            },
            (err) => {
                console.error(`Download ref error. ${err}`);
            },
            () => {
                let needRebuild = false;

                refs.forEach(val => {
                    if (val) {
                        needRebuild = true;
                    }
                });

                if (needRebuild) {
                    this._onChange.next(this._refs);
                }
            }
        );
    }

    private updateRefByName(refName: string): Observable<boolean> {
        const req = this.fetchRefByName(refName);

        if (!req) {
            return of(false);
        }

        return req.pipe(
            takeUntil(this.unsubscribe$),
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