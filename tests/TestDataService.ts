import { Observable, of, interval } from "rxjs";
import { IRef, INode, NodeTypes, ISelector, IProduct, ITag, IAsset, ILanguage, SelectorTypes, ITranslation, IBusinessPeriod, IOrderType, ICurrency, IAd, IStore, ITerminal, AdTypes, TerminalStatusTypes, TerminalTypes, RefTypes } from "@djonnyx/tornado-types";
import { take, switchMap } from "rxjs/operators";

const currentTestDate = new Date("2020-09-11T11:18:11.284Z");

export const REFS_INFO_DATA: Array<IRef> = [
    {
        name: RefTypes.NODES,
        version: 1,
        lastupdate: currentTestDate,
    },
    {
        name: RefTypes.PRODUCTS,
        version: 1,
        lastupdate: currentTestDate,
    },
    {
        name: RefTypes.SELECTORS,
        version: 1,
        lastupdate: currentTestDate,
    },
    {
        name: RefTypes.TAGS,
        version: 1,
        lastupdate: currentTestDate,
    },
    {
        name: RefTypes.ASSETS,
        version: 1,
        lastupdate: currentTestDate,
    },
    {
        name: RefTypes.STORES,
        version: 1,
        lastupdate: currentTestDate,
    },
    {
        name: RefTypes.TERMINALS,
        version: 1,
        lastupdate: currentTestDate,
    },
    {
        name: RefTypes.BUSINESS_PERIODS,
        version: 1,
        lastupdate: currentTestDate,
    },
    {
        name: RefTypes.CURRENCIES,
        version: 1,
        lastupdate: currentTestDate,
    },
    {
        name: RefTypes.ORDER_TYPES,
        version: 1,
        lastupdate: currentTestDate,
    },
    {
        name: RefTypes.LANGUAGES,
        version: 1,
        lastupdate: currentTestDate,
    },
    {
        name: RefTypes.TRANSLATIONS,
        version: 1,
        lastupdate: currentTestDate,
    },
    {
        name: RefTypes.ADS,
        version: 1,
        lastupdate: currentTestDate,
    },
];

export const LANGUAGES_DATA: Array<ILanguage> = [
    {
        id: "l1",
        active: true,
        isDefault: true,
        code: "RU",
        name: "Русский",
        assets: ["la1"],
        resources: { main: "la1" },
        translation: "507c7f79bcf86cd7994f6c0e",
        extra: { key: "value" },
    },
    {
        id: "l2",
        active: true,
        isDefault: false,
        code: "ENG",
        name: "English",
        assets: ["a1"],
        resources: { main: "a1" },
        translation: "507c7f79bcf86cd7994f6c0e",
        extra: { key: "value" },
    }
];

export const NODES_DATA: Array<INode> = [
    {
        id: "n1",
        active: true,
        type: NodeTypes.KIOSK_ROOT,
        parentId: null,
        contentId: null,
        children: ["n2"],
        scenarios: [],
        extra: { key: "value" },
    },
    {
        id: "n2",
        active: true,
        type: NodeTypes.SELECTOR,
        parentId: "n1",
        contentId: "s1",
        children: ["n3", "n4"],
        scenarios: [],
        extra: { key: "value" },
    },
    {
        id: "n3",
        active: true,
        type: NodeTypes.PRODUCT,
        parentId: "n2",
        contentId: "p1",
        children: [],
        scenarios: [],
        extra: { key: "value" },
    },
    {
        id: "n4",
        active: true,
        type: NodeTypes.PRODUCT,
        parentId: "n2",
        contentId: "p2",
        children: [],
        scenarios: [],
        extra: { key: "value" },
    },
];

export const SELECTORS_DATA: Array<ISelector> = [
    {
        id: "s1",
        active: true,
        type: SelectorTypes.MENU_CATEGORY,
        contents: {
            [LANGUAGES_DATA[0].code]: {
                name: "selector 1",
                description: "",
                color: "0xff00ff",
                resources: {
                    main: "a1",
                    icon: "a2",
                },
                assets: ["a1", "a2"],
            }
        },
        extra: { key: "value" },
    },
    {
        id: "s2",
        active: true,
        type: SelectorTypes.SCHEMA_CATEGORY,
        contents: {
            [LANGUAGES_DATA[0].code]: {
                name: "selector 2",
                description: "",
                color: "0xff00ff",
                resources: {
                    main: "a1",
                    icon: "a2",
                },
                assets: ["a1", "a2"],
            }
        },
        extra: { key: "value" },
    },
];

