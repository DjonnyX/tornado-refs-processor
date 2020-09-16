import { expect } from 'chai';
import * as fs from "fs";
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { IAsset, ICompiledMenu, SelectorTypes, NodeTypes } from '@djonnyx/tornado-types';
import { TestDataService, CURRENCIES_DATA, ASSETS_DATA, LANGUAGES_DATA } from "./TestDataService";
import { DataCombiner } from "../src/DataCombiner";

const COMPILED_MENU: ICompiledMenu = {
    "id": "n1",
    "active": true,
    "type": NodeTypes.KIOSK_ROOT,
    "parentId": null,
    "content": null,
    "children": [
        {
            "id": "n2",
            "active": true,
            "type": NodeTypes.SELECTOR,
            "parentId": "n1",
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
            "children": [
                {
                    "id": "n3",
                    "active": true,
                    "type": NodeTypes.PRODUCT,
                    "parentId": "n2",
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
                        "extra": {
                            "key": "value"
                        }
                    },
                    "children": [],
                    "scenarios": [],
                    "extra": {
                        "key": "value"
                    }
                },
                {
                    "id": "n4",
                    "active": true,
                    "type": NodeTypes.PRODUCT,
                    "parentId": "n2",
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
    it('should return valid refs', async () => {
        const menu = await new Promise((resolve, reject) => {
            const service = new TestDataService();
            const dataCombiner = new DataCombiner({
                assetsTransformer: (assets: Array<IAsset>) => {
                    return of(assets);
                },
                dataService: service,
                updateTimeout: 99999999,
            });

            dataCombiner.onChange.pipe(
                take(1),
            ).subscribe(
                data => {

                    fs.writeFileSync("output/compiledMenu.json", JSON.stringify(data.menu));
                    fs.writeFileSync("output/compiledMenuReference.json", JSON.stringify(COMPILED_MENU));

                    resolve(data.menu);
                },
                err => {
                    reject(err);
                }
            );

            dataCombiner.init();
        });

        expect(JSON.stringify(menu)).to.equal(JSON.stringify(COMPILED_MENU));
    });
});
