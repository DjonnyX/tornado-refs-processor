import { ICompiledMenu, NodeTypes, SelectorTypes } from "@djonnyx/tornado-types";
import { M_ASSETS_DATA, M_CURRENCIES_DATA, M_LANGUAGES_DATA } from "../TestDataModifiersService";

export const MODIFIERS_MENU_REF: ICompiledMenu = {
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
            "type": NodeTypes.PRODUCT,
            "parentId": "n1",
            "parent": null,
            "content": {
                "id": "p1",
                "contents": {
                    [M_LANGUAGES_DATA[0].code]: {
                        "name": "product 1",
                        "description": "Lorem ipsum",
                        "color": "0xff00ff",
                        "resources": {
                            "main": M_ASSETS_DATA[0],
                            "icon": M_ASSETS_DATA[1]
                        },
                        "assets": [
                            M_ASSETS_DATA[0],
                            M_ASSETS_DATA[1]
                        ],
                        "gallery": []
                    },
                },
                "prices": {
                    "507c7f79bcf86cd7994f6c0e": {
                        "currency": M_CURRENCIES_DATA[0],
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
                    "children": [
                        {
                            "id": "j2",
                            "index": 1,
                            "active": true,
                            "type": NodeTypes.SELECTOR_JOINT,
                            "parentId": null,
                            "parent": null,
                            "content": {
                                "id": "s1",
                                "type": SelectorTypes.SCHEMA_CATEGORY,
                                "contents": {
                                    [M_LANGUAGES_DATA[0].code]: {
                                        "name": "Choose a product",
                                        "description": "",
                                        "color": "0xff00ff",
                                        "resources": {
                                            "main": M_ASSETS_DATA[0],
                                            "icon": M_ASSETS_DATA[1]
                                        },
                                        "assets": [
                                            M_ASSETS_DATA[0],
                                            M_ASSETS_DATA[1]
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
                                    "id": "np1",
                                    "index": 2,
                                    "active": true,
                                    "type": NodeTypes.PRODUCT,
                                    "parentId": "j2",
                                    "parent": null,
                                    "content": {
                                        "id": "p2",
                                        "contents": {
                                            [M_LANGUAGES_DATA[0].code]: {
                                                "name": "modifier",
                                                "description": "",
                                                "color": "0xff00ff",
                                                "resources": {
                                                    "main": M_ASSETS_DATA[0],
                                                    "icon": M_ASSETS_DATA[1]
                                                },
                                                "assets": [
                                                    M_ASSETS_DATA[0],
                                                    M_ASSETS_DATA[1]
                                                ],
                                                "gallery": []
                                            },
                                        },
                                        "prices": {
                                            "507c7f79bcf86cd7994f6c0e": {
                                                "currency": M_CURRENCIES_DATA[0],
                                                "value": 10000
                                            }
                                        },
                                        "tags": [],
                                        "minPrices": {},
                                        "structure": undefined,
                                        "systemTag": undefined,
                                        "weight": 100,
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
                            },
                        }
                    ],
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
        },
        {
            "id": "n3",
            "index": 2,
            "active": true,
            "type": NodeTypes.PRODUCT,
            "parentId": "n1",
            "parent": null,
            "content": {
                "id": "p3",
                "contents": {
                    [M_LANGUAGES_DATA[0].code]: {
                        "name": "product 3",
                        "description": "Lorem ipsum",
                        "color": "0xff00ff",
                        "resources": {
                            "main": M_ASSETS_DATA[0],
                            "icon": M_ASSETS_DATA[1]
                        },
                        "assets": [
                            M_ASSETS_DATA[0],
                            M_ASSETS_DATA[1]
                        ],
                        "gallery": []
                    },
                },
                "prices": {
                    "507c7f79bcf86cd7994f6c0e": {
                        "currency": M_CURRENCIES_DATA[0],
                        "value": 10000
                    }
                },
                "tags": [],
                "minPrices": {},
                "structure": {
                    "id": "j3",
                    "index": 0,
                    "active": true,
                    "type": NodeTypes.PRODUCT_JOINT,
                    "parentId": null,
                    "parent": null,
                    "content": null,
                    "children": [
                        {
                            "id": "j2",
                            "index": 1,
                            "active": true,
                            "type": NodeTypes.SELECTOR_JOINT,
                            "parentId": null,
                            "parent": null,
                            "content": {
                                "id": "s1",
                                "type": SelectorTypes.SCHEMA_CATEGORY,
                                "contents": {
                                    [M_LANGUAGES_DATA[0].code]: {
                                        "name": "Choose a product",
                                        "description": "",
                                        "color": "0xff00ff",
                                        "resources": {
                                            "main": M_ASSETS_DATA[0],
                                            "icon": M_ASSETS_DATA[1]
                                        },
                                        "assets": [
                                            M_ASSETS_DATA[0],
                                            M_ASSETS_DATA[1]
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
                                    "id": "np1",
                                    "index": 2,
                                    "active": true,
                                    "type": NodeTypes.PRODUCT,
                                    "parentId": "j2",
                                    "parent": null,
                                    "content": {
                                        "id": "p2",
                                        "contents": {
                                            [M_LANGUAGES_DATA[0].code]: {
                                                "name": "modifier",
                                                "description": "",
                                                "color": "0xff00ff",
                                                "resources": {
                                                    "main": M_ASSETS_DATA[0],
                                                    "icon": M_ASSETS_DATA[1]
                                                },
                                                "assets": [
                                                    M_ASSETS_DATA[0],
                                                    M_ASSETS_DATA[1]
                                                ],
                                                "gallery": []
                                            },
                                        },
                                        "prices": {
                                            "507c7f79bcf86cd7994f6c0e": {
                                                "currency": M_CURRENCIES_DATA[0],
                                                "value": 10000
                                            }
                                        },
                                        "tags": [],
                                        "minPrices": {},
                                        "structure": undefined,
                                        "systemTag": undefined,
                                        "weight": 100,
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
                            },
                        }
                    ],
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
};
