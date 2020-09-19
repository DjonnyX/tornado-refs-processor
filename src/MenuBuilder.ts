import {
    INode, IAsset, ISelector, IProduct, ITag, IRefs, NodeTypes, ICurrency, ITranslation, ILanguage,
    IBusinessPeriod, IOrderType, IStore, ITerminal, ICompiledMenu, ICompiledMenuNode, ICompiledSelector,
    ICompiledProduct, ICompiledProductContents, ICompiledSelectorContents, ICompiledTag, ICompiledTagContents, ICompiledLanguage, ICompiledOrderType, ICompiledOrderTypeContents, IAd
} from "@djonnyx/tornado-types";
import { getCompiledContents } from "./utils/getCompiledContents";
import { ICompiledEntityContents } from "@djonnyx/tornado-types/dist/interfaces/ICompiledEntityContents";
import { ICompiledTranslation } from "@djonnyx/tornado-types/dist/interfaces/ICompiledTranslation";
import { ICompiledAd } from "@djonnyx/tornado-types/dist/interfaces/ICompiledAd";
import { ICompiledAdContents } from "@djonnyx/tornado-types/dist/interfaces/ICompiledAdContents";

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
    private _currenciesDictionary: { [id: string]: ICurrency };
    private _businessPeriodsDictionary: { [id: string]: IBusinessPeriod };
    private _orderTypesDictionary: { [id: string]: IOrderType };
    private _storesDictionary: { [id: string]: IStore };
    private _terminalsDictionary: { [id: string]: ITerminal };

    private _defaultLanguage: ILanguage;
    get defaultLanguage(): ILanguage { return this._defaultLanguage; }

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

    private _compiledOrderTypes: Array<ICompiledOrderType>;
    get compiledOrderTypes(): Array<ICompiledOrderType> { return this._compiledOrderTypes; }

    private _compiledAds: Array<ICompiledAd>;
    get compiledAds(): Array<ICompiledAd> { return this._compiledAds; }

    private _compiledTags: Array<ICompiledTag>;
    get compiledTags(): Array<ICompiledTag> { return this._compiledTags; }

    private _menu: ICompiledMenu;
    get menu(): ICompiledMenu { return this._menu; }

    build(refs: IRefs): void {
        this.reset();

        this._refs = refs;

        if (!refs) {
            throw Error("refs in not defined.");
        }

        if (!refs.assets) {
            throw Error("assets ref in not defined.");
        }

        if (!refs.nodes) {
            throw Error("nodes ref in not defined.");
        }

        if (!refs.selectors) {
            throw Error("selectors ref in not defined.");
        }

        if (!refs.products) {
            throw Error("products ref in not defined.");
        }

        if (!refs.tags) {
            throw Error("tags ref in not defined.");
        }

        if (!refs.languages) {
            throw Error("languages ref in not defined.");
        }

        if (!refs.translations) {
            throw Error("translations ref in not defined.");
        }

        if (!refs.businessPeriods) {
            throw Error("business-periods ref in not defined.");
        }

        if (!refs.orderTypes) {
            throw Error("order-types ref in not defined.");
        }

        if (!refs.currencies) {
            throw Error("currencies ref in not defined.");
        }

        if (!refs.stores) {
            throw Error("stores ref in not defined.");
        }

        if (!refs.terminals) {
            throw Error("terminals ref in not defined.");
        }

        if (!refs.ads) {
            throw Error("ads ref in not defined.");
        }

        refs.assets.forEach(asset => {
            this._assetsDictionary[asset.id] = asset;
        });

        let firstLanguage: ILanguage;
        refs.languages.forEach(language => {
            if (language.active) {
                if (language.isDefault) {
                    this._defaultLanguage = language;
                } else
                    if (!firstLanguage) {
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

        refs.translations.forEach(translation => {
            this._translationsDictionary[translation.language] = translation;
        });

        refs.nodes.forEach(node => {
            this._nodesDictionary[node.id] = node;
            if (node.type === NodeTypes.KIOSK_ROOT) {
                this._rootNode = node;
            }
        });

        if (!this._rootNode) {
            throw Error("root node in not defined.");
        }

        refs.tags.forEach(tag => {
            if (tag.active) {
                this._tagsDictionary[tag.id] = tag;
                this._compiledTagsDictionary[tag.id] = this.getCompiledTag(tag.id);
            }
        });

        refs.currencies.forEach(currency => {
            if (currency.active) {
                this._currenciesDictionary[currency.id] = currency;
            }
        });

        refs.businessPeriods.forEach(businessPeriod => {
            if (businessPeriod.active) {
                this._businessPeriodsDictionary[businessPeriod.id] = businessPeriod;
            }
        });

        refs.orderTypes.forEach(orderType => {
            if (orderType.active) {
                this._orderTypesDictionary[orderType.id] = orderType;
            }
        });

        refs.ads.forEach(ad => {
            if (ad.active) {
                this._adsDictionary[ad.id] = ad;
            }
        });

        refs.stores.forEach(store => {
            this._storesDictionary[store.id] = store;
        });

        refs.terminals.forEach(terminal => {
            this._terminalsDictionary[terminal.id] = terminal;
        });

        refs.selectors.forEach(selector => {
            if (selector.active) {
                this._selectorsDictionary[selector.id] = selector;
                this._compiledSelectorsDictionary[selector.id] = this.getCompiledSelector(selector.id);
                this._compiledSelectors.push(this._compiledSelectorsDictionary[selector.id]);
            }
        });

        refs.products.forEach(product => {
            if (product.active) {
                this._productsDictionary[product.id] = product;
                this._compiledProductsDictionary[product.id] = this.getCompiledProduct(product.id);
                this._compiledProducts.push(this._compiledProductsDictionary[product.id]);
            }
        });

        this._menu = this.buildMenuTree();

        this._compiledLanguages = refs.languages.map(v => this.getCompiledLanguages(v.id));

        this._compiledDefaultLanguage = this.getCompiledLanguages(this._defaultLanguage.id);

        this._compiledOrderTypes = refs.orderTypes.map(v => this.getCompiledOrderType(v.id));

        this._compiledTags = refs.tags.map(v => this._compiledTagsDictionary[v.id]);

        this._compiledAds = refs.ads.map(v => this.getCompiledAd(v.id));
    }

    private buildMenuTree(): ICompiledMenu {
        return this.buildNode(this._rootNode);
    }

    private buildNode(node: INode): ICompiledMenuNode {

        const children = new Array<ICompiledMenuNode>();

        for (const childId of node.children) {
            if (!!this._nodesDictionary[childId] && this._nodesDictionary[childId].active) {

                const content = this.getCompiledNodeContent(this._nodesDictionary[childId]);

                if (!!content) {
                    children.push(this.buildNode(this._nodesDictionary[childId]));
                }
            }
        }

        const menuNode: ICompiledMenuNode = {
            id: node.id,
            active: node.active,
            type: node.type,
            parentId: node.parentId,
            content: this.getCompiledNodeContent(node),
            children,
            scenarios: node.scenarios,
            extra: node.extra,
        };

        return menuNode;
    }

    private getCompiledNodeContent(node: INode): ICompiledSelector | ICompiledProduct | null {
        if (node) {
            switch (node.type) {
                case NodeTypes.SELECTOR: {
                    return this._selectorsDictionary[node.contentId] ? this._compiledSelectorsDictionary[node.contentId] : undefined;
                }
                case NodeTypes.PRODUCT: {
                    return this._productsDictionary[node.contentId] ? this._compiledProductsDictionary[node.contentId] : undefined;
                }
            }
        }

        return null;
    }

    private getCompiledSelector(id: string): ICompiledSelector {
        const selector = this._selectorsDictionary[id];

        if (!!selector) {
            const contents: ICompiledEntityContents<ICompiledSelectorContents> = getCompiledContents(selector.contents, this._refs.languages, this._defaultLanguage, this._assetsDictionary);

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
            const contents: ICompiledEntityContents<ICompiledProductContents> = getCompiledContents(product.contents, this._refs.languages, this._defaultLanguage, this._assetsDictionary);

            const prices: {
                [currencyCode: string]: {
                    currency: ICurrency;
                    value: number;
                };
            } = {};

            for (const price of product.prices) {
                prices[price.currency] = {
                    currency: this._currenciesDictionary[price.currency],
                    value: price.value,
                };
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
                contents,
                extra: orderType.extra,
            };
        }

        return null;
    }

    private getCompiledAd(id: string): ICompiledAd {
        const ad = this._adsDictionary[id];

        if (!!ad) {
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

    private getCompiledLanguages(id: string): ICompiledLanguage {
        const lang = this._languagesDictionary[id];

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
                }),
                resources: {
                    main: this._assetsDictionary[lang.resources.main],
                },
                translation: translationMap,
                extra: lang.extra,
            };
        }

        return null;
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

        this._compiledSelectorsDictionary = null;
        this._compiledProductsDictionary = null;
        this._compiledTagsDictionary = null;

        this._menu = null;
    }
}