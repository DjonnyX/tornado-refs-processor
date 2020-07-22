import { INode, IAsset, ISelector, IProduct, ITag, IMenu, IRefs, NodeTypes, IMenuNode, IMenuProduct, IMenuSelector, IMenuTag } from "@djonnyx/tornado-types";

export class MenuBuilder {
    private _rootNode: INode;
    private _assetsDictionary: { [id: string]: IAsset };
    private _nodesDictionary: { [id: string]: INode };
    private _selectorsDictionary: { [id: string]: ISelector };
    private _productsDictionary: { [id: string]: IProduct };
    private _tagsDictionary: { [id: string]: ITag };

    private _menu: IMenu;
    get menu(): IMenu { return this._menu; }

    build(refs: IRefs): void {
        this.reset();

        if (!refs) {
            // err
            return;
        }

        if (!refs.assets) {
            // err
            return;
        }

        if (!refs.nodes) {
            // err
            return;
        }

        if (!refs.selectors) {
            // err
            return;
        }

        if (!refs.products) {
            // err
            return;
        }

        if (!refs.tags) {
            // err
            return;
        }

        refs.nodes.forEach(node => {
            this._nodesDictionary[node.id] = node;
            if (node.type === NodeTypes.KIOSK_ROOT) {
                this._rootNode = node;
            }
        });

        if (!this._rootNode) {
            // err
            return;
        }

        refs.assets.forEach(asset => {
            this._assetsDictionary[asset.id] = asset;
        });

        refs.selectors.forEach(selector => {
            this._selectorsDictionary[selector.id] = selector;
        });

        refs.products.forEach(product => {
            this._productsDictionary[product.id] = product;
        });

        refs.tags.forEach(tag => {
            this._tagsDictionary[tag.id] = tag;
        });

        this._menu = this.buildMenuTree();
    }

    private buildMenuTree(): IMenu {
        return this.buildNode(this._rootNode);
    }

    private buildNode(node: INode): IMenuNode {
        const menuNode: IMenuNode = {
            id: node.id,
            type: node.type,
            parentId: node.parentId,
            content: this.getContent(node),
            children: node.children.map(nodeId => this.buildNode(this._nodesDictionary[nodeId])),
        };

        return menuNode;
    }

    private getContent(node: INode): IMenuSelector | IMenuProduct | null {
        if (node) {
            switch (node.type) {
                case NodeTypes.SELECTOR: {
                    return this.getMenuSelector(node.contentId);
                }
                case NodeTypes.PRODUCT: {
                    return this.getMenuProduct(node.contentId);
                }
            }
        }

        return null;
    }

    private getMenuSelector(id: string): IMenuSelector {
        const selector = this._selectorsDictionary[id];

        if (selector) {
            return {
                id: selector.id,
                name: selector.name,
                description: selector.description,
            }
        }

        return null;
    }

    private getMenuProduct(id: string): IMenuProduct {
        const product = this._productsDictionary[id];

        if (product) {
            return {
                id: product.id,
                name: product.name,
                description: product.description,
                // receipt: null, // product.receipt,
                tags: product.tags.map(tagId => this.getMenuTag(tagId)),
                mainAsset: this._assetsDictionary[product.mainAsset],
                assets: product.assets.map(assetId => this._assetsDictionary[assetId]),
            }
        }

        return null;
    }

    private getMenuTag(id: string): IMenuTag {
        const tag = this._tagsDictionary[id];

        if (tag) {
            return {
                id: tag.id,
                name: tag.name,
                description: tag.description,
                color: tag.color,
            }
        }
    }

    private reset(): void {

        this._rootNode = null;
        this._assetsDictionary = {};
        this._nodesDictionary = {};
        this._selectorsDictionary = {};
        this._productsDictionary = {};
        this._tagsDictionary = {};

        this._menu = null;
    }
}