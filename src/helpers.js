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

    const credits = document.createElement("div");
    credits.className = "ofm-credits";

    const link = document.createElement("a");
    link.href = "https://1food.menu?ref=free-menu-designs";
    link.target = "_blank";
    link.textContent = "1Food Menu";

    credits.textContent = "Created with ";
    const strong = document.createElement("strong");
    strong.appendChild(link);
    credits.appendChild(strong);

    nodeEl.appendChild(credits);
}

export function prepareLayout(oneFoodMenuNode) {
    // Validate input
    if (!oneFoodMenuNode || !(oneFoodMenuNode instanceof Element)) {
        throw new Error('Invalid node element provided to prepareLayout');
    }

    // Create document fragment for batch DOM operations
    const fragment = document.createDocumentFragment();
    
    // Clean and prepare main node
    while (oneFoodMenuNode.firstChild) {
        oneFoodMenuNode.removeChild(oneFoodMenuNode.firstChild);
    }
    oneFoodMenuNode.classList.add('one-food-menu');
    
    // Apply design version
    toggleDesignClass(oneFoodMenuNode, window.__OneFoodMenu__?.configs?.version || 1);

    // Define menu sections
    const sections = Object.freeze({
        Items: 'menu-items',
        Allergens: 'menu-allergens',
        Credits: 'menu-credits',
        Modal: 'menu-modal'
    });
    
    // Create all sections at once using fragment
    Object.entries(sections).forEach(([nodeName, className]) => {
        const nodeEl = document.createElement('div');
        nodeEl.id = `OneFoodMenu${nodeName}`;
        nodeEl.className = className;
        
        // Store reference in global object
        if (window.__OneFoodMenu__?.nodes) {
            window.__OneFoodMenu__.nodes[`menu${nodeName}`] = nodeEl;
        }
        
        fragment.appendChild(nodeEl);
    });

    // Single DOM update
    oneFoodMenuNode.appendChild(fragment);
}


export function getLabel(key) {
    const configs = window.__OneFoodMenu__.configs;
    const userLabels = configs?.labels || {};

    const DEFAULT_LABELS = {
        outOfStock: "Currently Unavailable",
        allergens: "Allergens",
        // categories: "Categories",
        // price: "Price",
        // Add more default labels as needed
    };

    // Return user custom label if provided, otherwise return default
    return userLabels[key] || DEFAULT_LABELS?.[key] || '';
}
