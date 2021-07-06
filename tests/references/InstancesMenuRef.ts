import { ICompiledMenu, NodeTypes, SelectorTypes } from "@djonnyx/tornado-types";
import { M1_ASSETS_DATA, M1_CURRENCIES_DATA, M1_LANGUAGES_DATA } from "../TestDataMenuInstancesService";

export const INSTANCES_MENU_REF: ICompiledMenu = {
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
                    [M1_LANGUAGES_DATA[0].code]: {
                        "name": "selector 1",
                        "description": "",
                        "color": "0xff00ff",
                        "resources": {
                            "main": M1_ASSETS_DATA[0],
                            "icon": M1_ASSETS_DATA[1]
                        },
                        "assets": [
                            M1_ASSETS_DATA[0],
                            M1_ASSETS_DATA[1]
                        ]
                    },
                },
                "minPrices": {},
                "extra": {
                    "key": "value"
                }
            },
            "children": [
                {
                    "id": "n3",
                    "index": 2,
                    "active": true,
                    "type": NodeTypes.PRODUCT,
                    "parentId": "n2",
                    "parent": null,
                    "content": {
                        "id": "p1",
                        "contents": {
                            [M1_LANGUAGES_DATA[0].code]: {
                                "name": "product 1",
                                "description": "Lorem ipsum",
                                "color": "0xff00ff",
                                "resources": {
                                    "main": M1_ASSETS_DATA[0],
                                    "icon": M1_ASSETS_DATA[1]
                                },
                                "assets": [
                                    M1_ASSETS_DATA[0],
                                    M1_ASSETS_DATA[1]
                                ],
                                "gallery": []
                            },
                        },
                        "prices": {
                            "507c7f79bcf86cd7994f6c0e": {
                                "currency": M1_CURRENCIES_DATA[0],
                                "value": 10000
                            }
                        },
                        "tags": [],
                        "minPrices": {},
                        "structure": {
                            "id": "j1",
                            "index": 0,
                            "active": true,
                            "type": NodeTypes.PRODUCT_JOINT,
                            "parentId": null,
                            "parent": null,
                            "content": null,
                            "children": [],
                            "scenarios": [],
                            "extra": {
                                "key": "value"
                            },
                        },
                        "systemTag": undefined,
                        "weight": 100,
                        "extra": {
                            "key": "value"
                        },
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
        },
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
                    [M1_LANGUAGES_DATA[0].code]: {
                        "name": "selector 1",
                        "description": "",
                        "color": "0xff00ff",
                        "resources": {
                            "main": M1_ASSETS_DATA[0],
                            "icon": M1_ASSETS_DATA[1]
                        },
                        "assets": [
                            M1_ASSETS_DATA[0],
                            M1_ASSETS_DATA[1]
                        ]
                    },
                },
                "minPrices": {},
                "extra": {
                    "key": "value"
                }
            },
            "children": [
                {
                    "id": "n3",
                    "index": 2,
                    "active": true,
                    "type": NodeTypes.PRODUCT,
                    "parentId": "n2",
                    "parent": null,
                    "content": {
                        "id": "p1",
                        "contents": {
                            [M1_LANGUAGES_DATA[0].code]: {
                                "name": "product 1",
                                "description": "Lorem ipsum",
                                "color": "0xff00ff",
                                "resources": {
                                    "main": M1_ASSETS_DATA[0],
                                    "icon": M1_ASSETS_DATA[1]
                                },
                                "assets": [
                                    M1_ASSETS_DATA[0],
                                    M1_ASSETS_DATA[1]
                                ],
                                "gallery": []
                            },
                        },
                        "prices": {
                            "507c7f79bcf86cd7994f6c0e": {
                                "currency": M1_CURRENCIES_DATA[0],
                                "value": 10000
                            }
                        },
                        "tags": [],
                        "minPrices": {},
                        "structure": {
                            "id": "j1",
                            "index": 0,
                            "active": true,
                            "type": NodeTypes.PRODUCT_JOINT,
                            "parentId": null,
                            "parent": null,
                            "content": null,
                            "children": [],
                            "scenarios": [],
                            "extra": {
                                "key": "value"
                            },
                        },
                        "systemTag": undefined,
                        "weight": 100,
                        "extra": {
                            "key": "value"
                        },
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
