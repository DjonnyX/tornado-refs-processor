import { deepMergeObjects } from "./object";
import { normalizeEntityContents } from "./entity";
import { IAsset, ILanguage } from "@djonnyx/tornado-types";

export const getCompiledContents = (contents: any, languages: Array<ILanguage>, defaultLanguage: ILanguage, assetsDictionary: { [id: string]: IAsset }) => {
    const result = {};
    for (const lang in contents) {
        // переопределение контента для разных языков
        result[lang] = lang === defaultLanguage.code ? {...contents[lang]} : deepMergeObjects(contents[this._defaultLanguage.code], contents[lang]);
    }

    // добовление контента языков которых нет в базе
    for (const lang of languages) {
        if (result[lang.code]) {
            continue;
        }

        result[lang.code] = {...contents[defaultLanguage.code]};
    }

    normalizeEntityContents(result, defaultLanguage.code);

    for (const lang in result) {

        // нормализация ассетов
        if (!!result[lang].assets) {
            const normalizedAssets = new Array<IAsset>();
            for (const assetId of result[lang].assets) {
                if (assetsDictionary[assetId]) {
                    normalizedAssets.push(assetsDictionary[assetId]);
                }
            }
            result[lang].assets = normalizedAssets;
        }

        // нормализация галереи ресурсов
        if (!!result[lang].gallery) {
            const normalizedGallery = new Array<IAsset>();
            for (const assetId of result[lang].gallery) {
                if (assetsDictionary[assetId]) {
                    normalizedGallery.push(assetsDictionary[assetId]);
                }
            }
            result[lang].gallery = normalizedGallery;
        }

        // нормализация ресурсов
        if (!!result[lang].resources) {
            const normalizedResources = {...result[lang].resources};
            for (const resourceType in result[lang].resources) {
                if (assetsDictionary[result[lang].resources[resourceType]]) {
                    normalizedResources[resourceType] = assetsDictionary[result[lang].resources[resourceType]];
                }
            }
            result[lang].resources = normalizedResources;
        }
    }

    return result;
}