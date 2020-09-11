import { expect } from 'chai';
import * as fs from "fs";
import { TestDataService, NODES_DATA, SELECTORS_DATA, PRODUCTS_DATA, TAGS_DATA, ASSETS_DATA, LANGUAGES_DATA, TRANSLATIONS_DATA, STORES_DATA, TERMINALS_DATA, BUSINESS_PERIODS_DATA, ORDER_TYPES_DATA, CURRENCIES_DATA, ADS_DATA } from "./TestDataService";
import { RefBuilder } from "../src/RefBuilder";
import { DataCombiner } from "../src/DataCombiner";
import { take } from 'rxjs/operators';
import { IAsset } from '@djonnyx/tornado-types';
import { of } from 'rxjs';

describe('RefBuilder', () => {
    it('should return valid refs', async () => {
        const service = new TestDataService();
        const refBuilder = new RefBuilder(service);

        const refs = await new Promise((resolve, reject) => {
            refBuilder.onChange.pipe(
                take(1),
            ).subscribe(refs => {

                fs.writeFileSync("output/refs.json", JSON.stringify(refs));

                resolve(refs);
            }, err => {
                reject(err);
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

describe('DataCombiner', () => {
    it('should return valid refs', async () => {
        const data = await new Promise((resolve, reject) => {
            const service = new TestDataService();
            const dataCombiner = new DataCombiner({
                assetsTransformer: (assets: Array<IAsset>) => {
                    return of(assets);
                },
                dataService: service,
                updateTimeout: 99999999,
            });

            dataCombiner.onChange.pipe(
                take(1),
            ).subscribe(
                data => {

                    fs.writeFileSync("output/compiledData.json", JSON.stringify(data));

                    resolve(data);
                },
                err => {
                    reject(err);
                }
            );

            dataCombiner.init();
        });

        expect(data).to.equal(data);
    });
});
