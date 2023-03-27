export function addAllergensOnPage (allergens) {

    let title = window.__OneFoodMenu__.configs.allergens.title;

    let allergensHTML = `<div class="menu-allergens my-10">
                            <h3 class="text-2xl font-bold text-center my-6">${title}</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">`;

    allergens.forEach((allergen) => {
        allergensHTML += `  <div class="flex py-2 gap-x-4 items-center">
                                <div class="overflow-hidden truncate flex-shrink-0 w-12 h-12 grid place-content-center bg-slate-200 rounded-full border-2 border-slate-400 font-medium text-slate-500">${allergen.name}</div>
                                <div>${allergen.description}</div>
                            </div>`;
    });

    allergensHTML += `</div></div>`;

    window.__OneFoodMenu__.nodes.menuAllergens.innerHTML = allergensHTML;
};