export const PRODUCTS_DATA: Array<IProduct> = [
    {
        id: "p1",
        active: true,
        contents: {
            [LANGUAGES_DATA[0].code]: {
                name: "product 1",
                description: "Lorem ipsum",
                color: "0xff00ff",
                resources: {
                    main: "a1",
                    icon: "a2",
                },
                assets: ["a1", "a2"],
                gallery: [],
            },
            [LANGUAGES_DATA[1].code]: {
                name: "Продукт 1",
                description: null,
                color: "0x000000",
                resources: {
                    main: null,
                    icon: null,
                },
                assets: [],
                gallery: [],
            }
        },
        prices: [{
            currency: "507c7f79bcf86cd7994f6c0e",
            value: 10000,
        }],
        extra: { key: "value" },
        tags: ["t1", "t2"],
        receipt: [],
    },
    {
        id: "p2",
        active: true,
        contents: {
            [LANGUAGES_DATA[0].code]: {
                name: "product 2",
                description: "",
                color: "0xff00ff",
                resources: {
                    main: "a3",
                    icon: "a2",
                },
                assets: ["a3", "a2"],
                gallery: [],
            }
        },
        prices: [{
            currency: "507c7f79bcf86cd7994f6c0e",
            value: 10000,
        }],
        extra: { key: "value" },
        tags: ["t3"],
        receipt: [],
    },
];

export const TAGS_DATA: Array<ITag> = [
    {
        id: "t1",
        active: true,
        contents: {
            [LANGUAGES_DATA[0].code]: {
                name: "tag 1",
                description: "",
                color: "0xff00ff",
                resources: {
                    main: "a1",
                    icon: "a2",
                },
                assets: ["a1", "a2"],
            }
        },
        extra: { key: "value" },
    },
    {
        id: "t2",
        active: true,
        contents: {
            [LANGUAGES_DATA[0].code]: {
                name: "tag 2",
                description: "",
                color: "0xef0000",
                resources: {
                    main: "a1",
                    icon: "a2",
                },
                assets: ["a1", "a2"],
            }
        },
        extra: { key: "value" },
    },
    {
        id: "t3",
        active: true,
        contents: {
            [LANGUAGES_DATA[0].code]: {
                name: "tag 3",
                description: "",
                color: "0x000000",
                resources: {
                    main: "a1",
                    icon: "a2",
                },
                assets: ["a1", "a2"],
            }
        },
        extra: { key: "value" },
    },
];

export const ASSETS_DATA: Array<IAsset> = [
    {
        id: "a1",
        active: true,
        name: "asset_1.png",
        lastupdate: currentTestDate,
        ext: ".png",
        path: "assets/a1",
        mipmap: {
            x128: "assets/a1_x128.png",
            x32: "assets/a1_x32.png",
        },
    },
    {
        id: "a2",
        active: true,
        name: "asset_2.png",
        lastupdate: currentTestDate,
        ext: ".png",
        path: "assets/a2.png",
        mipmap: {
            x128: "assets/a2_x128.png",
            x32: "assets/a2_x32.png",
        },
    },
    {
        id: "a3",
        active: true,
        name: "asset_3.png",
        lastupdate: currentTestDate,
        ext: ".png",
        path: "assets/a3.png",
        mipmap: {
            x128: "assets/a3_x128.png",
            x32: "assets/a3_x32.png",
        },
    },
];

export const TRANSLATIONS_DATA: Array<ITranslation> = [
    {
        id: "507c7f79bcf86cd7994f6c0e",
        language: LANGUAGES_DATA[0].code,
        items: [
            {
                key: "take-away",
                value: "Взять с собой",
            }
        ],
        extra: {
            key: "value",
        }
    }
];

export const CURRENCIES_DATA: Array<ICurrency> = [
    {
        id: "507c7f79bcf86cd7994f6c0e",
        isDefault: true,
        active: true,
        code: "RUB",
        name: "Рубль",
        symbol: "₽",
        extra: {
            key: "value",
        },
    }
];

