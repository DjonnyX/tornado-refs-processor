import { Observable, of } from "rxjs";
import { IRef, INode, NodeTypes, ISelector, IProduct, ITag, IAsset } from "@djonnyx/tornado-types";

export const REFS_INFO_DATA: Array<IRef> = [
    {
        name: "nodes",
        version: 1,
        lastUpdate: Date.now(),
    },
    {
        name: "products",
        version: 1,
        lastUpdate: Date.now(),
    },
    {
        name: "selectors",
        version: 1,
        lastUpdate: Date.now(),
    },
    {
        name: "tags",
        version: 1,
        lastUpdate: Date.now(),
    },
    {
        name: "assets",
        version: 1,
        lastUpdate: Date.now(),
    },
];

export const NODES_DATA: Array<INode> = [
    {
        id: "n1",
        type: NodeTypes.KIOSK_ROOT,
        parentId: null,
        contentId: null,
        children: [""],
    },
    {
        id: "n2",
        type: NodeTypes.SELECTOR,
        parentId: "n1",
        contentId: "s1",
        children: ["n3", "n4"],
    },
    {
        id: "n3",
        type: NodeTypes.PRODUCT,
        parentId: "n2",
        contentId: "p1",
        children: [],
    },
    {
        id: "n4",
        type: NodeTypes.PRODUCT,
        parentId: "n2",
        contentId: "p2",
        children: [],
    },
];

export const SELECTORS_DATA: Array<ISelector> = [
    {
        id: "s1",
        name: "selector 1",
        description: "",
    },
];

export const PRODUCTS_DATA: Array<IProduct> = [
    {
        id: "p1",
        name: "product 1",
        description: "",
        tags: ["t1", "t2"],
        receipt: [],
        mainAsset: "a1",
        assets: ["a1", "a2"],
    },
    {
        id: "p2",
        name: "product 2",
        description: "",
        tags: ["t3"],
        receipt: [],
        mainAsset: "a3",
        assets: ["a3"],
    },
];

export const TAGS_DATA: Array<ITag> = [
    {
        id: "t1",
        name: "tag 1",
        description: "",
        color: "0xff00ff",
    },
    {
        id: "t2",
        name: "tag 2",
        description: "",
        color: "0xef0000",
    },
    {
        id: "t3",
        name: "tag 3",
        description: "",
        color: "0x000000",
    },
];

export const ASSETS_DATA: Array<IAsset> = [
    {
        id: "a1",
        name: "asset_1.png",
        lastupdate: Date.now().toString(),
        ext: ".png",
        path: "assets/a1",
        mipmap: {
            x128: "assets/a1_x128",
            x32: "assets/a1_x32",
        },
    },
    {
        id: "a2",
        name: "asset_2.png",
        lastupdate: Date.now().toString(),
        ext: ".png",
        path: "assets/a2",
        mipmap: {
            x128: "assets/a2_x128",
            x32: "assets/a2_x32",
        },
    },
    {
        id: "a3",
        name: "asset_3.png",
        lastupdate: Date.now().toString(),
        ext: ".png",
        path: "assets/a3",
        mipmap: {
            x128: "assets/a3_x128",
            x32: "assets/a3_x32",
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
}