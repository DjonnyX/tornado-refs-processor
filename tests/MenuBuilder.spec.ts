import { expect } from 'chai';
import * as fs from "fs";
import { of, interval, Subject } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { IAsset, ICompiledMenu, RefTypes } from '@djonnyx/tornado-types';
import { TestDataSimpleMenuService } from "./TestDataSimpleMenuService";
import { TestDataModifiersService } from './TestDataModifiersService';
import { TestDataMenuInstancesService } from './TestDataMenuInstancesService';
import { DataCombiner, IProgress } from "../src/DataCombiner";
import { clearParentNodes } from './utils';
import { MAIN_MENU_REF } from './references/MainMenuRef';
import { MODIFIERS_MENU_REF } from './references/ModifiersMenuRef';
import { INSTANCES_MENU_REF } from './references/InstancesMenuRef';

describe('DataCombiner', () => {
    it('should return valid the instances menu', async () => {
        const resourcesCount = 5;

        const menu = await new Promise<ICompiledMenu>((resolve, reject) => {
            const service = new TestDataMenuInstancesService();
            const progress: IProgress = {
                total: resourcesCount,
                current: 0,
            };

            const dataCombiner = new DataCombiner({
                assetsTransformer: (assets: Array<IAsset>) => {
                    return {
                        onComplete: interval(10).pipe(
                            take(1),
                            switchMap(() => {
                                return of(assets);
                            }),
                        ),
                        onProgress: interval(10).pipe(
                            take(resourcesCount),
                            switchMap(() => {
                                progress.current++;
                                return of(progress);
                            }),
                        ),
                    };
                },
                dataService: service,
                updateTimeout: 100,
            });

            dataCombiner.onChange.subscribe(
                data => {

                    // Нужно очистить parent's, иначе при выполнении JSON.stringify сгенерируется ошибка о циклических зависимостях
                    clearParentNodes(data.menu);

                    fs.writeFileSync("output/menuInstances_combinedData.json", JSON.stringify(data));
                    fs.writeFileSync("output/menuInstances_compiledMenu.json", JSON.stringify(data.menu));
                    fs.writeFileSync("output/menuInstances_compiledMenuReference.json", JSON.stringify(INSTANCES_MENU_REF));

                    resolve(data.menu);

                    dataCombiner.dispose();
                },
                err => {
                    reject(err);
                }
            );

            dataCombiner.onProgress.subscribe(progress => {
                console.log(progress);
            });

            dataCombiner.init("1", {
                refList: [
                    RefTypes.LANGUAGES,
                    RefTypes.TRANSLATIONS,
                    RefTypes.NODES,
                    RefTypes.SELECTORS,
                    RefTypes.PRODUCTS,
                    RefTypes.TAGS,
                    RefTypes.ASSETS,
                    RefTypes.STORES,
                    RefTypes.TERMINALS,
                    RefTypes.BUSINESS_PERIODS,
                    RefTypes.ORDER_TYPES,
                    RefTypes.CURRENCIES,
                    RefTypes.ADS,
                    RefTypes.THEMES,
                    RefTypes.SYSTEM_TAGS,
                    RefTypes.WEIGHT_UNITS,
                ]
            });
        });

        expect(JSON.stringify(menu)).to.equal(JSON.stringify(INSTANCES_MENU_REF));
    });

    it('should return valid the modifiers menu', async () => {
        const resourcesCount = 5;

        const menu = await new Promise<ICompiledMenu>((resolve, reject) => {
            const service = new TestDataModifiersService();
            const progress: IProgress = {
                total: resourcesCount,
                current: 0,
            };

            const dataCombiner = new DataCombiner({
                assetsTransformer: (assets: Array<IAsset>) => {
                    return {
                        onComplete: interval(10).pipe(
                            take(1),
                            switchMap(() => {
                                return of(assets);
                            }),
                        ),
                        onProgress: interval(10).pipe(
                            take(resourcesCount),
                            switchMap(() => {
                                progress.current++;
                                return of(progress);
                            }),
                        ),
                    };
                },
                dataService: service,
                updateTimeout: 100,
            });

            dataCombiner.onChange.subscribe(
                data => {

                    // Нужно очистить parent's, иначе при выполнении JSON.stringify сгенерируется ошибка о циклических зависимостях
                    clearParentNodes(data.menu);

                    fs.writeFileSync("output/modiMenu_combinedData.json", JSON.stringify(data));
                    fs.writeFileSync("output/modiMenu_compiledMenu.json", JSON.stringify(data.menu));
                    fs.writeFileSync("output/modiMenu_compiledMenuReference.json", JSON.stringify(MODIFIERS_MENU_REF));

                    resolve(data.menu);

                    dataCombiner.dispose();
                },
                err => {
                    reject(err);
                }
            );

            dataCombiner.onProgress.subscribe(progress => {
                console.log(progress);
            });

            dataCombiner.init("1", {
                refList: [
                    RefTypes.LANGUAGES,
                    RefTypes.TRANSLATIONS,
                    RefTypes.NODES,
                    RefTypes.SELECTORS,
                    RefTypes.PRODUCTS,
                    RefTypes.TAGS,
                    RefTypes.ASSETS,
                    RefTypes.STORES,
                    RefTypes.TERMINALS,
                    RefTypes.BUSINESS_PERIODS,
                    RefTypes.ORDER_TYPES,
                    RefTypes.CURRENCIES,
                    RefTypes.ADS,
                    RefTypes.THEMES,
                    RefTypes.SYSTEM_TAGS,
                    RefTypes.WEIGHT_UNITS,
                ]
            });
        });

        expect(JSON.stringify(menu)).to.equal(JSON.stringify(MODIFIERS_MENU_REF));
    });

    it('should return valid the main menu', async () => {
        const resourcesCount = 5;

        const menu = await new Promise<ICompiledMenu>((resolve, reject) => {
            const service = new TestDataSimpleMenuService();
            const progress: IProgress = {
                total: resourcesCount,
                current: 0,
            };

            const dataCombiner = new DataCombiner({
                assetsTransformer: (assets: Array<IAsset>) => {
                    return {
                        onComplete: interval(10).pipe(
                            take(1),
                            switchMap(() => {
                                return of(assets);
                            }),
                        ),
                        onProgress: interval(10).pipe(
                            take(resourcesCount),
                            switchMap(() => {
                                progress.current++;
                                return of(progress);
                            }),
                        ),
                    };
                },
                dataService: service,
                updateTimeout: 100,
            });

            dataCombiner.onChange.subscribe(
                data => {

                    // Нужно очистить parent's, иначе при выполнении JSON.stringify сгенерируется ошибка о циклических зависимостях
                    clearParentNodes(data.menu);

                    fs.writeFileSync("output/mainMenu_combinedData.json", JSON.stringify(data));
                    fs.writeFileSync("output/mainMenu_compiledMenu.json", JSON.stringify(data.menu));
                    fs.writeFileSync("output/mainMenu_compiledMenuReference.json", JSON.stringify(MAIN_MENU_REF));

                    resolve(data.menu);

                    dataCombiner.dispose();
                },
                err => {
                    reject(err);
                }
            );

            dataCombiner.onProgress.subscribe(progress => {
                console.log(progress);
            });

            dataCombiner.init("1", {
                refList: [
                    RefTypes.LANGUAGES,
                    RefTypes.TRANSLATIONS,
                    RefTypes.NODES,
                    RefTypes.SELECTORS,
                    RefTypes.PRODUCTS,
                    RefTypes.TAGS,
                    RefTypes.ASSETS,
                    RefTypes.STORES,
                    RefTypes.TERMINALS,
                    RefTypes.BUSINESS_PERIODS,
                    RefTypes.ORDER_TYPES,
                    RefTypes.CURRENCIES,
                    RefTypes.ADS,
                    RefTypes.THEMES,
                    RefTypes.SYSTEM_TAGS,
                    RefTypes.WEIGHT_UNITS,
                ]
            });
        });

        expect(JSON.stringify(menu)).to.equal(JSON.stringify(MAIN_MENU_REF));
    });

    it('should update menu', async () => {
        const resourcesCount = 3;

        const ACTUAL_UPDATE_COUNT = 2;
        let updateCount = 0;

        const menu = await new Promise((resolve, reject) => {
            const service = new TestDataSimpleMenuService();
            const progress: IProgress = {
                total: resourcesCount,
                current: 0,
            };

            const dataCombiner = new DataCombiner({
                assetsTransformer: (assets: Array<IAsset>) => {
                    return {
                        onComplete: interval(10).pipe(
                            take(1),
                            switchMap(() => {
                                return of(assets);
                            }),
                        ),
                        onProgress: interval(10).pipe(
                            take(resourcesCount),
                            switchMap(() => {
                                progress.current++;
                                return of(progress);
                            }),
                        ),
                    };
                },
                dataService: service,
                updateTimeout: 100,
            });

            dataCombiner.onChange.subscribe(
                data => {
                    updateCount++;
                    console.info(`pass: ${updateCount}`);

                    if (updateCount === 2) {
                        resolve(data?.refs);

                        dataCombiner.dispose();
                    }
                },
                err => {
                    reject(err);
                }
            );

            dataCombiner.onProgress.subscribe(progress => {
                console.log(progress);
            });

            dataCombiner.init("1", {
                refList: [
                    RefTypes.LANGUAGES,
                    RefTypes.TRANSLATIONS,
                    RefTypes.NODES,
                    RefTypes.SELECTORS,
                    RefTypes.PRODUCTS,
                    RefTypes.TAGS,
                    RefTypes.ASSETS,
                    RefTypes.STORES,
                    RefTypes.TERMINALS,
                    RefTypes.BUSINESS_PERIODS,
                    RefTypes.ORDER_TYPES,
                    RefTypes.CURRENCIES,
                    RefTypes.ADS,
                    RefTypes.THEMES,
                    RefTypes.SYSTEM_TAGS,
                    RefTypes.WEIGHT_UNITS,
                ]
            });
        });

        expect(updateCount).to.equal(ACTUAL_UPDATE_COUNT);
    });

    it('combinedData after second update must equal "null"', async () => {
        const unsubscribe$ = new Subject<void>();

        const resourcesCount = 3;

        const ACTUAL_UPDATE_COUNT = 2;
        let updateCount = 0;

        const menu = await new Promise((resolve, reject) => {
            const service = new TestDataSimpleMenuService();
            const progress: IProgress = {
                total: resourcesCount,
                current: 0,
            };

            const dataCombiner = new DataCombiner({
                assetsTransformer: (assets: Array<IAsset>) => {
                    return {
                        onComplete: interval(10).pipe(
                            take(1),
                            switchMap(() => {
                                return of(assets);
                            }),
                        ),
                        onProgress: interval(10).pipe(
                            take(resourcesCount),
                            switchMap(() => {
                                progress.current++;
                                return of(progress);
                            }),
                        ),
                    };
                },
                dataService: service,
                updateTimeout: 100,
            });

            dataCombiner.onChange.subscribe(
                data => {
                    updateCount++;
                    console.info(`pass: ${updateCount}`);

                    if (updateCount === 2) {
                        resolve(data);

                        dataCombiner.dispose();
                    }
                },
                err => {
                    reject(err);
                }
            );

            dataCombiner.onProgress.subscribe(progress => {
                console.log(progress);
            });

            dataCombiner.init("1", {
                refList: [
                    RefTypes.LANGUAGES,
                    RefTypes.TRANSLATIONS,
                    RefTypes.NODES,
                    RefTypes.SELECTORS,
                    RefTypes.PRODUCTS,
                    RefTypes.TAGS,
                    RefTypes.ASSETS,
                    RefTypes.STORES,
                    RefTypes.TERMINALS,
                    RefTypes.BUSINESS_PERIODS,
                    RefTypes.ORDER_TYPES,
                    RefTypes.CURRENCIES,
                    RefTypes.ADS,
                    RefTypes.THEMES,
                    RefTypes.SYSTEM_TAGS,
                    RefTypes.WEIGHT_UNITS,
                ]
            });
        });

        expect(menu).to.equal(null);
    });
});
