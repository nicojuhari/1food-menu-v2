import { createMenuHTML } from "./templates";
import { events } from "./events";
import { mergeDeep, isBrowser, mountOnPage, productsByCategory, toggleDesignClass } from "./helpers";
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
            description: "Some description about allergens",
        },
        ...menu.configs,
    };

    //deep merge the configs with the client configs
    configs = mergeDeep(configs, clientConfigs);

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

    mountOnPage(window.__OneFoodMenu__.nodes.menuItems, menuHTML);

    //add allergens
    if (menu.allergens?.length) {
        addAllergensOnPage(menu.allergens);
    }

    events();
};

const prepareLayout = (oneFoodMenuNode) => {
    //clean the main node
    oneFoodMenuNode.innerHTML = "";

    oneFoodMenuNode.classList.add("one-food-menu")

    //ofm-design-v2 | v3, ...
    toggleDesignClass(oneFoodMenuNode, window.__OneFoodMenu__.configs.version);

    let nodes = ["Items", "Allergens", "Credits", "Modal"];

    nodes.forEach((node) => {
        let nodeEl = document.createElement("div");
        nodeEl.id = `OneFoodMenu${node}`;
        window.__OneFoodMenu__.nodes["menu" + node] = nodeEl;

        if (node == "Credits") {
            nodeEl.innerHTML = `<div class="ofm-credits">Created with <strong><a href="https://apps.nicojuhari.com/free-menu-maker?ref=free-menu-template" target="_blank">Free Menu Maker</a></strong></div>`;
        }

        oneFoodMenuNode.appendChild(nodeEl);
    });
};