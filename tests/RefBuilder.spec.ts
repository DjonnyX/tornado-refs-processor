import { expect } from 'chai';
import * as fs from "fs";
import {
    TestDataSimpleMenuService, NODES_DATA, SELECTORS_DATA, PRODUCTS_DATA, TAGS_DATA, ASSETS_DATA, LANGUAGES_DATA,
    TRANSLATIONS_DATA, STORES_DATA, TERMINALS_DATA, BUSINESS_PERIODS_DATA, ORDER_TYPES_DATA, CURRENCIES_DATA,
    ADS_DATA
} from "./TestDataSimpleMenuService";
import { RefBuilder } from "../src/RefBuilder";
import { take } from 'rxjs/operators';

describe('RefBuilder', () => {
    it('should return valid refs', async () => {
        const service = new TestDataSimpleMenuService();
        const refBuilder = new RefBuilder(service);

        const refs = await new Promise((resolve, reject) => {
            refBuilder.onChange.pipe(
                take(1),
            ).subscribe(refs => {

                fs.writeFileSync("output/refs.json", JSON.stringify(refs));

                refBuilder.dispose();

                resolve(refs);
            }, err => {
                reject(err);
            });
            
            refBuilder.onProgress.subscribe(progress => {
                console.log(progress);
            });

            refBuilder.get();
        });

        expect(JSON.stringify(refs)).to.equal(JSON.stringify({
            languages: LANGUAGES_DATA,
            translations: TRANSLATIONS_DATA,
            nodes: NODES_DATA,
            selectors: SELECTORS_DATA,
            products: PRODUCTS_DATA,
            tags: TAGS_DATA,
            assets: ASSETS_DATA,
            stores: STORES_DATA,
            terminals: TERMINALS_DATA,
            businessPeriods: BUSINESS_PERIODS_DATA,
            orderTypes: ORDER_TYPES_DATA,
            currencies: CURRENCIES_DATA,
            ads: ADS_DATA,
        }));
    });
});
