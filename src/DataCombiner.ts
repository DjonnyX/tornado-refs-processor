import { switchMap, map, takeUntil } from "rxjs/operators";
import { of, Subject, Observable, BehaviorSubject } from "rxjs";
import { ICompiledData, IAsset, AdTypes, SelectorTypes, IRefs } from "@djonnyx/tornado-types";
import { IRefBuilderOptions, RefBuilder } from "./RefBuilder";
import { MenuBuilder } from "./MenuBuilder";
import { IDataService } from "./IDataService";
import { WorkStatuses } from "./enums";

export interface IDataCombinerOptions {
    assetsTransformer: (assets: Array<IAsset>) => {
        onComplete: Observable<Array<IAsset>>;
        onProgress: Observable<IProgress>;
    }
    dataService: IDataService;
    updateTimeout: number;
}

export interface IProgress {
    total: number;
    current: number;
}

export class DataCombiner {
    private _onChange = new Subject<ICompiledData>();
    readonly onChange = this._onChange.asObservable();

    private _onChangeStatus = new BehaviorSubject<WorkStatuses>(WorkStatuses.WORK);
    readonly onChangeStatus = this._onChangeStatus.asObservable();

    private _onProgress = new Subject<IProgress>();
    readonly onProgress = this._onProgress.asObservable();

    private _refBuilder: RefBuilder;
    private _menuBuilder: MenuBuilder;

    private _unsubscribe$ = new Subject<void>();

    private _delayer: any;

    constructor(private options: IDataCombinerOptions) { }

    init(storeId: string, options: IRefBuilderOptions): void {
        this._refBuilder = new RefBuilder(this.options.dataService, options);
        this._menuBuilder = new MenuBuilder();

        this._refBuilder.onChangeStatus.pipe(
            takeUntil(this._unsubscribe$),
        ).subscribe(
            status => {
                this._onChangeStatus.next(status);
            }
        );

        this._refBuilder.onChange.pipe(
            takeUntil(this._unsubscribe$),
            switchMap(refs => {
                if (!!refs) {
                    const assetsTransformerResult = this.options.assetsTransformer(refs.assets);
                    assetsTransformerResult.onProgress.pipe(
                        takeUntil(this._unsubscribe$),
                    ).subscribe(progress => {
                        this._onProgress.next(progress);
                    });

                    return assetsTransformerResult.onComplete.pipe(
                        map(assets => {
                            if (assets) {
                                refs.assets = assets;
                            }
                            return refs;
                        }),
                    )
                } else {
                    return of(refs);
                }
            }),
        ).subscribe(
            refs => {
                this._onChangeStatus.next(WorkStatuses.BUILD_WORK);

                if (!!refs) {
                    this._menuBuilder.build(storeId, refs);
                    this._onChange.next({
                        refs: {
                            __raw: refs,
                            orderTypes: this._menuBuilder.compiledOrderTypes,
                            languages: this._menuBuilder.compiledLanguages,
                            defaultLanguage: this._menuBuilder.compiledDefaultLanguage,
                            defaultCurrency: this._menuBuilder.compiledDefaultCurrency,
                            defaultOrderType: this._menuBuilder.compiledDefaultOrderType,
                            tags: this._menuBuilder.compiledTags,
                            ads: {
                                intros: this._menuBuilder.compiledAds.filter(v => v.type === AdTypes.INTRO),
                                banners: this._menuBuilder.compiledAds.filter(v => v.type === AdTypes.BANNER),
                                serviceUnavailableIntros: this._menuBuilder.compiledAds.filter(v => v.type === AdTypes.SERVICE_UNAVAILABLE),
                            },
                            selectors: {
                                menu: this._menuBuilder.compiledSelectors.filter(v => v.type === SelectorTypes.MENU_CATEGORY),
                                schema: this._menuBuilder.compiledSelectors.filter(v => v.type === SelectorTypes.SCHEMA_CATEGORY),
                            },
                            products: this._menuBuilder.compiledProducts,
                            themes: refs.themes,
                        },
                        menu: this._menuBuilder.menu,
                    });
                } else {
                    this._onChange.next(null);
                }

                this.getRefsDelayed();
            }, err => {
                console.error(err);
                this._onChangeStatus.next(WorkStatuses.BUILD_ERROR);
                this.getRefsDelayed();
            }
        );

        this._refBuilder.onProgress.pipe(
            takeUntil(this._unsubscribe$),
        ).subscribe(progress => {
            this._onProgress.next(progress);
        })

        this._refBuilder.get();
    }

    private getRefsDelayed(): void {
        clearTimeout(this._delayer);
        this._delayer = setTimeout(() => {
            if (!!this._refBuilder) {
                this._refBuilder.get();
            }
        }, this.options.updateTimeout);
    }

    dispose(): void {
        clearTimeout(this._delayer);

        if (!!this._unsubscribe$) {
            this._unsubscribe$.next();
            this._unsubscribe$.complete();
            this._unsubscribe$ = null;
        }

        if (!!this._refBuilder) {
            this._refBuilder.dispose();
            this._refBuilder = null;
        }

        if (!!this._menuBuilder) {
            this._menuBuilder.dispose();
            this._menuBuilder = null;
        }

        if (!!this._onChangeStatus) {
            this._onChangeStatus.unsubscribe();
            this._onChangeStatus = null;
        }

        if (!!this._onChange) {
            this._onChange.unsubscribe();
            this._onChange = null;
        }

        if (!!this._onProgress) {
            this._onProgress.unsubscribe();
            this._onProgress = null;
        }
    }
}
