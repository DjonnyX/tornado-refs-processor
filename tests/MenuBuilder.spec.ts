import { expect } from 'chai';
import * as fs from "fs";
import { of, interval, Subject } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { IAsset, ICompiledMenu, SelectorTypes, NodeTypes, ICompiledMenuNode, ICompiledProduct } from '@djonnyx/tornado-types';
import { TestDataService, CURRENCIES_DATA, ASSETS_DATA, LANGUAGES_DATA } from "./TestDataService";
import { DataCombiner, IProgress } from "../src/DataCombiner";

const clearParentNodes = (node: ICompiledMenuNode): void => {
    node.parent = null;

    if (node.content && node.type === NodeTypes.PRODUCT) {
        const productStructure = (node.content as ICompiledProduct).structure;
        if (productStructure) {
            clearParentNodes(productStructure);
        }
    }

    for (const child of node.children) {
        clearParentNodes(child);
    }
}

const COMPILED_MENU: ICompiledMenu = {
    "id": "n1",
    "index": 0,
    "active": true,
    "type": NodeTypes.KIOSK_ROOT,
    "parentId": null,
    "parent": null,
    "content": null,
    "children": [
        {
            "id": "n2",
            "index": 1,
            "active": true,
            "type": NodeTypes.SELECTOR,
            "parentId": "n1",
            "parent": null,
            "content": {
                "id": "s1",
                "type": SelectorTypes.MENU_CATEGORY,
                "contents": {
                    [LANGUAGES_DATA[0].code]: {
                        "name": "selector 1",
                        "description": "",
                        "color": "0xff00ff",
                        "resources": {
                            "main": ASSETS_DATA[0],
                            "icon": ASSETS_DATA[1]
                        },
                        "assets": [
                            ASSETS_DATA[0],
                            ASSETS_DATA[1]
                        ]
                    },
                    [LANGUAGES_DATA[1].code]: {
                        "name": "selector 1",
                        "description": "",
                        "color": "0xff00ff",
                        "resources": {
                            "main": ASSETS_DATA[0],
                            "icon": ASSETS_DATA[1]
                        },
                        "assets": [
                            ASSETS_DATA[0],
                            ASSETS_DATA[1]
                        ]
                    }
                },
                "minPrices": {},
                "extra": {
                    "key": "value"
                }
            },
            "children": [{
                "id": "n3",
                "index": 2,
                "active": true,
                "type": NodeTypes.PRODUCT,
                "parentId": "n2",
                "parent": null,
                "content": {
                    "id": "p1",
                    "contents": {
                        [LANGUAGES_DATA[0].code]: {
                            "name": "product 1",
                            "description": "Lorem ipsum",
                            "color": "0xff00ff",
                            "resources": {
                                "main": ASSETS_DATA[0],
                                "icon": ASSETS_DATA[1]
                            },
                            "assets": [
                                ASSETS_DATA[0],
                                ASSETS_DATA[1]
                            ],
                            "gallery": []
                        },
                        [LANGUAGES_DATA[1].code]: {
                            "name": "Продукт 1",
                            "description": "Lorem ipsum",
                            "color": "0x000000",
                            "resources": {
                                "main": ASSETS_DATA[0],
                                "icon": ASSETS_DATA[1]
                            },
                            "assets": [
                                ASSETS_DATA[0],
                                ASSETS_DATA[1]
                            ],
                            "gallery": []
                        }
                    },
                    "prices": {
                        "507c7f79bcf86cd7994f6c0e": {
                            "currency": CURRENCIES_DATA[0],
                            "value": 10000
                        }
                    },
                    "tags": [
                        {
                            "id": "t1",
                            "contents": {
                                [LANGUAGES_DATA[0].code]: {
                                    "name": "tag 1",
                                    "description": "",
                                    "color": "0xff00ff",
                                    "resources": {
                                        "main": ASSETS_DATA[0],
                                        "icon": ASSETS_DATA[1]
                                    },
                                    "assets": [
                                        ASSETS_DATA[0],
                                        ASSETS_DATA[1]
                                    ]
                                },
                                [LANGUAGES_DATA[1].code]: {
                                    "name": "tag 1",
                                    "description": "",
                                    "color": "0xff00ff",
                                    "resources": {
                                        "main": ASSETS_DATA[0],
                                        "icon": ASSETS_DATA[1]
                                    },
                                    "assets": [
                                        ASSETS_DATA[0],
                                        ASSETS_DATA[1]
                                    ]
                                }
                            },
                            "extra": {
                                "key": "value"
                            }
                        },
                        {
                            "id": "t2",
                            "contents": {
                                [LANGUAGES_DATA[0].code]: {
                                    "name": "tag 2",
                                    "description": "",
                                    "color": "0xef0000",
                                    "resources": {
                                        "main": ASSETS_DATA[0],
                                        "icon": ASSETS_DATA[1]
                                    },
                                    "assets": [
                                        ASSETS_DATA[0],
                                        ASSETS_DATA[1]
                                    ]
                                },
                                [LANGUAGES_DATA[1].code]: {
                                    "name": "tag 2",
                                    "description": "",
                                    "color": "0xef0000",
                                    "resources": {
                                        "main": ASSETS_DATA[0],
                                        "icon": ASSETS_DATA[1]
                                    },
                                    "assets": [
                                        ASSETS_DATA[0],
                                        ASSETS_DATA[1]
                                    ]
                                }
                            },
                            "extra": {
                                "key": "value"
                            }
                        }
                    ],
                    "minPrices": {},
                    "structure": {
                        "id": "j1",
                        "index": 0,
                        "active": true,
                        "type": NodeTypes.SELECTOR_JOINT,
                        "parentId": null,
                        "parent": null,
                        "content": null,
                        "children": [
                            {
                                "id": "j2",
                                "index": 1,
                                "active": true,
                                "type": NodeTypes.SELECTOR,
                                "parentId": "j1",
                                "parent": null,
                                "content": {
                                    "id": "sm1",
                                    "type": SelectorTypes.SCHEMA_CATEGORY,
                                    "contents": {
                                        [LANGUAGES_DATA[0].code]: {
                                            "name": "Choose a product",
                                            "description": "",
                                            "color": "0xff00ff",
                                            "resources": {
                                                "main": ASSETS_DATA[0],
                                                "icon": ASSETS_DATA[1]
                                            },
                                            "assets": [
                                                ASSETS_DATA[0],
                                                ASSETS_DATA[1]
                                            ]
                                        },
                                        [LANGUAGES_DATA[1].code]: {
                                            "name": "Choose a product",
                                            "description": "",
                                            "color": "0xff00ff",
                                            "resources": {
                                                "main": ASSETS_DATA[0],
                                                "icon": ASSETS_DATA[1]
                                            },
                                            "assets": [
                                                ASSETS_DATA[0],
                                                ASSETS_DATA[1]
                                            ]
                                        }
                                    },
                                    "minPrices": {},
                                    "extra": {
                                        "key": "value"
                                    }
                                },
                                "children": [
                                    {
                                        "id": "j3",
                                        "index": 2,
                                        "active": true,
                                        "type": NodeTypes.PRODUCT,
                                        "parentId": "j2",
                                        "parent": null,
                                        "content": {
                                            "id": "p3",
                                            "contents": {
                                                [LANGUAGES_DATA[0].code]: {
                                                    "name": "modifier",
                                                    "description": "",
                                                    "color": "0xff00ff",
                                                    "resources": {
                                                        "main": ASSETS_DATA[2],
                                                        "icon": ASSETS_DATA[1]
                                                    },
                                                    "assets": [
                                                        ASSETS_DATA[2],
                                                        ASSETS_DATA[1]
                                                    ],
                                                    "gallery": []
                                                },
                                                [LANGUAGES_DATA[1].code]: {
                                                    "name": "modifier",
                                                    "description": "",
                                                    "color": "0xff00ff",
                                                    "resources": {
                                                        "main": ASSETS_DATA[2],
                                                        "icon": ASSETS_DATA[1]
                                                    },
                                                    "assets": [
                                                        ASSETS_DATA[2],
                                                        ASSETS_DATA[1]
                                                    ],
                                                    "gallery": []
                                                }
                                            },
                                            "prices": {
                                                "507c7f79bcf86cd7994f6c0e": {
                                                    "currency": CURRENCIES_DATA[0],
                                                    "value": 10000
                                                }
                                            },
                                            "tags": [
                                                {
                                                    "id": "t3",
                                                    "contents": {
                                                        [LANGUAGES_DATA[0].code]: {
                                                            "name": "tag 3",
                                                            "description": "",
                                                            "color": "0x000000",
                                                            "resources": {
                                                                "main": ASSETS_DATA[0],
                                                                "icon": ASSETS_DATA[1]
                                                            },
                                                            "assets": [
                                                                ASSETS_DATA[0],
                                                                ASSETS_DATA[1]
                                                            ]
                                                        },
                                                        [LANGUAGES_DATA[1].code]: {
                                                            "name": "tag 3",
                                                            "description": "",
                                                            "color": "0x000000",
                                                            "resources": {
                                                                "main": ASSETS_DATA[0],
                                                                "icon": ASSETS_DATA[1]
                                                            },
                                                            "assets": [
                                                                ASSETS_DATA[0],
                                                                ASSETS_DATA[1]
                                                            ]
                                                        }
                                                    },
                                                    "extra": {
                                                        "key": "value"
                                                    }
                                                }
                                            ],
                                            "minPrices": {},
                                            "structure": undefined,
                                            "extra": {
                                                "key": "value"
                                            }
                                        },
                                        "children": [],
                                        "scenarios": [],
                                        "extra": {
                                            "key": "value"
                                        }
                                    }
                                ],
                                "scenarios": [],
                                "extra": {
                                    "key": "value"
                                },
                            }
                        ],
                        "scenarios": [],
                        "extra": {
                            "key": "value"
                        },
                    },
                    "extra": {
                        "key": "value"
                    },
                },
                "children": [],
                "scenarios": [],
                "extra": {
                    "key": "value"
                }
            },
            {
                "id": "n4",
                "index": 3,
                "active": true,
                "type": NodeTypes.PRODUCT,
                "parentId": "n2",
                "parent": null,
                "content": {
                    "id": "p2",
                    "contents": {
                        [LANGUAGES_DATA[0].code]: {
                            "name": "product 2",
                            "description": "",
                            "color": "0xff00ff",
                            "resources": {
                                "main": ASSETS_DATA[2],
                                "icon": ASSETS_DATA[1]
                            },
                            "assets": [
                                ASSETS_DATA[2],
                                ASSETS_DATA[1]
                            ],
                            "gallery": []
                        },
                        [LANGUAGES_DATA[1].code]: {
                            "name": "product 2",
                            "description": "",
                            "color": "0xff00ff",
                            "resources": {
                                "main": ASSETS_DATA[2],
                                "icon": ASSETS_DATA[1]
                            },
                            "assets": [
                                ASSETS_DATA[2],
                                ASSETS_DATA[1]
                            ],
                            "gallery": []
                        }
                    },
                    "prices": {
                        "507c7f79bcf86cd7994f6c0e": {
                            "currency": CURRENCIES_DATA[0],
                            "value": 10000
                        }
                    },
                    "tags": [
                        {
                            "id": "t3",
                            "contents": {
                                [LANGUAGES_DATA[0].code]: {
                                    "name": "tag 3",
                                    "description": "",
                                    "color": "0x000000",
                                    "resources": {
                                        "main": ASSETS_DATA[0],
                                        "icon": ASSETS_DATA[1]
                                    },
                                    "assets": [
                                        ASSETS_DATA[0],
                                        ASSETS_DATA[1]
                                    ]
                                },
                                [LANGUAGES_DATA[1].code]: {
                                    "name": "tag 3",
                                    "description": "",
                                    "color": "0x000000",
                                    "resources": {
                                        "main": ASSETS_DATA[0],
                                        "icon": ASSETS_DATA[1]
                                    },
                                    "assets": [
                                        ASSETS_DATA[0],
                                        ASSETS_DATA[1]
                                    ]
                                }
                            },
                            "extra": {
                                "key": "value"
                            }
                        }
                    ],
                    "minPrices": {},
                    "structure": undefined,
                    "extra": {
                        "key": "value"
                    }
                },
                "children": [],
                "scenarios": [],
                "extra": {
                    "key": "value"
                }
            }
            ],
            "scenarios": [],
            "extra": {
                "key": "value"
            }
        }
    ],
    "scenarios": [],
    "extra": {
        "key": "value"
    }
};

