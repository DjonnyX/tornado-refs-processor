import { Observable, of, concat, Subject, BehaviorSubject } from "rxjs";
import { switchMap, takeUntil, take, catchError } from "rxjs/operators";
import { IRef, IRefs, RefTypes, AppTheme } from "@djonnyx/tornado-types";
import { IDataService } from "./IDataService";
import { WorkStatuses } from "./enums";

interface IProgress {
    total: number;
    current: number;
}

export interface IRefBuilderOptions<T = any> {
    refList: Array<RefTypes | string>;
    initialRefs?: IRefs<T>;
}

export class RefBuilder<T = AppTheme> {
    protected unsubscribe$ = new Subject<void>();

    private _refsInfoDictionary: { [refName: string]: IRef } = {};

    private _refs: IRefs<T> = {
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
        themes: null,
        systemTags: null,
    };

    private _onChange = new Subject<IRefs<T> | null>();
    public onChange = this._onChange.asObservable();

    private _onChangeStatus = new BehaviorSubject<WorkStatuses>(WorkStatuses.WORK);
    public onChangeStatus = this._onChangeStatus.asObservable();

    private _initialProgressState: IProgress = {
        total: this._options.refList.length,
        current: 0,
    }

    protected progressState: IProgress = {
        ...this._initialProgressState,
    }

    private _onProgress = new BehaviorSubject<IProgress>(this.progressState);
    public onProgress = this._onProgress.asObservable();

    constructor(private _service: IDataService, private _options: IRefBuilderOptions<T>) {
        if (!!_options.initialRefs) {
            for (const refName in _options.initialRefs) {
                this._refsInfoDictionary[refName] = _options.initialRefs[refName];
            }
            this._refs = _options.initialRefs;
        }
    }

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

        if (!!this._onChangeStatus) {
            this._onChangeStatus.unsubscribe();
            this._onChangeStatus = null;
        }

        if (!!this._onProgress) {
            this._onProgress.unsubscribe();
            this._onProgress = null;
        }

        this._refsInfoDictionary = null;
        this._refs = null;
    }

    private _refsInfo: Array<IRef>;

    get(): Observable<IRefs<T> | null> {
        try {
            this._service.getRefs().pipe(
                take(1),
                takeUntil(this.unsubscribe$),
            ).subscribe(
                res => {
                    this._refsInfo = res;
                    this._onChangeStatus.next(WorkStatuses.WORK);
                    this.checkForUpdateRefs(res);
                },
                err => {
                    this._onChangeStatus.next(WorkStatuses.ERROR);
                    this.checkForUpdateRefs(this._refsInfo);
                }
            );
        } catch (err) {
            console.error(err);
            this.checkForUpdateRefs(this._refsInfo);
        }

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
            if (this._options.refList.indexOf(refInfo.name) === -1) {
                return;
            }

            let refName: string;
            switch (refInfo.name) {
                case "business-periods":
                    refName = "businessPeriods";
                    break;
                case "order-types":
                    refName = "orderTypes";
                    break;
                case "system-tags":
                    refName = "systemTags";
                    break;
                default:
                    refName = refInfo.name;
            }

            if (/^(languages|translations|nodes|products|selectors|tags|assets|stores|terminals|businessPeriods|orderTypes|currencies|ads|themes|systemTags)$/.test(refName)) {
                if (!this._refsInfoDictionary[refName] || this._refsInfoDictionary[refName].version !== refInfo.version) {
                    const res = this.updateRefByName(refName);
                    sequenceList.push(res);
                }
            }

            this._refsInfoDictionary[refName] = refInfo;
        });

        if (sequenceList.length === 0) {
            this._onChange.next(null);
            return;
        }

        const refs = [];

        this.progressState = { ...this._initialProgressState };
        this._onProgress.next(this.progressState);

        concat(...sequenceList).subscribe(
            (needUpdate) => {
                this.progressState.current++;
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
                } else {
                    this._onChange.next(null);
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
                    return of(true);
                }

                return of(false);
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
            case "themes":
                return this._service.getThemes();
            case "systemTags":
                return this._service.getSystemTags();
        }

        return null;
    }
}