import { deepMergeObjects } from "./object";
import { normalizeEntityContents } from "./entity";
import { IAsset, ILanguage } from "@djonnyx/tornado-types";

export const getCompiledContents = (entity: any, languages: Array<ILanguage>, assetsDictionary: { [id: string]: IAsset }) => {
    const contents = {};
    for (const lang in entity.contents) {
        // переопределение контента для разных языков
        contents[lang] = lang === this._defaultLanguage.code ? entity.contents[lang] : deepMergeObjects(entity.contents[this._defaultLanguage.code], entity.contents[lang]);
    }

    // добовление контента языков которых нет в базе
    for (const lang of languages) {
        if (contents[lang.code]) {
            continue;
        }

        contents[lang.code] = entity.contents[this._defaultLanguage.code];
    }

    normalizeEntityContents(contents, this._defaultLanguage.code);

    for (const lang in contents) {

        // нормализация ассетов
        if (!!contents[lang].assets) {
            const normalizedAssets = new Array<IAsset>();
            for (const assetId of contents[lang].assets) {
                if (assetsDictionary[assetId]) {
                    normalizedAssets.push(assetsDictionary[assetId]);
                }
            }
            contents[lang].assets = normalizedAssets;
        }

        // нормализация галереи ресурсов
        if (!!contents[lang].gallery) {
            const normalizedGallery = new Array<IAsset>();
            for (const assetId of contents[lang].assets) {
                if (assetsDictionary[assetId]) {
                    normalizedGallery.push(assetsDictionary[assetId]);
                }
            }
            contents[lang].assets = normalizedGallery;
        }

        // нормализация ресурсов
        if (!!contents[lang].resources) {
            const normalizedResources = new Array<IAsset>();
            for (const resourceType in contents[lang].resources) {
                if (assetsDictionary[contents[lang].resources[resourceType]]) {
                    normalizedResources[resourceType] = assetsDictionary[contents[lang].resources[resourceType]];
                }
            }
            contents[lang].resources = normalizedResources;
        }
    }

    return contents;
}