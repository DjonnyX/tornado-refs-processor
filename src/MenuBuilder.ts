import {
    INode, IAsset, ISelector, IProduct, ITag, IRefs, NodeTypes, ICurrency, ITranslation, ILanguage,
    IBusinessPeriod, IOrderType, IStore, ITerminal, ICompiledMenu, ICompiledMenuNode, ICompiledSelector,
    ICompiledProduct, ICompiledProductContents, ICompiledSelectorContents, ICompiledTag, ICompiledTagContents, ICompiledLanguage, ICompiledOrderType, ICompiledOrderTypeContents, IAd, ScenarioCommonActionTypes, IScenario, ISystemTag, IAppTheme, ICompiledAppTheme
} from "@djonnyx/tornado-types";
import { getCompiledContents } from "./utils/getCompiledContents";
import { ICompiledEntityContents } from "@djonnyx/tornado-types/dist/interfaces/ICompiledEntityContents";
import { ICompiledTranslation } from "@djonnyx/tornado-types/dist/interfaces/ICompiledTranslation";
import { ICompiledAd } from "@djonnyx/tornado-types/dist/interfaces/ICompiledAd";
import { ICompiledAdContents } from "@djonnyx/tornado-types/dist/interfaces/ICompiledAdContents";

const IMAGE_PATTERN = /(Image|image)/;

export class MenuBuilder {
    private _rootNode: INode;
    private _languagesDictionary: { [languageCode: string]: ILanguage };
    private _translationsDictionary: { [languageCode: string]: ITranslation };
    private _assetsDictionary: { [id: string]: IAsset };
    private _adsDictionary: { [id: string]: IAd };
    private _nodesDictionary: { [id: string]: INode };
    private _selectorsDictionary: { [id: string]: ISelector };
    private _productsDictionary: { [id: string]: IProduct };
    private _tagsDictionary: { [id: string]: ITag };
    private _systemTagsDictionary: { [id: string]: ISystemTag };
    private _currenciesDictionary: { [id: string]: ICurrency };
    private _businessPeriodsDictionary: { [id: string]: IBusinessPeriod };
    private _orderTypesDictionary: { [id: string]: IOrderType };
    private _storesDictionary: { [id: string]: IStore };
    private _terminalsDictionary: { [id: string]: ITerminal };

    private _compiledNodesDictionary: { [id: string]: ICompiledMenuNode };

    private _defaultLanguage: ILanguage;
    get defaultLanguage(): ILanguage { return this._defaultLanguage; }

    private _defaultOrderType: IOrderType;
    get defaultOrderType(): IOrderType { return this._defaultOrderType; }

    private _defaultCurrecy: ICurrency;
    get defaultCurrecy(): ICurrency { return this._defaultCurrecy; }

    private _refs: IRefs;

    // compiled
    private _compiledSelectors: Array<ICompiledSelector>;
    get compiledSelectors(): Array<ICompiledSelector> { return this._compiledSelectors; }

    private _compiledProducts: Array<ICompiledProduct>;
    get compiledProducts(): Array<ICompiledProduct> { return this._compiledProducts; }

    private _compiledSelectorsDictionary: { [id: string]: ICompiledSelector };
    private _compiledProductsDictionary: { [id: string]: ICompiledProduct };
    private _compiledTagsDictionary: { [id: string]: ICompiledTag };

    private _compiledLanguages: Array<ICompiledLanguage>;
    get compiledLanguages(): Array<ICompiledLanguage> { return this._compiledLanguages; }

    private _compiledDefaultLanguage: ICompiledLanguage;
    get compiledDefaultLanguage(): ICompiledLanguage { return this._compiledDefaultLanguage; }

    private _compiledDefaultCurrency: ICurrency;
    get compiledDefaultCurrency(): ICurrency { return this._compiledDefaultCurrency; }

    private _compiledDefaultOrderType: ICompiledOrderType;
    get compiledDefaultOrderType(): ICompiledOrderType { return this._compiledDefaultOrderType; }

    private _compiledOrderTypes: Array<ICompiledOrderType>;
    get compiledOrderTypes(): Array<ICompiledOrderType> { return this._compiledOrderTypes; }

    private _compiledAds: Array<ICompiledAd>;
    get compiledAds(): Array<ICompiledAd> { return this._compiledAds; }

