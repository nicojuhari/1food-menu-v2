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
import { createCategoryTabsHTML } from './template-helpers';

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
            features: {
                categoryTabs: true, // Enable/disable category filtering tabs
                allergens: true, // Enable/disable allergens section
                credits: true, // Enable/disable credits
                search: true, // Future feature
                tagFilters: true, // Future feature
                productModal: true, // Enable/disable product modal
            },
        },
        clientConfigs
    );

    // Create nodes object first
    const menuNode = document.getElementById("OneFoodMenu");
    const nodes = { menuMain: menuNode };

    window.__OneFoodMenu__ = {
        configs,
        products: filteredProducts,
        categories: filteredCategories,
        allergens: menu.allergens ?? null,
        nodes, // Initialize with empty nodes object
    };

    // Prepare layout
    prepareLayout(menuNode);

    window.__OneFoodMenu__ = Object.freeze(window.__OneFoodMenu__);

    const cleanCategories = getNotEmptyCategories(filteredCategories, filteredProducts);

    // Generate menu HTML
    const menuHTML = createMenuHTML({
        categories: cleanCategories,
        products: productsByCategory(filteredProducts),
    });

    // Update DOM
    window.__OneFoodMenu__.nodes.menuItems.innerHTML = menuHTML;

    //add category tabs on the page
    if (configs.features.categoryTabs) {
        const categoryTabsHTML = createCategoryTabsHTML(filteredCategories);
        window.__OneFoodMenu__.nodes.menuControls.innerHTML = categoryTabsHTML;
    }

    // Conditional rendering of allergens
    if (configs.features.allergens) {
        addAllergensOnPage(menu.allergens);
    }

    // Conditional rendering of credits
    if (configs.features.credits) {
        addCreditsOnPage(window.__OneFoodMenu__.nodes.menuCredits);
    }

    // Initialize events
    events();
}

