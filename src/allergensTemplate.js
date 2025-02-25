export function addAllergensOnPage (allergens) {

    let title = window.__OneFoodMenu__.configs.allergens.title;

    let allergensHTML = `<div class="ofm-allergens">
                            <h3 class="ofm-allergens__title">${title}</h3>
                            <div class="ofm-allergens__items">`;

    allergens.forEach((allergen) => {
        allergensHTML += `  <div class="ofm-allergens__item">
                                <div class="ofm-allergens__name shrink-none">${allergen.name}</div>
                                <div class="ofm-allergens__desc line-clamp-1">${allergen.description}</div>
                            </div>`;
    });

    allergensHTML += `</div></div>`;

    window.__OneFoodMenu__.nodes.menuAllergens.innerHTML = allergensHTML;
};
