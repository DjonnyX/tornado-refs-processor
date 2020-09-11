import { Observable, of } from "rxjs";
import { IRef, INode, NodeTypes, ISelector, IProduct, ITag, IAsset, ILanguage, SelectorTypes, ITranslation, IBusinessPeriod, IOrderType, ICurrency, IAd, IStore, ITerminal } from "@djonnyx/tornado-types";

const currentDate = new Date(Date.now());

export const REFS_INFO_DATA: Array<IRef> = [
    {
        name: "nodes",
        version: 1,
        lastupdate: currentDate,
    },
    {
        name: "products",
        version: 1,
        lastupdate: currentDate,
    },
    {
        name: "selectors",
        version: 1,
        lastupdate: currentDate,
    },
    {
        name: "tags",
        version: 1,
        lastupdate: currentDate,
    },
    {
        name: "assets",
        version: 1,
        lastupdate: currentDate,
    },
    {
        name: "stores",
        version: 1,
        lastupdate: currentDate,
    },
    {
        name: "terminals",
        version: 1,
        lastupdate: currentDate,
    },
    {
        name: "business-periods",
        version: 1,
        lastupdate: currentDate,
    },
    {
        name: "currencies",
        version: 1,
        lastupdate: currentDate,
    },
    {
        name: "order-types",
        version: 1,
        lastupdate: currentDate,
    },
    {
        name: "languages",
        version: 1,
        lastupdate: currentDate,
    },
    {
        name: "ads",
        version: 1,
        lastupdate: currentDate,
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
        translation: "trans1",
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
        children: [""],
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
                description: "",
                color: "0xff00ff",
                resources: {
                    main: "a1",
                    icon: "a2",
                },
                assets: ["a1", "a2"],
                gallery: [],
            }
        },
        prices: [{
            currency: "c1",
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
            currency: "c1",
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
        lastupdate: currentDate,
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
        lastupdate: currentDate,
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
        lastupdate: currentDate,
        ext: ".png",
        path: "assets/a3.png",
        mipmap: {
            x128: "assets/a3_x128.png",
            x32: "assets/a3_x32.png",
        },
    },
];

export class TestDataService {
    getRefs(): Observable<Array<IRef>> {
        return of(REFS_INFO_DATA);
    };

    getNodes(): Observable<Array<INode>> {
        return of(NODES_DATA);
    }

    getSelectors(): Observable<Array<ISelector>> {
        return of(SELECTORS_DATA);
    }

    getProducts(): Observable<Array<IProduct>> {
        return of(PRODUCTS_DATA);
    }

    getTags(): Observable<Array<ITag>> {
        return of(TAGS_DATA);
    }

    getAssets(): Observable<Array<IAsset>> {
        return of(ASSETS_DATA);
    }

    getLanguages(): Observable<Array<ILanguage>> {
        return of(LANGUAGES_DATA);
    }

    getTranslations(): Observable<Array<ITranslation>> {
        return of(null);
    }

    getBusinessPeriods(): Observable<Array<IBusinessPeriod>> {
        return of(null);
    }

    getOrderTypes(): Observable<Array<IOrderType>> {
        return of(null);
    }

    getCurrencies(): Observable<Array<ICurrency>> {
        return of(null);
    }

    getAds(): Observable<Array<IAd>> {
        return of(null);
    }

    getStores(): Observable<Array<IStore>> {
        return of(null);
    }

    getTerminals(): Observable<Array<ITerminal>> {
        return of(null);
    }
}