    private _compiledTags: Array<ICompiledTag>;
    get compiledTags(): Array<ICompiledTag> { return this._compiledTags; }

    private _menu: ICompiledMenu;
    get menu(): ICompiledMenu { return this._menu; }

    private _storeId: string;

    build(storeId: string, refs: IRefs): void {
        this._storeId = storeId;

        this.reset();

        this._refs = refs;

        if (!refs) {
            throw Error("refs in not defined.");
        }

        if (!!refs.assets) {
            refs.assets.forEach(asset => {
                this._assetsDictionary[asset.id] = asset;
            });
        }

        let firstLanguage: ILanguage;
        if (!!refs.languages) {
            refs.languages.forEach(language => {
                if (language.active) {
                    if (language.isDefault) {
                        this._defaultLanguage = language;
                    } else if (!firstLanguage) {
                        firstLanguage = language;
                    }
                    this._languagesDictionary[language.code] = language;
                }
            });

            if (!this._defaultLanguage) {
                if (!firstLanguage) {
                    throw Error("Default language not found.");
                }

                this._defaultLanguage = firstLanguage;
            }
        }

        if (!!refs.translations) {
            refs.translations.forEach(translation => {
                this._translationsDictionary[translation.id] = translation;
            });
        }

        if (!!refs.nodes) {
            refs.nodes.forEach(node => {
                this._nodesDictionary[node.id] = node;
                if (node.type === NodeTypes.KIOSK_ROOT) {
                    this._rootNode = node;
                }
            });

            if (!this._rootNode) {
                throw Error("root node in not defined.");
            }
        }

        if (!!refs.tags) {
            refs.tags.forEach(tag => {
                if (tag.active) {
                    this._tagsDictionary[tag.id] = tag;
                    this._compiledTagsDictionary[tag.id] = this.getCompiledTag(tag.id);
                }
            });
        }

        if (!!refs.systemTags) {
            refs.systemTags.forEach(systemTag => {
                this._systemTagsDictionary[systemTag.id] = systemTag;
            });
        }

        if (!!refs.currencies) {
            let firstCurrency: ICurrency;
            refs.currencies.forEach(currency => {
                if (currency.active) {
                    if (currency.isDefault) {
                        this._defaultCurrecy = currency;
                    } else if (!firstCurrency) {
                        firstCurrency = currency;
                    }
                    this._currenciesDictionary[currency.id] = currency;
                }
            });

            if (!this._defaultCurrecy) {
                if (!firstCurrency) {
                    throw Error("Default currency not found.");
                }

                this._defaultCurrecy = firstCurrency;
            }
        }

        if (!!refs.businessPeriods) {
            refs.businessPeriods.forEach(businessPeriod => {
                if (businessPeriod.active) {
                    this._businessPeriodsDictionary[businessPeriod.id] = businessPeriod;
                }
            });
        }

        if (!!refs.orderTypes) {
            let firstOrderType: IOrderType;
            refs.orderTypes.forEach(orderType => {
                if (orderType.active) {
                    if (orderType.isDefault) {
                        this._defaultOrderType = orderType;
                    } else if (!firstOrderType) {
                        firstOrderType = orderType;
                    }
                    this._orderTypesDictionary[orderType.id] = orderType;
                }
            });

            if (!this._defaultOrderType) {
                this._defaultOrderType = firstOrderType;
            }
        }

        if (!!refs.ads) {
            refs.ads.forEach(ad => {
                if (ad.active) {
                    this._adsDictionary[ad.id] = ad;
                }
            });
        }

        if (!!refs.stores) {
            refs.stores.forEach(store => {
                this._storesDictionary[store.id] = store;
            });
        }

        if (!!refs.terminals) {
            refs.terminals.forEach(terminal => {
                this._terminalsDictionary[terminal.id] = terminal;
            });
        }

        if (!!refs.selectors) {
            refs.selectors.forEach(selector => {
                if (selector.active) {
                    this._selectorsDictionary[selector.id] = selector;
                    this._compiledSelectorsDictionary[selector.id] = this.getCompiledSelector(selector.id);
                    this._compiledSelectors.push(this._compiledSelectorsDictionary[selector.id]);
                }
            });
        }

        if (!!refs.products) {
            refs.products.forEach(product => {
                if (product.active) {
                    this._productsDictionary[product.id] = product;
                    this._compiledProductsDictionary[product.id] = this.getCompiledProduct(product.id);
                    this._compiledProducts.push(this._compiledProductsDictionary[product.id]);
                }
            });

            // Привязка структур продуктов
            this._compiledProducts.forEach(product => {
                const baseProduct = this._productsDictionary[product.id];

                if (!!baseProduct) {
                    const jointNode = this._nodesDictionary[baseProduct.joint];
                    if (!!jointNode) {
                        product.structure = this.buildMenuTree(jointNode);
                    }
                }
            });
        }

        if (!!refs.nodes && !!refs.selectors && !!refs.products) {
            this._menu = this.buildMenuTree(this._rootNode);
        }

        if (!!refs.languages) {
            this._compiledLanguages = refs.languages.filter(v => !!v && v.active).map(v => this.getCompiledLanguages(v.code));

            this._compiledDefaultLanguage = this.getCompiledLanguages(this._defaultLanguage.code);
        }

        if (!!refs.orderTypes) {
            this._compiledDefaultOrderType = !!this._defaultOrderType ? this.getCompiledOrderType(this._defaultOrderType.id) : undefined;
        }

        if (!!refs.currencies) {
            this._compiledDefaultCurrency = this._defaultCurrecy;
        }

        if (!!refs.orderTypes) {
            this._compiledOrderTypes = refs.orderTypes.filter(v => !!v && v.active).map(v => this.getCompiledOrderType(v.id));
        }

        if (refs.tags) {
            this._compiledTags = refs.tags.filter(v => !!v && v.active).map(v => this._compiledTagsDictionary[v.id]);
        }

        if (!!refs.ads) {
            this._compiledAds = refs.ads.filter(v => !!v && v.active).map(v => this.getCompiledAd(v.id));
        }

        if (!!refs.themes) {
            refs.themes.forEach(theme => {
                this.fillThemeAssets(theme.data, this._assetsDictionary, theme.resources);
            });
        }
    }

