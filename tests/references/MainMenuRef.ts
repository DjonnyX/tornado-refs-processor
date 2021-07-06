import { ICompiledMenu, NodeTypes, SelectorTypes } from "@djonnyx/tornado-types";
import { ASSETS_DATA, CURRENCIES_DATA, LANGUAGES_DATA, SYSTEM_TAGS_DATA } from "../TestDataSimpleMenuService";

export const MAIN_MENU_REF: ICompiledMenu = {
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
                    [LANGUAGES_DATA[0].code]: {
                        "name": "selector 1",
                        "description": "",
                        "color": "0xff00ff",
                        "resources": {
                            "main": ASSETS_DATA[0],
                            "icon": ASSETS_DATA[1]
                        },
                        "assets": [
                            ASSETS_DATA[0],
                            ASSETS_DATA[1]
                        ]
                    },
                    [LANGUAGES_DATA[1].code]: {
                        "name": "selector 1",
                        "description": "",
                        "color": "0xff00ff",
                        "resources": {
                            "main": ASSETS_DATA[0],
                            "icon": ASSETS_DATA[1]
                        },
                        "assets": [
                            ASSETS_DATA[0],
                            ASSETS_DATA[1]
                        ]
                    }
                },
                "minPrices": {},
                "extra": {
                    "key": "value"
                }
            },
            "children": [{
                "id": "n3",
                "index": 2,
                "active": true,
                "type": NodeTypes.PRODUCT,
                "parentId": "n2",
                "parent": null,
                "content": {
                    "id": "p1",
                    "contents": {
                        [LANGUAGES_DATA[0].code]: {
                            "name": "product 1",
                            "description": "Lorem ipsum",
                            "color": "0xff00ff",
                            "resources": {
                                "main": ASSETS_DATA[0],
                                "icon": ASSETS_DATA[1]
                            },
                            "assets": [
                                ASSETS_DATA[0],
                                ASSETS_DATA[1]
                            ],
                            "gallery": []
                        },
                        [LANGUAGES_DATA[1].code]: {
                            "name": "Продукт 1",
                            "description": "Lorem ipsum",
                            "color": "0x000000",
                            "resources": {
                                "main": ASSETS_DATA[0],
                                "icon": ASSETS_DATA[1]
                            },
                            "assets": [
                                ASSETS_DATA[0],
                                ASSETS_DATA[1]
                            ],
                            "gallery": []
                        }
                    },
                    "prices": {
                        "507c7f79bcf86cd7994f6c0e": {
                            "currency": CURRENCIES_DATA[0],
                            "value": 10000
                        }
                    },
                    "tags": [
                        {
                            "id": "t1",
                            "contents": {
                                [LANGUAGES_DATA[0].code]: {
                                    "name": "tag 1",
                                    "description": "",
                                    "color": "0xff00ff",
                                    "resources": {
                                        "main": ASSETS_DATA[0],
                                        "icon": ASSETS_DATA[1]
                                    },
                                    "assets": [
                                        ASSETS_DATA[0],
                                        ASSETS_DATA[1]
                                    ]
                                },
                                [LANGUAGES_DATA[1].code]: {
                                    "name": "tag 1",
                                    "description": "",
                                    "color": "0xff00ff",
                                    "resources": {
                                        "main": ASSETS_DATA[0],
                                        "icon": ASSETS_DATA[1]
                                    },
                                    "assets": [
                                        ASSETS_DATA[0],
                                        ASSETS_DATA[1]
                                    ]
                                }
                            },
                            "extra": {
                                "key": "value"
                            }
                        },
                        {
                            "id": "t2",
                            "contents": {
                                [LANGUAGES_DATA[0].code]: {
                                    "name": "tag 2",
                                    "description": "",
                                    "color": "0xef0000",
                                    "resources": {
                                        "main": ASSETS_DATA[0],
                                        "icon": ASSETS_DATA[1]
                                    },
                                    "assets": [
                                        ASSETS_DATA[0],
                                        ASSETS_DATA[1]
                                    ]
                                },
                                [LANGUAGES_DATA[1].code]: {
                                    "name": "tag 2",
                                    "description": "",
                                    "color": "0xef0000",
                                    "resources": {
                                        "main": ASSETS_DATA[0],
                                        "icon": ASSETS_DATA[1]
                                    },
                                    "assets": [
                                        ASSETS_DATA[0],
                                        ASSETS_DATA[1]
                                    ]
                                }
                            },
                            "extra": {
                                "key": "value"
                            }
                        }
                    ],
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
                                "type": NodeTypes.SELECTOR,
                                "parentId": "j1",
                                "parent": null,
                                "content": {
                                    "id": "sm1",
                                    "type": SelectorTypes.SCHEMA_CATEGORY,
                                    "contents": {
                                        [LANGUAGES_DATA[0].code]: {
                                            "name": "Choose a product",
                                            "description": "",
                                            "color": "0xff00ff",
                                            "resources": {
                                                "main": ASSETS_DATA[0],
                                                "icon": ASSETS_DATA[1]
                                            },
                                            "assets": [
                                                ASSETS_DATA[0],
                                                ASSETS_DATA[1]
                                            ]
                                        },
                                        [LANGUAGES_DATA[1].code]: {
                                            "name": "Choose a product",
                                            "description": "",
                                            "color": "0xff00ff",
                                            "resources": {
                                                "main": ASSETS_DATA[0],
                                                "icon": ASSETS_DATA[1]
                                            },
                                            "assets": [
                                                ASSETS_DATA[0],
                                                ASSETS_DATA[1]
                                            ]
                                        }
                                    },
                                    "minPrices": {},
                                    "extra": {
                                        "key": "value"
                                    }
                                },
                                "children": [
                                    {
                                        "id": "j3",
                                        "index": 2,
                                        "active": true,
                                        "type": NodeTypes.PRODUCT,
                                        "parentId": "j2",
                                        "parent": null,
                                        "content": {
                                            "id": "p3",
                                            "contents": {
                                                [LANGUAGES_DATA[0].code]: {
                                                    "name": "modifier",
                                                    "description": "",
                                                    "color": "0xff00ff",
                                                    "resources": {
                                                        "main": ASSETS_DATA[2],
                                                        "icon": ASSETS_DATA[1]
                                                    },
                                                    "assets": [
                                                        ASSETS_DATA[2],
                                                        ASSETS_DATA[1]
                                                    ],
                                                    "gallery": []
                                                },
                                                [LANGUAGES_DATA[1].code]: {
                                                    "name": "modifier",
                                                    "description": "",
                                                    "color": "0xff00ff",
                                                    "resources": {
                                                        "main": ASSETS_DATA[2],
                                                        "icon": ASSETS_DATA[1]
                                                    },
                                                    "assets": [
                                                        ASSETS_DATA[2],
                                                        ASSETS_DATA[1]
                                                    ],
                                                    "gallery": []
                                                }
                                            },
                                            "prices": {
                                                "507c7f79bcf86cd7994f6c0e": {
                                                    "currency": CURRENCIES_DATA[0],
                                                    "value": 10000
                                                }
                                            },
                                            "tags": [
                                                {
                                                    "id": "t3",
                                                    "contents": {
                                                        [LANGUAGES_DATA[0].code]: {
                                                            "name": "tag 3",
                                                            "description": "",
                                                            "color": "0x000000",
                                                            "resources": {
                                                                "main": ASSETS_DATA[0],
                                                                "icon": ASSETS_DATA[1]
                                                            },
                                                            "assets": [
                                                                ASSETS_DATA[0],
                                                                ASSETS_DATA[1]
                                                            ]
                                                        },
                                                        [LANGUAGES_DATA[1].code]: {
                                                            "name": "tag 3",
                                                            "description": "",
                                                            "color": "0x000000",
                                                            "resources": {
                                                                "main": ASSETS_DATA[0],
                                                                "icon": ASSETS_DATA[1]
                                                            },
                                                            "assets": [
                                                                ASSETS_DATA[0],
                                                                ASSETS_DATA[1]
                                                            ]
                                                        }
                                                    },
                                                    "extra": {
                                                        "key": "value"
                                                    }
                                                }
                                            ],
                                            "minPrices": {},
                                            "structure": undefined,
                                            "weight": 100,
                                            "systemTag": SYSTEM_TAGS_DATA[0],
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
                    "weight": 100,
                    "systemTag": SYSTEM_TAGS_DATA[0],
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
                "id": "n4",
                "index": 3,
                "active": true,
                "type": NodeTypes.PRODUCT,
                "parentId": "n2",
                "parent": null,
                "content": {
                    "id": "p2",
                    "contents": {
                        [LANGUAGES_DATA[0].code]: {
                            "name": "product 2",
                            "description": "",
                            "color": "0xff00ff",
                            "resources": {
                                "main": ASSETS_DATA[2],
                                "icon": ASSETS_DATA[1]
                            },
                            "assets": [
                                ASSETS_DATA[2],
                                ASSETS_DATA[1]
                            ],
                            "gallery": []
                        },
                        [LANGUAGES_DATA[1].code]: {
                            "name": "product 2",
                            "description": "",
                            "color": "0xff00ff",
                            "resources": {
                                "main": ASSETS_DATA[2],
                                "icon": ASSETS_DATA[1]
                            },
                            "assets": [
                                ASSETS_DATA[2],
                                ASSETS_DATA[1]
                            ],
                            "gallery": []
                        }
                    },
                    "prices": {
                        "507c7f79bcf86cd7994f6c0e": {
                            "currency": CURRENCIES_DATA[0],
                            "value": 10000
                        }
                    },
                    "tags": [
                        {
                            "id": "t3",
                            "contents": {
                                [LANGUAGES_DATA[0].code]: {
                                    "name": "tag 3",
                                    "description": "",
                                    "color": "0x000000",
                                    "resources": {
                                        "main": ASSETS_DATA[0],
                                        "icon": ASSETS_DATA[1]
                                    },
                                    "assets": [
                                        ASSETS_DATA[0],
                                        ASSETS_DATA[1]
                                    ]
                                },
                                [LANGUAGES_DATA[1].code]: {
                                    "name": "tag 3",
                                    "description": "",
                                    "color": "0x000000",
                                    "resources": {
                                        "main": ASSETS_DATA[0],
                                        "icon": ASSETS_DATA[1]
                                    },
                                    "assets": [
                                        ASSETS_DATA[0],
                                        ASSETS_DATA[1]
                                    ]
                                }
                            },
                            "extra": {
                                "key": "value"
                            }
                        }
                    ],
                    "minPrices": {},
                    "structure": undefined,
                    "weight": 100,
                    "systemTag": SYSTEM_TAGS_DATA[0],
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
            }
        }
    ],
    "scenarios": [],
    "extra": {
        "key": "value"
    }
};
