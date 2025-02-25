// Template Strategy Pattern - Define different version renderers
const renderProductV1 = (product) => `
    <div class="ofm-product" data-product-block="${product.uid}">
        ${productImageHTML(product.imageUrl, product.name)}
        <div class="ofm-product__text">
            <div class="ofm-product__title line-clamp-1">${product.name}</div>
            ${
                product.description
                    ? `<div class="ofm-product__desc line-clamp-1">${product.description}</div>`
                    : ""
            }
            ${
                product.tags?.length ? `
                <div class="flex items-center justify-between gap-2">
                    <div class="ofm-product__tags flex items-center">
                        ${tagsHTML(product.tags)}
                    </div>
                </div>`
                    : ""
            }
            ${
                product.options
                    ? `
                <div class="ofm-product__options">
                    ${optionsHTML(product.options, false, true)}
                </div>`
                    : ""
            }
        </div>
    </div>
`;

const renderProductV3 = (product) => `
    <div class="ofm-product" data-product-block="${product.uid}">
        ${productImageHTML(product.imageUrl, product.name)}
        <div class="ofm-product__text">
            <div class="ofm-product__title line-clamp-1">${product.name}</div>
            ${
                product.options
                    ? `
                <div class="ofm-product__options">
                    ${optionsHTML(product.options, false, false)}
                </div>`
                    : ""
            }
        </div>
    </div>
`;

const renderProductV4 = (product) => `
    <div class="ofm-product" data-product-block="${product.uid}">
        <div class="ofm-product__text">
            <div class="ofm-product__title">${product.name}</div>
            ${
                product.description
                    ? `<div class="ofm-product__desc">${product.description}</div>`
                    : ""
            }
            ${
                product.tags?.length
                    ? `
                <div class="flex items-center justify-between gap-2">
                    <div class="ofm-product__tags flex items-center">
                        ${tagsHTML(product.tags)}
                    </div>
                    <div class="ofm-product__allergens flex items-center gap-2">
                        ${allergensHTML(product.allergens)}
                    </div>
                </div>`
                    : ""
            }
            ${
                product.options
                    ? `
                <div class="ofm-product__options">
                    ${optionsHTML(product.options, false, false)}
                </div>`
                    : ""
            }
        </div>
    </div>
`;

// Simple version selector
const getProductRenderer = (version) => {
    switch (version) {
        case 4: return renderProductV4;
        case 3: return renderProductV3;
        default: return renderProductV1; //for 1 and 2, the same html structure
    }
};


export const createMenuHTML = ({ products, categories }) => {
    const version = window.__OneFoodMenu__.configs.version;
    const renderProduct = getProductRenderer(version);

    return categories
        .map(
            (category) => `
            <div class="ofm-category" data-category>
                <h3 class="ofm-category__title">${category.name}</h3> 
                <div class="ofm-category__items">
                    ${products[category.uid].map(renderProduct).join("")}
                </div>
            </div>`
        )
        .join("");
};

export const allergensHTML = (prod_allergens) => {
    // Early return if no allergens
    if (!prod_allergens?.length) return "";

    // Get allergens from global config
    const allergensList = window.__OneFoodMenu__.allergens || [];

    // Create a map for O(1) lookup instead of using find() for each allergen
    const allergensMap = new Map(allergensList.map((allergen) => [allergen.uid, allergen.name]));

    return prod_allergens
        .map((allergenId) => {
            const allergenName = allergensMap.get(allergenId);
            // Skip invalid allergens
            if (!allergenName) return "";

            return `<div data-prod-allergen class="ofm-allergen__item">${allergenName}</div>`;
        })
        .filter(Boolean) // Remove empty strings from invalid allergens
        .join("");
};

export const tagsHTML = (tags) => {
    if (tags?.length == 0 || !tags) return "";
    return tags.slice(0, 3).map((tag) => {
        return ` <div data-prod-tag class="ofm-tag">${tag}</div>`;
    }).join("")
}

export const formatPrice = (price, priceSymbol, priceSymbolPosition) => {
    return priceSymbolPosition === "after" ? `${price}${priceSymbol}` : `${priceSymbol}${price}`;
};
export const optionsHTML = (options, inModal = false, showArrow = false) => {
    const { priceSymbol, priceSymbolPosition = "before" } = window.__OneFoodMenu__.configs;
    const version = window.__OneFoodMenu__.configs.version;
    
    return options
        .map((item, idx) => {
            if ((version <= 3) && idx >= 1 && !inModal) {
                return '';
            }
            
            

            return `
                <div class="ofm-product__options-item">
                    <div class="ofm-product__size ofm-text-sm">${item?.size}</div>
                    <div class="ofm-product__price">
                        ${
                            item.salePrice
                                ? `<div class="ofm-price ofm-text-lg">${formatPrice(
                                      item.salePrice,
                                      priceSymbol,
                                      priceSymbolPosition
                                  )}</div>
                             <div class="ofm-price ofm-price--old ofm-text-sm">${formatPrice(
                                 item.price,
                                 priceSymbol,
                                 priceSymbolPosition
                             )}</div>`
                                : `<div class="ofm-price ofm-text-lg">${formatPrice(
                                      item.price,
                                      priceSymbol,
                                      priceSymbolPosition
                                  )}</div>`
                        }
                        ${
                            showArrow && options[1] && !inModal
                                ? `<div class="arrow-down">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>`
                                : ""
                        }
                    </div>
                </div>`;
        })
        .join("");
};

export let productImageHTML = (imageUrl = "", name = "") => {
    let html = `<div class="image-container">`;
        if (imageUrl) {
            html += `<img class="product-image" src="${imageUrl}" alt="${name}" onerror="this.style.display='none'">`;
        }
    html += `</div>`;
    return html;
}