import { Observable, of, interval } from "rxjs";
import {
    IRef, INode, NodeTypes, ISelector, IProduct, ITag, IAsset, ILanguage, SelectorTypes, ITranslation,
    IBusinessPeriod, IOrderType, ICurrency, IAd, IStore, ITerminal, RefTypes, ISystemTag, IWeightUnit
} from "@djonnyx/tornado-types";
import { take, switchMap } from "rxjs/operators";

const currentTestDate = new Date("2020-09-11T11:18:11.284Z");

export const M1_REFS_INFO_DATA: Array<IRef> = [
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
    {
        name: RefTypes.WEIGHT_UNITS,
        version: 1,
        lastUpdate: currentTestDate,
    },
];

export const M1_LANGUAGES_DATA: Array<ILanguage> = [
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

export const M1_NODES_DATA: Array<INode> = [
    {
        id: "n1",
        active: true,
        type: NodeTypes.KIOSK_ROOT,
        parentId: null,
        contentId: null,
        children: ["n2", "ni1"],
        scenarios: [],
        extra: { key: "value" },
    },
    {
        id: "n2",
        active: true,
        type: NodeTypes.SELECTOR,
        parentId: "n1",
        contentId: "s1",
        children: ["n3"],
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
        id: "ni1",
        active: true,
        type: NodeTypes.SELECTOR_NODE,
        parentId: "n1",
        contentId: "n2",
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
        children: [],
        scenarios: [],
        extra: { key: "value" },
    },
];

export const M1_SELECTORS_DATA: Array<ISelector> = [
    {
        id: "s1",
        active: true,
        type: SelectorTypes.MENU_CATEGORY,
        contents: {
            [M1_LANGUAGES_DATA[0].code]: {
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
        systemTag: null,
        extra: { key: "value" },
    },
];

export const M1_PRODUCTS_DATA: Array<IProduct> = [
    {
        id: "p1",
        active: true,
        contents: {
            [M1_LANGUAGES_DATA[0].code]: {
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
        weightUnitId: undefined,
    },
];

export const M1_TAGS_DATA: Array<ITag> = [];

export const M1_ASSETS_DATA: Array<IAsset> = [
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

export const M1_TRANSLATIONS_DATA: Array<ITranslation> = [];

export const M1_CURRENCIES_DATA: Array<ICurrency> = [
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

export const M1_BUSINESS_PERIODS_DATA: Array<IBusinessPeriod> = [];

export const M1_ORDER_TYPES_DATA: Array<IOrderType> = [];

export const M1_ADS_DATA: Array<IAd> = [];

export const M1_STORES_DATA: Array<IStore> = [];

export const M1_TERMINALS_DATA: Array<ITerminal> = [];

export const M1_THEMES_DATA: Array<any> = [];

export const M1_SYSTEM_TAGS_DATA: Array<ISystemTag> = [];

export const M1_WEIGHT_UNITS_DATA: Array<IWeightUnit> = [];

const request = (data: any) => {
    return interval(100).pipe(
        take(1),
        switchMap(() => of(data)),
    );
}

export class TestDataMenuInstancesService<T = any> {
    getRefs(): Observable<Array<IRef>> {
        return request(M1_REFS_INFO_DATA);
    };

    getNodes(): Observable<Array<INode>> {
        return request(M1_NODES_DATA);
    }

    getSelectors(): Observable<Array<ISelector>> {
        return request(M1_SELECTORS_DATA);
    }

    getProducts(): Observable<Array<IProduct>> {
        return request(M1_PRODUCTS_DATA);
    }

    getTags(): Observable<Array<ITag>> {
        return request(M1_TAGS_DATA);
    }

    getAssets(): Observable<Array<IAsset>> {
        return request(M1_ASSETS_DATA);
    }

    getLanguages(): Observable<Array<ILanguage>> {
        return request(M1_LANGUAGES_DATA);
    }

    getTranslations(): Observable<Array<ITranslation>> {
        return request(M1_TRANSLATIONS_DATA);
    }

    getBusinessPeriods(): Observable<Array<IBusinessPeriod>> {
        return request(M1_BUSINESS_PERIODS_DATA);
    }

    getOrderTypes(): Observable<Array<IOrderType>> {
        return request(M1_ORDER_TYPES_DATA);
    }

    getCurrencies(): Observable<Array<ICurrency>> {
        return request(M1_CURRENCIES_DATA);
    }

    getAds(): Observable<Array<IAd>> {
        return request(M1_ADS_DATA);
    }

    getStores(): Observable<Array<IStore>> {
        return request(M1_STORES_DATA);
    }

    getTerminals(): Observable<Array<ITerminal>> {
        return request(M1_TERMINALS_DATA);
    }

    getThemes(): Observable<Array<T>> {
        return request(M1_THEMES_DATA);
    }

    getSystemTags(): Observable<Array<ISystemTag>> {
        return request(M1_SYSTEM_TAGS_DATA);
    }

    getWeightUnits(): Observable<Array<IWeightUnit>> {
        return request(M1_WEIGHT_UNITS_DATA);
    }
}