    private buildMenuTree(rootNode: INode): ICompiledMenu {
        const menu = this.buildNode(rootNode, this._nodesDictionary);

        // this.setupParentNodes(menu, this._compiledNodesDictionary);

        return menu;
    }

    private setupParentNodes(node: ICompiledMenuNode, dictionary: { [id: string]: ICompiledMenuNode }): void {
        node.parent = dictionary[node.parentId];

        for (const child of node.children) {
            this.setupParentNodes(child, dictionary);
        }
    }

    private getIsStoreContain(node: INode): boolean {
        if (!!node && !!node.scenarios && node.scenarios.length > 0) {
            for (let i = 0, l = node.scenarios.length; i < l; i++) {
                const scenario = node.scenarios[i];

                if (scenario.action === ScenarioCommonActionTypes.VISIBLE_BY_STORE) {
                    const availableStores = scenario.value as Array<string>;

                    return availableStores.indexOf(this._storeId) > -1;
                }
            }
        }

        return true;
    }

    private buildNode(node: INode,
        nodesDictionary: { [id: string]: INode },
        extra: { index: number } = { index: 0 }): ICompiledMenuNode {
        let menuNode: ICompiledMenuNode;
        const existsCompiledMenuNode = this._compiledNodesDictionary[node.id];
        if (!!existsCompiledMenuNode) {
            menuNode = existsCompiledMenuNode;
        } else {

            const children = new Array<ICompiledMenuNode>();

            const index = extra.index;

            for (const childId of node.children) {
                extra.index++;
                const c = nodesDictionary[childId];
                if (!!c && c.active &&
                    this.getIsStoreContain(c)) {

                    let n: INode;
                    switch (c.type) {
                        case NodeTypes.SELECTOR:
                        case NodeTypes.SELECTOR_JOINT: {
                            n = c;
                            break;
                        }
                        case NodeTypes.PRODUCT: {
                            const baseProduct = this._productsDictionary[c.contentId];

                            if (!!baseProduct) {
                                const jointNode = this._nodesDictionary[baseProduct.joint];
                                if (!!jointNode) {
                                    if (!this.getIsStoreContain(jointNode)) {
                                        continue;
                                    }
                                    n = { ...c, scenarios: [...(jointNode.scenarios || []), ...(c.scenarios || [])] };
                                } else {
                                    n = c;
                                }
                            }
                            break;
                        }
                        case NodeTypes.SELECTOR_NODE: {
                            const nodeInstance = nodesDictionary[c.contentId];
                            if (!!nodeInstance) {
                                n = nodeInstance;
                            }
                            break;
                        }
                    }

                    if (!!n) {
                        const content = this.getCompiledNodeContent(n);

                        if (!!content) {
                            children.push(this.buildNode(n, nodesDictionary, extra));
                        }
                    }
                }
            }

            menuNode = {
                id: node.id,
                index,
                active: node.active,
                type: node.type,
                parentId: node.parentId,
                parent: undefined,
                content: this.getCompiledNodeContent(node),
                children,
                scenarios: node.scenarios,
                extra: node.extra,
            };

            this._compiledNodesDictionary[menuNode.id] = menuNode;
        }

        return menuNode;
    }

