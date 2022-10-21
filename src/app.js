import { createMenuHTML } from "./templates";
import { events } from "./events";


export const createMenu = ({ menu, version = 1, priceSymbol = "", }) => {
    // tests if global scope is bound to window
    if (!isBrowser()) return;

    const oneFoodMenuNode = document.getElementById("OneFoodMenu");

    //validate
    if (oneFoodMenuNode == null) return;
    if (
        Object.entries(menu).length == 0 ||
        menu?.products?.length == 0 ||
        menu?.categories?.length == 0
    )
        return;

    //create global object with all the data
    window.__OneFoodMenuData__ = {
        products: menu.products,
        categories: menu.categories,
        version,
        priceSymbol,
    };

    prepareLayout(oneFoodMenuNode, version);

    let groupedProducts = [];
    let menuHTML = "";

    groupedProducts = productsByCategory(menu);
    menuHTML = createMenuHTML({ menu, categories: groupedProducts, version, priceSymbol });
    mountOnPage(menuHTML);

    events();
};

const prepareLayout = (oneFoodMenuNode, version) => {
    //clean the block
    oneFoodMenuNode.innerHTML = "";

    //menuBlock
    let oneFoodMenuBlock = document.createElement("div");
    oneFoodMenuBlock.id = "OneFoodMenuBlock";
    oneFoodMenuNode.appendChild(oneFoodMenuBlock);

    window.__OneFoodMenuData__.oneFoodMenuBlock = oneFoodMenuBlock;

    //menuModal
    if ([1, 2].includes(version)) {
        //create new
        let modalDiv = document.createElement("div");
        modalDiv.id = "OneFoodMenuModal";
        oneFoodMenuNode.appendChild(modalDiv);
        window.__OneFoodMenuData__.oneFoodMenuModal = modalDiv;
    }

    //menuCredit
    let creditDiv = document.createElement("div");
    creditDiv.id = "OneFoodMenuCredit";
    creditDiv.innerHTML = `<div class="p-4 text-center">Created by <strong><a href="https://1food.menu/?ref=1fm-free-templates" target="blank">OneFoodMenu</a></strong></div>`;
    oneFoodMenuNode.appendChild(creditDiv);
};

const productsByCategory = (menu) => {
    let groupedProducts = {};

    menu.products.forEach((product) => {
        if (!groupedProducts?.[product?.categoryId]) {
            groupedProducts[product.categoryId] = [];
        }
        groupedProducts[product.categoryId].push(product);
    });

    return groupedProducts;
};

const mountOnPage = (html) => (window.__OneFoodMenuData__.oneFoodMenuBlock.innerHTML = html);

function isBrowser() {
    return typeof window !== "undefined";
};
