import { expect } from 'chai';
import { TestDataService, NODES_DATA, SELECTORS_DATA, PRODUCTS_DATA, TAGS_DATA, ASSETS_DATA } from "./TestDataService";
import { RefBuilder } from "../src/RefBuilder";

describe('RefBuilder', () => {
    it('should return valid refs', () => {
        const service = new TestDataService();
        const refBuilder = new RefBuilder(service);
        refBuilder.onChange.subscribe(refs => {
            expect(JSON.stringify(refs)).to.equal(JSON.stringify({
                nodes: NODES_DATA,
                products: PRODUCTS_DATA,
                selectors: SELECTORS_DATA,
                tags: TAGS_DATA,
                assets: ASSETS_DATA,
            }));
        });
    });
});