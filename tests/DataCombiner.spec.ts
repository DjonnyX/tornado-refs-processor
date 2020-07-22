import { expect } from 'chai';
import { TestDataService, NODES_DATA, SELECTORS_DATA, PRODUCTS_DATA, TAGS_DATA, ASSETS_DATA } from "./TestDataService";
import { RefBuilder } from "../src/RefBuilder";

describe('Data combiner', () => {
    it('should return hello world', () => {
        const service = new TestDataService();
        const refBuilder = new RefBuilder(service);
        refBuilder.onChange.subscribe(refs => {
            expect(refs).to.equal({
                nodes: NODES_DATA,
                products: PRODUCTS_DATA,
                selectors: SELECTORS_DATA,
                tags: TAGS_DATA,
                assets: ASSETS_DATA,
            });
        });
    });
});