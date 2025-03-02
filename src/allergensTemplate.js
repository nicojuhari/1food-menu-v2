import { getLabel } from "./helpers";
export function addAllergensOnPage (allergens) {
    if (!allergens?.length) return "";

    let allergensHTML =  `
            <h3 class="ofm-allergens__title">${getLabel("allergens")}</h3>
            <div class="ofm-allergens__items">
                ${allergens
                    .map(
                        (allergen) => `
                    <div class="ofm-allergens__item">
                        <div class="name">${allergen.name}</div>
                        <div class="allergen-info">
                            ${
                                allergen.description
                                    ? `<div class="description">${allergen.description}</div>`
                                    : ""
                            }
                        </div>
                    </div>
                `
                    )
                    .join("")}
            </div>
    `;

    window.__OneFoodMenu__.nodes.menuAllergens.innerHTML = allergensHTML;
};