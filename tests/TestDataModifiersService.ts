import { Observable, of, interval } from "rxjs";
import {
    IRef, INode, NodeTypes, ISelector, IProduct, ITag, IAsset, ILanguage, SelectorTypes, ITranslation,
    IBusinessPeriod, IOrderType, ICurrency, IAd, IStore, ITerminal, RefTypes, ISystemTag
} from "@djonnyx/tornado-types";
import { take, switchMap } from "rxjs/operators";

const currentTestDate = new Date("2020-09-11T11:18:11.284Z");

export const M_REFS_INFO_DATA: Array<IRef> = [
    {
        name: RefTypes.NODES,
        version: 1,
        lastUpdate: currentTestDate,
    },
    {
        name: RefTypes.PRODUCTS,
        version: 1,
        lastUpdate: currentTestDate,
    },
    {
        name: RefTypes.SELECTORS,
        version: 1,
        lastUpdate: currentTestDate,
    },
    {
        name: RefTypes.TAGS,
        version: 1,
        lastUpdate: currentTestDate,
    },
    {
        name: RefTypes.ASSETS,
        version: 1,
        lastUpdate: currentTestDate,
    },
    {
        name: RefTypes.STORES,
        version: 1,
        lastUpdate: currentTestDate,
    },
    {
        name: RefTypes.TERMINALS,
        version: 1,
        lastUpdate: currentTestDate,
    },
    {
        name: RefTypes.BUSINESS_PERIODS,
        version: 1,
        lastUpdate: currentTestDate,
    },
    {
        name: RefTypes.CURRENCIES,
        version: 1,
        lastUpdate: currentTestDate,
    },
    {
        name: RefTypes.ORDER_TYPES,
        version: 1,
        lastUpdate: currentTestDate,
    },
    {
        name: RefTypes.LANGUAGES,
        version: 1,
        lastUpdate: currentTestDate,
    },
    {
        name: RefTypes.TRANSLATIONS,
        version: 1,
        lastUpdate: currentTestDate,
    },
    {
        name: RefTypes.ADS,
        version: 1,
        lastUpdate: currentTestDate,
    },
    {
        name: RefTypes.THEMES,
        version: 1,
        lastUpdate: currentTestDate,
    },
    {
        name: RefTypes.SYSTEM_TAGS,
        version: 1,
        lastUpdate: currentTestDate,
    },
];

export const M_LANGUAGES_DATA: Array<ILanguage> = [
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
];

export const M_NODES_DATA: Array<INode> = [
    {
        id: "n1",
        active: true,
        type: NodeTypes.KIOSK_ROOT,
        parentId: null,
        contentId: null,
        children: ["n2", "n3"],
        scenarios: [],
        extra: { key: "value" },
    },
    {
        id: "n2",
        active: true,
        type: NodeTypes.PRODUCT,
        parentId: "n1",
        contentId: "p1",
        children: [],
        scenarios: [],
        extra: { key: "value" },
    },
    {
        id: "n3",
        active: true,
        type: NodeTypes.PRODUCT,
        parentId: "n1",
        contentId: "p3",
        children: [],
        scenarios: [],
        extra: { key: "value" },
    },
    {
        id: "j1",
        active: true,
        type: NodeTypes.PRODUCT_JOINT,
        parentId: null,
        contentId: null,
        children: ["j2"],
        scenarios: [],
        extra: { key: "value" },
    },
    {
        id: "n3",
        active: true,
        type: NodeTypes.PRODUCT,
        parentId: "n1",
        contentId: "p3",
        children: [],
        scenarios: [],
        extra: { key: "value" },
    },
    {
        id: "j3",
        active: true,
        type: NodeTypes.PRODUCT_JOINT,
        parentId: null,
        contentId: null,
        children: ["j2"],
        scenarios: [],
        extra: { key: "value" },
    },
    {
        id: "j2",
        active: true,
        type: NodeTypes.SELECTOR_JOINT,
        parentId: null,
        contentId: "s1",
        children: ["np1"],
        scenarios: [],
        extra: { key: "value" },
    },
    {
        id: "np1",
        active: true,
        type: NodeTypes.PRODUCT,
        parentId: "j2",
        contentId: "p2",
        children: [],
        scenarios: [],
        extra: { key: "value" },
    },
];

