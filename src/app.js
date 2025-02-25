import { createMenuHTML } from "./templates";
import { events } from "./events";
import {
    deepMerge,
    isBrowser,
    productsByCategory,
    getNotEmptyCategories,
    prepareLayout,
    addCreditsOnPage,
} from "./helpers";
import { addAllergensOnPage } from "./allergensTemplate";

export function createMenu(menuInput = {}, clientConfigsInput = {}) {
    // Early validation checks combined
    if (!isBrowser() || 
        !document.getElementById("OneFoodMenu")) {
        return;
    }

    // Handle legacy single argument case
    let menu = menuInput;
    let clientConfigs = clientConfigsInput;
    
    if (arguments.length === 1) {
        clientConfigs = menuInput;
        menu = menuInput?.menu ?? {};
        delete clientConfigs.menu;
    }

    // Validate menu data
    if (!menu?.products?.length || !menu?.categories?.length) {
        return;
    }

    // Default configs with spread
    const configs = deepMerge({
        version: 1,
        priceSymbol: "",
        allergens: {
            title: "Allergens",
            show: true,
        }
    }, clientConfigs);

    // Create global object with Object.freeze for immutability
    const menuNode = document.getElementById("OneFoodMenu");
    window.__OneFoodMenu__ = Object.freeze({
        configs,
        products: menu.products,
        categories: menu.categories,
        allergens: menu?.allergens ?? null,
        nodes: {
            menuMain: menuNode,
        }
    });

    // Prepare layout
    prepareLayout(menuNode);

    // Generate menu HTML
    const menuHTML = createMenuHTML({
        categories: getNotEmptyCategories(menu.categories, menu.products),
        products: productsByCategory(menu),
    });

    // Update DOM
    window.__OneFoodMenu__.nodes.menuItems.innerHTML = menuHTML;

    // Conditional rendering of allergens and credits
    if (menu.allergens?.length && configs.allergens.show) {
        addAllergensOnPage(menu.allergens);
    }

    if (!configs.disableCredits) {
        addCreditsOnPage(window.__OneFoodMenu__.nodes.menuCredits);
    }

    // Initialize events
    events();
}

