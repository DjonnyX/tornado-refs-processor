import { switchMap, map, takeUntil } from "rxjs/operators";
import { of, Subject, Observable } from "rxjs";
import { ICompiledData, IAsset, AdTypes, SelectorTypes } from "@djonnyx/tornado-types";
import { RefBuilder } from "./RefBuilder";
import { MenuBuilder } from "./MenuBuilder";
import { IDataService } from "./IDataService";

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

    private static _current: DataCombiner;

    private _onChange = new Subject<ICompiledData>();
    readonly onChange = this._onChange.asObservable();

    private _onProgress = new Subject<IProgress>();
    readonly onProgress = this._onProgress.asObservable();

    private _refBuilder: RefBuilder;
    private _menuBuilder: MenuBuilder;

    private _unsubscribe$ = new Subject<void>();

    private _delayer: any;

    constructor(private options: IDataCombinerOptions) {
        if (!!DataCombiner._current) {
            throw Error("DataCombiner must have only one instance.");
        }

        DataCombiner._current = this;
    }

    init(): void {
        this._refBuilder = new RefBuilder(this.options.dataService);
        this._menuBuilder = new MenuBuilder();

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
                    of(null)
                }
            }
            ),
        ).subscribe(
            refs => {
                if (!!refs) {
                    this._menuBuilder.build(refs);
                    this._onChange.next({
                        refs: {
                            __raw: refs,
                            orderTypes: this._menuBuilder.compiledOrderTypes,
                            languages: this._menuBuilder.compiledLanguages,
                            defaultLanguage: this._menuBuilder.compiledDefaultLanguage,
                            tags: this._menuBuilder.compiledTags,
                            ads: {
                                intros: this._menuBuilder.compiledAds.filter(v => v.type === AdTypes.INTRO),
                                banners: this._menuBuilder.compiledAds.filter(v => v.type === AdTypes.BANNER),
                            },
                            selectors: {
                                menu: this._menuBuilder.compiledSelectors.filter(v => v.type === SelectorTypes.MENU_CATEGORY),
                                schema: this._menuBuilder.compiledSelectors.filter(v => v.type === SelectorTypes.SCHEMA_CATEGORY),
                            },
                            products: this._menuBuilder.compiledProducts,
                        },
                        menu: this._menuBuilder.menu,
                    });
                }

                this.getRefsDelayed();
            }, err => {
                console.error(err);
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
        this._delayer = setTimeout(() => { this._refBuilder.get(); }, this.options.updateTimeout);
    }

    dispose(): void {
        if (!this._refBuilder) {
            this._refBuilder.dispose();
            this._refBuilder = null;
        }

        if (!this._menuBuilder) {
            this._menuBuilder.dispose();
            this._menuBuilder = null;
        }

        if (!!this._unsubscribe$) {
            this._unsubscribe$.next();
            this._unsubscribe$.complete();
            this._unsubscribe$ = null;
        }

        clearTimeout(this._delayer);

        DataCombiner._current = null;
    }
}
