import { getLabel } from "./helpers";

export const createAllergensHTML = ({ prodAllergens = [], location = 'node' }) => {
    const allergensList = window.__OneFoodMenu__.allergens || [];
    const allergensMap = new Map(allergensList.map((allergen) => [allergen.uid, allergen]));

    // Shared tabs HTML structure
    const createTabsHTML = (allergens) => `
        <div class="ofm-allergens__tabs flex ${ location === 'modal' ? ' ofm-collapsible-content' : '' }">
            ${allergens.map((allergen) => `
                <div class="ofm-allergens__tab flex items-center">
                    <div class="allergen-name">${allergen?.name}</div>
                    <div class="allergen-description">${allergen?.description}</div>   
                </div>
            `).join("")}
        </div>
    `;

    if (location === "node") {
        return `
            <h3 class="ofm-allergens__title">${getLabel("allergens")}</h3>
            ${createTabsHTML(allergensList)}
        `;
    }

    if (!prodAllergens?.length) return "";

    if (location === 'modal') {
        // Filter allergens list to only show relevant ones for this product
        const productAllergens = allergensList.filter(allergen => 
            prodAllergens.includes(allergen.uid)
        );

        return createTabsHTML(productAllergens);
    }

    if(location === 'product') {
        return prodAllergens
            .map((allergenId) => {
                const allergen = allergensMap.get(allergenId);
                if (!allergen) return "";
                return `<div data-prod-allergen class="ofm-tag ofm-tag-allergen">${allergen.name}</div>`;
            })
            .filter(Boolean)
            .join("");
    }
};