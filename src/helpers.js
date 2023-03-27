export function isBrowser() {
    return typeof window !== "undefined";
}

export function mergeDeep(obj1, obj2) {
    let result = Object.assign({}, obj1);
    for (let key in obj2) {
        if (typeof obj2[key] === "object" && obj2[key] !== null) {
            if (!(key in obj1)) {
                result[key] = obj2[key];
            } else {
                result[key] = mergeDeep(obj1[key], obj2[key]);
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
