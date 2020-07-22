import { switchMap, map } from "rxjs/operators";
import { of, Subject, Observable } from "rxjs";
import { ICombinedData, IAsset } from "@djonnyx/tornado-types";
import { RefBuilder } from "./RefBuilder";
import { MenuBuilder } from "./MenuBuilder";
import { IDataService } from "./IDataService";

export interface IDataCombinerOptions {
    assetsTransformer: (assets: Array<IAsset>) => Observable<Array<IAsset>>;
    dataService: IDataService;
    updateTimeout: number;
}

export class DataCombiner {

    private static _current: DataCombiner;

    private _onChange = new Subject<ICombinedData>();
    readonly onChange = this._onChange.asObservable();

    private _refBuilder: RefBuilder;
    private _menuBuilder: MenuBuilder;

    constructor(private options: IDataCombinerOptions) {
        if (!!DataCombiner._current) {
            throw Error("DataCombiner must have only one instance.");
        }

        DataCombiner._current = this;
    }

    init(): void {
        this._refBuilder = new RefBuilder(this.options.dataService);
        this._menuBuilder = new MenuBuilder();

        this._refBuilder.get();
        this._refBuilder.onChange.pipe(
            switchMap(refs => !!refs ? this.options.assetsTransformer(refs.assets).pipe(
                        map(assets => {
                            if (assets) {
                                refs.assets = assets;
                            }
                            return refs;
                        }),
                    ) :
                    of(null),
            ),
        ).subscribe(
            refs => {
                if (!!refs) {
                    this._menuBuilder.build(refs);
                    this._onChange.next({
                        refs,
                        menu: this._menuBuilder.menu,
                    });
                }

                this.getRefsDelayed();
            }, err => {
                console.error(err);
                this.getRefsDelayed();
            }
        );
    }

    private getRefsDelayed(): void {
        setTimeout(() => { this._refBuilder.get(); }, this.options.updateTimeout);
    }
}