    private getCompiledNodeContent(node: INode): ICompiledSelector | ICompiledProduct | null {
        if (node) {
            switch (node.type) {
                case NodeTypes.SELECTOR:
                case NodeTypes.SELECTOR_JOINT: {
                    return this._selectorsDictionary[node.contentId]
                        ? this._compiledSelectorsDictionary[node.contentId]
                        : undefined;
                }
                case NodeTypes.SELECTOR_NODE: {
                    const nodeInstance = this._nodesDictionary[node.contentId];
                    if (!!nodeInstance) {
                        return this._selectorsDictionary[nodeInstance.contentId]
                            ? this._compiledSelectorsDictionary[nodeInstance.contentId]
                            : undefined;
                    }
                }
                case NodeTypes.PRODUCT: {
                    return this._productsDictionary[node.contentId]
                        ? this._compiledProductsDictionary[node.contentId]
                        : undefined;
                }
            }
        }

        return null;
    }

    private getCompiledSelector(id: string): ICompiledSelector {
        const selector = this._selectorsDictionary[id];

        if (!!selector) {
            const contents: ICompiledEntityContents<ICompiledSelectorContents> =
                getCompiledContents(selector.contents, this._refs.languages, this._defaultLanguage, this._assetsDictionary);

            return {
                id: selector.id,
                type: selector.type,
                contents,
                minPrices: {},
                extra: selector.extra,
            }
        }

        return null;
    }

    private getCompiledProduct(id: string): ICompiledProduct {
        const product = this._productsDictionary[id];

        if (!!product) {
            const contents: ICompiledEntityContents<ICompiledProductContents> =
                getCompiledContents(product.contents, this._refs.languages, this._defaultLanguage, this._assetsDictionary);

            const prices: {
                [currencyId: string]: {
                    currency: ICurrency;
                    value: number;
                };
            } = {};

            for (const price of product.prices) {
                if (!!this._currenciesDictionary[price.currency]) { // проверка активных валют
                    prices[price.currency] = {
                        currency: this._currenciesDictionary[price.currency],
                        value: price.value,
                    };
                }
            }

            const tags = new Array<ICompiledTag>();

            for (const tagId of product.tags) {
                if (!!this._compiledTagsDictionary[tagId]) {
                    tags.push(this._compiledTagsDictionary[tagId]);
                }
            }

            return {
                id: product.id,
                contents,
                prices,
                tags,
                minPrices: {},
                structure: undefined,
                weight: product.weight,
                systemTag: this._systemTagsDictionary?.[product.systemTag],
                extra: product.extra,
            };
        }

        return null;
    }

    private getCompiledTag(id: string): ICompiledTag {
        const tag = this._tagsDictionary[id];

        if (!!tag) {
            const contents: ICompiledEntityContents<ICompiledTagContents> = getCompiledContents(tag.contents, this._refs.languages, this._defaultLanguage, this._assetsDictionary);

            return {
                id: tag.id,
                contents,
                extra: tag.extra,
            };
        }

        return null;
    }

    private getCompiledOrderType(id: string): ICompiledOrderType {
        const orderType = this._orderTypesDictionary[id];

        if (!!orderType) {
            const contents: ICompiledEntityContents<ICompiledOrderTypeContents> = getCompiledContents(orderType.contents, this._refs.languages, this._defaultLanguage, this._assetsDictionary);

            return {
                id: orderType.id,
                isDefault: orderType.isDefault,
                contents,
                extra: orderType.extra,
            };
        }

        return null;
    }

