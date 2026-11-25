
            
            /** @typedef {() => Promise<import("wuchale/runtime").CatalogModule>} CatalogMod */
            /** @type {{[locale: string]: CatalogMod[]}} */
            const catalogs = {fr: [() => import('./main.0.fr.compiled.js')],en: [() => import('./main.0.en.compiled.js')],es: [() => import('./main.0.es.compiled.js')],ln: [() => import('./main.0.ln.compiled.js')]}
            export const loadCatalog = (/** @type {number} */ loadID, /** @type {string} */ locale) => {
                return /** @type {CatalogMod} */ (/** @type {CatalogMod[]} */ (catalogs[locale])[loadID])()
            }
            export const loadCount = 1
            // not essential. in case it is needed and for debugging
            export const patterns = ["main"]
        