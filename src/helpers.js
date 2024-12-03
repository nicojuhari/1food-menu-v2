export function isBrowser() {
    return typeof window !== "undefined";
}

export function deepMerge(obj1, obj2) {
    let result = Object.assign({}, obj1);
    for (let key in obj2) {
        if (typeof obj2[key] === "object" && obj2[key] !== null) {
            if (!(key in obj1)) {
                result[key] = obj2[key];
            } else {
                result[key] = deepMerge(obj1[key], obj2[key]);
            }
        } else {
            result[key] = obj2[key];
        }
    }
    return result;
}

export function mountOnPage(nodeEl, html = '') { nodeEl.innerHTML = html };

export function productsByCategory(menu) {
    let groupedProducts = {};
    let filteredCategories = [];

    //check if the category has products

    menu.categories.forEach((category) => {
        //this should run only once for each category
        if (!groupedProducts?.[category.uid]) {
            groupedProducts[category.uid] = [];
        }

        groupedProducts[category.uid] = [
            ...menu.products.filter((p) => p.categoryId === category.uid),
        ];

        if (groupedProducts[category.uid].length) filteredCategories.push(category);
    });

    return { groupedProducts, filteredCategories };
};

export function addCreditsOnPage(nodeEl) {
    //check if the nodeEl is a valid element
    if (nodeEl && nodeEl.innerHTML === "") {
        nodeEl.innerHTML = `<div class="ofm-credits">Created with <strong><a href="https://1food.menu?ref=free-menu-designs" target="_blank">1Food Menu</a></strong></div>`;
    }
}

export function prepareLayout(oneFoodMenuNode) {
    //clean the main node
    oneFoodMenuNode.innerHTML = "";

    oneFoodMenuNode.classList.add("one-food-menu");

    let nodes = ["Items", "Allergens", "Credits", "Modal"];

    nodes.forEach((node) => {
        let nodeEl = document.createElement("div");
        nodeEl.id = `OneFoodMenu${node}`;
        window.__OneFoodMenu__.nodes["menu" + node] = nodeEl;

        oneFoodMenuNode.appendChild(nodeEl);
    });
};