    private getCompiledAd(id: string): ICompiledAd {
        const ad = this._adsDictionary[id];

        if (!!ad && ad.active) {
            const contents: ICompiledEntityContents<ICompiledAdContents> = getCompiledContents(ad.contents, this._refs.languages, this._defaultLanguage, this._assetsDictionary);

            return {
                id: ad.id,
                active: ad.active,
                type: ad.type,
                contents,
                extra: ad.extra,
            };
        }

        return null;
    }

    private getCompiledLanguages(code: string): ICompiledLanguage {
        const lang = this._languagesDictionary[code];

        if (!!lang) {
            const translation = this._translationsDictionary[lang.translation];
            let translationMap: ICompiledTranslation = {};

            if (!!translation) {
                translation.items.forEach(v => {
                    translationMap[v.key] = {
                        value: v.value,
                        extra: v.extra,
                    };
                });
            }

            return {
                id: lang.id,
                isDefault: lang.isDefault,
                code: lang.code,
                name: lang.name,
                assets: lang.assets.map(v => {
                    return this._assetsDictionary[v];
                }).filter(v => !!v),
                resources: {
                    main: this._assetsDictionary[lang.resources.main],
                },
                translation: translationMap,
                extra: lang.extra,
            };
        }

        return null;
    }

    private fillThemeAssets(props: { [propName: string]: any }, assets: { [key: string]: IAsset }, resources: { [key: string]: string }, lastProp?: string): void {
        if (!props || !assets) {
            return;
        }

        for (const prop in props) {
            const actualPropName = !!lastProp ? `${lastProp}.${prop}` : prop;

            if (IMAGE_PATTERN.test(prop)) {
                const assetId = resources[actualPropName];
                const asset = assets?.[assetId];
                props[prop] = { asset };
            } else {
                if (typeof props[prop] !== "string" && props[prop] !== "number" && props[prop] !== "boolean") {
                    this.fillThemeAssets(props[prop], assets, resources, actualPropName);
                }
            }
        }
    }

    private reset(): void {
        // параметры
        this._rootNode = null;
        this._defaultLanguage = undefined;
        this._compiledAds = [];
        this._compiledTags = [];
        this._compiledOrderTypes = [];
        this._compiledLanguages = [];
        this._compiledDefaultLanguage = null;
        this._compiledSelectors = [];
        this._compiledProducts = [];

        // словари
        this._systemTagsDictionary = {};
        this._adsDictionary = {};
        this._languagesDictionary = {};
        this._translationsDictionary = {};
        this._assetsDictionary = {};
        this._nodesDictionary = {};
        this._selectorsDictionary = {};
        this._productsDictionary = {};
        this._tagsDictionary = {};
        this._currenciesDictionary = {};
        this._businessPeriodsDictionary = {};
        this._orderTypesDictionary = {};
        this._storesDictionary = {};
        this._terminalsDictionary = {};

        this._compiledNodesDictionary = {}

        // словари компилированных сущностей
        this._compiledSelectorsDictionary = {};
        this._compiledProductsDictionary = {};
        this._compiledTagsDictionary = {};

        this._menu = null;
    }

    dispose(): void {
        this._rootNode = null;
        this._defaultLanguage = undefined;
        this._compiledAds = null;
        this._compiledTags = null;
        this._compiledOrderTypes = null;
        this._compiledLanguages = null;
        this._compiledDefaultLanguage = null;
        this._compiledSelectors = null;
        this._compiledProducts = null;

        this._systemTagsDictionary = null;
        this._adsDictionary = null;
        this._languagesDictionary = null;
        this._translationsDictionary = null;
        this._assetsDictionary = null;
        this._nodesDictionary = null;
        this._selectorsDictionary = null;
        this._productsDictionary = null;
        this._tagsDictionary = null;
        this._currenciesDictionary = null;
        this._businessPeriodsDictionary = null;
        this._orderTypesDictionary = null;
        this._storesDictionary = null;
        this._terminalsDictionary = null;

        this._compiledNodesDictionary = null;

        this._compiledSelectorsDictionary = null;
        this._compiledProductsDictionary = null;
        this._compiledTagsDictionary = null;

        this._menu = null;
    }
}