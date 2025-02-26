import { getLabel } from "./helpers";
export function addAllergensOnPage (allergens) {

    let allergensHTML = `<div class="ofm-allergens">
                            <h3 class="ofm-allergens__title">${getLabel('allergens')}</h3>
                            <div class="ofm-allergens__items">`;

    allergens.forEach((allergen) => {
        allergensHTML += `  <div class="ofm-allergens__item">
                                <div class="ofm-allergens__name shrink-none">${allergen.name}</div>
                                <div class="ofm-allergens__desc ofm-line-clamp">${allergen.description}</div>
                            </div>`;
    });

    allergensHTML += `</div></div>`;

    window.__OneFoodMenu__.nodes.menuAllergens.innerHTML = allergensHTML;
};