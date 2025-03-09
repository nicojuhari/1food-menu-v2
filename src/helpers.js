export function isBrowser() {
    return typeof window !== "undefined";
}

export function deepMerge(target, source) {
    // Handle null/undefined and non-object cases
    if (!source || typeof source !== "object") return source;
    if (!target || typeof target !== "object") return { ...source };

    // Handle arrays
    if (Array.isArray(source)) {
        return Array.isArray(target) ? [...target, ...source] : [...source];
    }

    // Create new object to avoid mutations
    const result = { ...target };

    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            result[key] = deepMerge(target[key], source[key]);
        }
    }

    return result;
}

export function productsByCategory(products) {

    // Return empty object for invalid input
    if (!Array.isArray(products) || !products.length) {
        return {};
    }

    // Create a map of products by categoryId for O(1) lookup
    return products.reduce((acc, product) => {
        if (!acc[product.categoryId]) {
            acc[product.categoryId] = [];
        }
        acc[product.categoryId].push(product);
        return acc;
    }, {});
};

export function getNotEmptyCategories(categories, products) {
    return categories.filter((category) =>
        products.some((product) => product.categoryId === category.uid)
    );
}

export function toggleDesignClass(nodeEl, versionNumber) {
    // Remove any existing design version class using regex pattern
    nodeEl.className = nodeEl.className.replace(/\bofm-design-v\d+\b/g, "").trim();

    // Add new design class
    nodeEl.classList.add(`ofm-design-v${versionNumber}`);
}

export function addCreditsOnPage(nodeEl) {
    // Validate node element
    if (!nodeEl || !(nodeEl instanceof Element) || nodeEl.innerHTML.trim()) {
        return;
    }

    const link = document.createElement("a");
    link.href = "https://1food.menu?ref=free-menu-designs";
    link.target = "_blank";
    link.textContent = "1Food Menu";

    nodeEl.textContent = "Created with ";
    const strong = document.createElement("strong");
    strong.appendChild(link);
    nodeEl.appendChild(strong);
}

export function prepareLayout(menuNode) {
    // Add default class and preserve any existing classes
    menuNode.classList.add("one-food-menu");

    // Apply design version
    toggleDesignClass(menuNode, window.__OneFoodMenu__?.configs?.version || 1);


    // Define menu sections with frozen object for immutability
    const sections = Object.freeze({
        controls: {
            id: "OneFoodMenuControls",
            className: "ofm-controls",
        },
        items: {
            id: "OneFoodMenuItems",
            className: "ofm-items",
        },
        allergens: {
            id: "OneFoodMenuAllergens",
            className: "ofm-allergens",
        },
        credits: {
            id: "OneFoodMenuCredits",
            className: "ofm-credits",
        },
        modal: {
            id: "OneFoodMenuModal",
            className: "ofm-modal",
        },
    });

    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();

    // Create nodes object to store references
    const nodes = { menuMain: menuNode };

    // Create all sections and store references
    Object.entries(sections).forEach(([key, { id, className }]) => {
        const element = document.createElement("div");
        element.id = id;
        element.className = className;

        // Store reference
        nodes[`menu${key.charAt(0).toUpperCase() + key.slice(1)}`] = element;

        fragment.appendChild(element);
    });

    // Clear and update menu node
    menuNode.innerHTML = "";
    menuNode.appendChild(fragment);

    // Update global nodes reference
    window.__OneFoodMenu__.nodes = nodes;
}


export function getLabel(key) {
    const configs = window.__OneFoodMenu__.configs;
    const userLabels = configs?.labels || {};

    const DEFAULT_LABELS = {
        outOfStock: "Currently Unavailable",
        allergens: "Allergens",
        categoryAll: 'All',
        // categories: "Categories",
        // price: "Price",
        // Add more default labels as needed
    };

    // Return user custom label if provided, otherwise return default
    return userLabels[key] || DEFAULT_LABELS?.[key] || '';
}
