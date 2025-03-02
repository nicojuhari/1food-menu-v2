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

export function createMenu(menuInput = {}, clientConfigs = {}) {
    // Early validation checks combined
    if (!isBrowser() || !document.getElementById("OneFoodMenu")) {
        return;
    }

    const menu = {
        products: [],
        categories: [],
        allergens: [],
        ...menuInput,
    };

    // Filter out archived items before creating global object
    const filteredProducts = menu.products.filter((product) => product.isArchived !== true);
    const filteredCategories = menu.categories.filter((category) => category.isArchived !== true);

    // Validate menu data
    if (!filteredProducts.length || !filteredCategories.length) {
        return;
    }

    // Default configs with spread
    const configs = deepMerge(
        {
            version: 1,
            priceSymbol: "",
        },
        clientConfigs
    );

    // Create global object with Object.freeze for immutability
    const menuNode = document.getElementById("OneFoodMenu");
    window.__OneFoodMenu__ = Object.freeze({
        configs,
        products: filteredProducts,
        categories: filteredCategories,
        allergens: menu?.allergens ?? null,
        nodes: {
            menuMain: menuNode,
        },
    });

    // Prepare layout
    prepareLayout(menuNode);

    // Generate menu HTML
    const menuHTML = createMenuHTML({
        categories: getNotEmptyCategories(filteredCategories, filteredProducts),
        products: productsByCategory(filteredProducts),
    });

    // Update DOM
    window.__OneFoodMenu__.nodes.menuItems.innerHTML = menuHTML;

    // Conditional rendering of allergens and credits
    if (menu.allergens?.length) {
        addAllergensOnPage(menu.allergens);
    }

    if (!configs.disableCredits) {
        addCreditsOnPage(window.__OneFoodMenu__.nodes.menuCredits);
    }

    // Initialize events
    events();
}

