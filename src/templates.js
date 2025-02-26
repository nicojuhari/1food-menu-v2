// Template Strategy Pattern - Define different version renderers
import { allergensHTML, optionsHTML, tagsHTML, productImageHTML } from "./template-helpers";
import { getLabel } from "./helpers";
const renderProductV1 = (product) => `
    ${productImageHTML(product.imageUrl, product.name)}
    <div class="ofm-product__info">
        <div class="ofm-product__title ofm-line-clamp">${product.name}</div>
        ${
            product.description
                ? `<div class="ofm-product__desc ofm-line-clamp ${!product.tags?.length ? 'clamp-2' : ''}">${product.description}</div>`
                : ""
        }
        ${
            product.tags?.length
                ? `
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
`;

const renderProductV3 = (product) => `
    ${productImageHTML(product.imageUrl, product.name)}
    <div class="ofm-product__info">
    <div class="ofm-product__title ofm-line-clamp">${product.name}</div>
    ${ product.options ? `
        <div class="ofm-product__options">
            ${optionsHTML(product.options, false, false)}
        </div>`
        : ""
    }
</div>
`;

const renderProductV4 = (product) => `
    <div class="ofm-product__info">
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
`;

// Simple version selector
const getProductRenderer = (version) => {
    switch (version) {
        case 4: return renderProductV4;
        case 3: return renderProductV3;
        default: return renderProductV1; //for 1 and 2, the same html structure
    }
};


export function createMenuHTML({ products, categories }) {
    const version = window.__OneFoodMenu__.configs.version;
    const renderProduct = getProductRenderer(version);

    return categories
        .map(
            (category) => `
            <div class="ofm-category" data-category-id="${category.uid}">
                <h3 class="ofm-category__title">${category.name}</h3>
                ${ category.description ? `<p class="ofm-category__description">${category.description}</p>` : ''}
                <div class="ofm-category__items">
                    ${products[category.uid]
                        .map(
                            (product) => `<div class="ofm-product ${
                                !product.inStock ? "product-unavailable" : ""
                            }" data-product-id="${product.uid}">
                            ${renderProduct(product)}
                            
                            ${ !product.inStock
                                ? `<div class="out-of-stock-label">
                                    ${getLabel("outOfStock")}
                                </div>`
                                : ""
                            }
                        </div>`
                        )
                        .join("")}
                </div>
            </div>`
        )
        .join("");
};
