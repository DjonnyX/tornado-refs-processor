import { Observable, of, forkJoin, Subject } from "rxjs";
import { switchMap, takeUntil, take, catchError } from "rxjs/operators";
import { IRef, IRefs } from "@djonnyx/tornado-types";
import { IDataService } from "./IDataService";

export class RefBuilder {
    protected unsubscribe$ = new Subject<void>();

    private _refsInfoDictionary: { [refName: string]: IRef } = {};

    private _refs: IRefs = {
        nodes: null,
        selectors: null,
        products: null,
        tags: null,
        assets: null,
    };

    private _onChange = new Subject<IRefs>();
    public onChange = this._onChange.asObservable();

    constructor(private _service: IDataService) {}

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

    private checkForUpdateRefs(refsInfo: Array<IRef>): void {
        if (!refsInfo) {
            this._onChange.next(null);
            return;
        }

        let sequenceList = new Array<Observable<boolean>>();

        refsInfo.forEach(refInfo => {
            if (/^(nodes|products|selectors|tags|assets)$/.test(refInfo.name)) {

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
        }

        return null;
    }
}