export const BUSINESS_PERIODS_DATA: Array<IBusinessPeriod> = [
    {
        id: "507c7f79bcf86cd7994f6c0e",
        active: true,
        contents: {
            [LANGUAGES_DATA[0].code]: {
                name: "Business period",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            }
        },
        schedule: [
            {
                active: true,
                time: {
                    start: 0,
                    end: 84000000,
                },
                weekDays: [
                    0,
                    1,
                    2,
                ]
            }
        ],
        extra: {
            key: "value",
        },
    }
];

export const ORDER_TYPES_DATA: Array<IOrderType> = [
    {
        id: "507c7f79bcf86cd7994f6c0e",
        isDefault: true,
        active: true,
        contents: {
            [LANGUAGES_DATA[0].code]: {
                name: "Take away",
                description: "description",
                color: "#000000",
                assets: [
                    "a1",
                    "a2",
                ],
                resources: {
                    main: "a1",
                    icon: "a2",
                }
            }
        },
        extra: {
            key: "value",
        },
    }
];

export const ADS_DATA: Array<IAd> = [
    {
        id: "507c7f79bcf86cd7994f6c0e",
        active: true,
        type: AdTypes.BANNER,
        contents: {
            [LANGUAGES_DATA[0].code]: {
                name: "Ads on concert",
                duration: 10,
                color: "#000000",
                resources: {
                    main: "a1",
                },
                assets: [
                    "a1",
                ]
            }
        },
        extra: {
            key: "value",
        },
    }
];

export const STORES_DATA: Array<IStore> = [
    {
        id: "507c7f79bcf86cd7994f6c0e",
        active: true,
        name: "My store",
        address: "Moscow",
        terminals: [
            "a0830860-d869-4d31-837f-122097f75f4a",
            "2aff85fb-2316-4554-869c-df2ecd9126e9",
        ],
        employes: [
            "a0830860-d869-4d31-837f-122097f75f4a",
            "2aff85fb-2316-4554-869c-df2ecd9126e9",
        ],
        extra: {
            key: "value",
        },
    }
];

export const TERMINALS_DATA: Array<ITerminal> = [
    {
        id: "507c7f79bcf86cd7994f6c0e",
        status: TerminalStatusTypes.ONLINE,
        type: TerminalTypes.KIOSK,
        name: "My terminal",
        store: STORES_DATA[0].id,
        lastwork: new Date(),
        extra: {
            key: "value",
        },
    }
];

const request = (data: any) => {
    return interval(100).pipe(
        take(1),
        switchMap(() => of(data)),
    );
}

export class TestDataService {
    getRefs(): Observable<Array<IRef>> {
        return request(REFS_INFO_DATA);
    };

    getNodes(): Observable<Array<INode>> {
        return request(NODES_DATA);
    }

    getSelectors(): Observable<Array<ISelector>> {
        return request(SELECTORS_DATA);
    }

    getProducts(): Observable<Array<IProduct>> {
        return request(PRODUCTS_DATA);
    }

    getTags(): Observable<Array<ITag>> {
        return request(TAGS_DATA);
    }

    getAssets(): Observable<Array<IAsset>> {
        return request(ASSETS_DATA);
    }

    getLanguages(): Observable<Array<ILanguage>> {
        return request(LANGUAGES_DATA);
    }

    getTranslations(): Observable<Array<ITranslation>> {
        return request(TRANSLATIONS_DATA);
    }

    getBusinessPeriods(): Observable<Array<IBusinessPeriod>> {
        return request(BUSINESS_PERIODS_DATA);
    }

    getOrderTypes(): Observable<Array<IOrderType>> {
        return request(ORDER_TYPES_DATA);
    }

    getCurrencies(): Observable<Array<ICurrency>> {
        return request(CURRENCIES_DATA);
    }

    getAds(): Observable<Array<IAd>> {
        return request(ADS_DATA);
    }

    getStores(): Observable<Array<IStore>> {
        return request(STORES_DATA);
    }

    getTerminals(): Observable<Array<ITerminal>> {
        return request(TERMINALS_DATA);
    }
}