describe('DataCombiner', () => {
    it('should return valid menu', async () => {
        const resourcesCount = 5;

        const menu = await new Promise<ICompiledMenu>((resolve, reject) => {
            const service = new TestDataService();
            const progress: IProgress = {
                total: resourcesCount,
                current: 0,
            };

            const dataCombiner = new DataCombiner({
                assetsTransformer: (assets: Array<IAsset>) => {
                    return {
                        onComplete: interval(1000).pipe(
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

                    fs.writeFileSync("output/combinedData.json", JSON.stringify(data));
                    fs.writeFileSync("output/compiledMenu.json", JSON.stringify(data.menu));
                    fs.writeFileSync("output/compiledMenuReference.json", JSON.stringify(COMPILED_MENU));

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

            dataCombiner.init();
        });

        expect(JSON.stringify(menu)).to.equal(JSON.stringify(COMPILED_MENU));
    });

    it('should update menu', async () => {
        const resourcesCount = 3;

        const ACTUAL_UPDATE_COUNT = 2;
        let updateCount = 0;

        const menu = await new Promise((resolve, reject) => {
            const service = new TestDataService();
            const progress: IProgress = {
                total: resourcesCount,
                current: 0,
            };

            const dataCombiner = new DataCombiner({
                assetsTransformer: (assets: Array<IAsset>) => {
                    return {
                        onComplete: interval(1000).pipe(
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

            dataCombiner.init();
        });

        expect(updateCount).to.equal(ACTUAL_UPDATE_COUNT);
    });

    it('combinedData after second update must equal "null"', async () => {
        const unsubscribe$ = new Subject<void>();

        const resourcesCount = 3;

        const ACTUAL_UPDATE_COUNT = 2;
        let updateCount = 0;

        const menu = await new Promise((resolve, reject) => {
            const service = new TestDataService();
            const progress: IProgress = {
                total: resourcesCount,
                current: 0,
            };

            const dataCombiner = new DataCombiner({
                assetsTransformer: (assets: Array<IAsset>) => {
                    return {
                        onComplete: interval(1000).pipe(
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

            dataCombiner.init();
        });

        expect(menu).to.equal(null);
    });
});
