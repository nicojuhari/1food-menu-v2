import { createMenuHTML } from "./templates";
import { events } from "./events";
import {
    deepMerge,
    isBrowser,
    productsByCategory,
    prepareLayout,
    addCreditsOnPage,
} from "./helpers";
import { addAllergensOnPage } from "./allergensTemplate";


export function createMenu (menu = {}, clientConfigs = {}) {
    
    // tests if global scope is bound to window
    if (!isBrowser()) return;

    const oneFoodMenuNode = document.getElementById("OneFoodMenu");

    //validate
    if (oneFoodMenuNode == null) return;

    //from old version, when was passed one argument
    if (arguments?.length == 1) {
        clientConfigs = menu;
        menu = menu?.menu;
        //delete the menu property from the clientConfigs object
        delete clientConfigs.menu;
    }

    let configs = {
        version: 1,
        priceSymbol: "",
        allergens: {
            title: "Allergens",
            show: true,
        },
        ...menu?.configs,
    };

    //deep merge the configs with the client configs
    configs = deepMerge(configs, clientConfigs);

    if (
        Object.entries(menu).length == 0 ||
        menu?.products?.length == 0 ||
        menu?.categories?.length == 0
    ) return;

    //create global object with all the data
    window.__OneFoodMenu__ = {
        configs,
        products: menu.products,
        categories: menu.categories,
        allergens: menu?.allergens || null,
        nodes: {
            menuMain: oneFoodMenuNode,
        }
    };

    prepareLayout(oneFoodMenuNode);

    let menuHTML = "";

    let { groupedProducts, filteredCategories } = productsByCategory(menu);

    menuHTML = createMenuHTML({
        categories: filteredCategories,
        products: groupedProducts,
    });

    //add products
    window.__OneFoodMenu__.nodes.menuItems.innerHTML = menuHTML;

    //add allergens
    if (menu.allergens?.length && configs.allergens.show) {
        addAllergensOnPage(menu.allergens);
    }

    //add credits
    if (!configs.disableCredits) {
        addCreditsOnPage(window.__OneFoodMenu__.nodes.menuCredits);
    }

    //add events
    events();
};

