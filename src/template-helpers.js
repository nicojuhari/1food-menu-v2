import { getLabel } from "./helpers";

export function tagsHTML(tags) {
    if (!tags?.length) return "";
    return tags
        .slice(0, 3)
        .map((tag) => `<div data-prod-tag class="ofm-tag">${tag}</div>`)
        .join("");
}

export function optionsHTML(options, inModal = false, showArrow = false) {
    const { priceSymbol, priceSymbolPosition = 1 } = window.__OneFoodMenu__.configs;
    const version = window.__OneFoodMenu__.configs.version;

    function formatPrice(price) {
        // 1 = before price (default), 2 = after price
        return priceSymbolPosition === 2 ? `${price}${priceSymbol}` : `${priceSymbol}${price}`;
    }

    return options
        .map((item, idx) => {
            if (version <= 3 && idx >= 1 && !inModal) return "";

            return `
                <div class="ofm-product__options-item">
                    <div class="ofm-product__size ofm-text-sm">${item?.size}</div>
                    <div class="ofm-product__price">
                        ${renderPrice(item)}
                        ${renderArrow(showArrow, options, inModal)}
                    </div>
                </div>`;
        })
        .join("");

    function renderPrice(item) {
        if (item.salePrice) {
            return `
                <div class="ofm-price ofm-text-lg">${formatPrice(item.salePrice)}</div>
                <div class="ofm-price ofm-price--old ofm-text-sm">${formatPrice(item.price)}</div>
            `;
        }
        return `<div class="ofm-price ofm-text-lg">${formatPrice(item.price)}</div>`;
    }

    function renderArrow(showArrow, options, inModal) {
        if (!showArrow || !options[1] || inModal) return "";

        return `
            <div class="arrow-down">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        `;
    }
}

export let productImageHTML = (imageUrl = "", name = "") => {
    let html = `<div class="image-container">`;
    if (imageUrl) {
        html += `<img class="product-image" src="${imageUrl}" alt="${name}" onerror="this.style.display='none'">`;
    }
    html += `</div>`;
    return html;
};

export const createCategoryTabsHTML = (categories) => {
    return `
        <div class="ofm-category-tabs ofm-scroll">
            <button 
                class="ofm-cat-tab active" 
                data-category-filter="all"
            >
                ${ getLabel('categoryAll') }
            </button>
            ${categories
                .map(
                    (category) => `
                <button 
                    class="ofm-cat-tab" 
                    data-category-filter="${category.uid}"
                >
                    ${category.name}
                </button>
            `
                )
                .join("")}
        </div>
    `;
};