export const M_SELECTORS_DATA: Array<ISelector> = [
    {
        id: "s1",
        active: true,
        type: SelectorTypes.SCHEMA_CATEGORY,
        contents: {
            [M_LANGUAGES_DATA[0].code]: {
                name: "Choose a product",
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

export const M_PRODUCTS_DATA: Array<IProduct> = [
    {
        id: "p1",
        active: true,
        contents: {
            [M_LANGUAGES_DATA[0].code]: {
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
        },
        prices: [{
            currency: "507c7f79bcf86cd7994f6c0e",
            value: 10000,
        }],
        extra: { key: "value" },
        tags: [],
        receipt: [],
        joint: "j1",
        systemTag: undefined,
        weight: 100,
    },
    {
        id: "p3",
        active: true,
        contents: {
            [M_LANGUAGES_DATA[0].code]: {
                name: "product 3",
                description: "Lorem ipsum",
                color: "0xff00ff",
                resources: {
                    main: "a1",
                    icon: "a2",
                },
                assets: ["a1", "a2"],
                gallery: [],
            },
        },
        prices: [{
            currency: "507c7f79bcf86cd7994f6c0e",
            value: 10000,
        }],
        extra: { key: "value" },
        tags: [],
        receipt: [],
        joint: "j3",
        systemTag: undefined,
        weight: 100,
    },
    {
        id: "p2",
        active: true,
        contents: {
            [M_LANGUAGES_DATA[0].code]: {
                name: "modifier",
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
            currency: "507c7f79bcf86cd7994f6c0e",
            value: 10000,
        }],
        extra: { key: "value" },
        tags: [],
        receipt: [],
        systemTag: undefined,
        weight: 100,
    },
];

export const M_TAGS_DATA: Array<ITag> = [];

export const M_ASSETS_DATA: Array<IAsset> = [
    {
        id: "a1",
        active: true,
        name: "asset_1.png",
        lastUpdate: currentTestDate,
        ext: ".png",
        path: "assets/a1",
        mipmap: {
            x128: "assets/a1_x128.png",
            x32: "assets/a1_x32.png",
        },
        extra: {},
    },
    {
        id: "a2",
        active: true,
        name: "asset_2.png",
        lastUpdate: currentTestDate,
        ext: ".png",
        path: "assets/a2.png",
        mipmap: {
            x128: "assets/a2_x128.png",
            x32: "assets/a2_x32.png",
        },
        extra: {},
    },
];

export const M_TRANSLATIONS_DATA: Array<ITranslation> = [];

export const M_CURRENCIES_DATA: Array<ICurrency> = [
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

export const M_BUSINESS_PERIODS_DATA: Array<IBusinessPeriod> = [];

export const M_ORDER_TYPES_DATA: Array<IOrderType> = [];

export const M_ADS_DATA: Array<IAd> = [];

export const M_STORES_DATA: Array<IStore> = [];

export const M_TERMINALS_DATA: Array<ITerminal> = [];

export const M_THEMES_DATA: Array<any> = [];

export const M_SYSTEM_TAGS_DATA: Array<ISystemTag> = [];

const request = (data: any) => {
    return interval(100).pipe(
        take(1),
        switchMap(() => of(data)),
    );
}

export class TestDataModifiersService<T = any> {
    getRefs(): Observable<Array<IRef>> {
        return request(M_REFS_INFO_DATA);
    };

    getNodes(): Observable<Array<INode>> {
        return request(M_NODES_DATA);
    }

    getSelectors(): Observable<Array<ISelector>> {
        return request(M_SELECTORS_DATA);
    }

    getProducts(): Observable<Array<IProduct>> {
        return request(M_PRODUCTS_DATA);
    }

    getTags(): Observable<Array<ITag>> {
        return request(M_TAGS_DATA);
    }

    getAssets(): Observable<Array<IAsset>> {
        return request(M_ASSETS_DATA);
    }

    getLanguages(): Observable<Array<ILanguage>> {
        return request(M_LANGUAGES_DATA);
    }

    getTranslations(): Observable<Array<ITranslation>> {
        return request(M_TRANSLATIONS_DATA);
    }

    getBusinessPeriods(): Observable<Array<IBusinessPeriod>> {
        return request(M_BUSINESS_PERIODS_DATA);
    }

    getOrderTypes(): Observable<Array<IOrderType>> {
        return request(M_ORDER_TYPES_DATA);
    }

    getCurrencies(): Observable<Array<ICurrency>> {
        return request(M_CURRENCIES_DATA);
    }

    getAds(): Observable<Array<IAd>> {
        return request(M_ADS_DATA);
    }

    getStores(): Observable<Array<IStore>> {
        return request(M_STORES_DATA);
    }

    getTerminals(): Observable<Array<ITerminal>> {
        return request(M_TERMINALS_DATA);
    }

    getThemes(): Observable<Array<T>> {
        return request(M_THEMES_DATA);
    }

    getSystemTags(): Observable<Array<ISystemTag>> {
        return request(M_SYSTEM_TAGS_DATA);
    }
}