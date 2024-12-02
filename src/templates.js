export const createMenuHTML = ({ products, categories }) => {
    let version = window.__OneFoodMenu__.configs.version;
    return categories
        .map((category) => {
            let cat = "";
            let prod = "";

            prod = products[category.uid]
                .map((product) => {
                    let html = "";

                    html += `   <div class="ofm-product" data-product-block="${product.uid}" >`;

                    // product Image
                    if (version == 1 || version == 2) {
                        html += productImageHTML(product.imageUrl, product.name);
                    }

                    // product content
                    html += `<div class="ofm-product__text">`;

                    //product name
                    html += `<div class="ofm-product__title ${[1,2].includes(version) ? 'line-clamp-1' : ''}">${product.name}</div>`;

                    //productTags && Allergens

                    if (product.tags?.length) {
                        html += `<div class="ofm-product__tags flex items-center">`;
                        html += tagsHTML(product.tags);
                        html += `</div>`;
                    }

                    //product description
                    html += product.description && `<div class="ofm-product__desc ${[1,2].includes(version) ? 'line-clamp-2' : ''}">${product.description}</div>`;

                    //prices
                    html += `<div class="ofm-product__options">`;
                    product.options && (html += optionsHTML(product.options));
                    html += `</div>`;

                    //closing tags
                    html += `</div>
                        </div>`;

                    return html;
                })
                .join("");

            cat += `<div class="ofm-category" data-category>
                        <h2 class="ofm-category__title">${category.name}</h2> 
                        <div class="ofm-category__items"> ${prod} </div>
                    </div>`;
            return cat;
        })
        .join("");
};

export const allergensHTML = (prod_allergens) => {
    let allergens = window.__OneFoodMenu__.allergens;
    let allergensHTML = "";

    if (prod_allergens?.length == 0 || !prod_allergens) return "";

    allergensHTML += prod_allergens.map((allergen) => {
        return `<div data-prod-allergen class="ofm-allergen__item">${
            allergens.find((al) => al.uid == allergen).name
        }</div>`;
    })
    .join("");
    // allergensHTML += `<div class="mr-auto pr-2"></div>`;

    return allergensHTML;
};

export const tagsHTML = (tags) => {
    if (tags?.length == 0 || !tags) return "";
    return tags.slice(0, 3).map((tag) => {
        return ` <div data-prod-tag class="ofm-tag">${tag}</div>`;
    }).join("")
}

export let optionsHTML = (options, inModal = false) => {
    let priceSymbol = window.__OneFoodMenu__.configs.priceSymbol;
    let priceSymbolPosition = window.__OneFoodMenu__.configs.priceSymbolPosition || 'before';
    let version = window.__OneFoodMenu__.configs.version;
    let html = ''
    return options
        .map((item, idx) => {
            html = "";
            if((version == 1 || version == 2) && idx >= 1 && !inModal) {
               return html;
            }
            
            html += `<div class="ofm-product__options-item">
                        
                        <div class="ofm-product__size ofm-text-sm">${item?.size}</div>`;
                        
                html += `<div class="ofm-product__price">`;
                
                    if(item.salePrice) {
                        html += `<div class="ofm-price ofm-text-lg">
                                    ${priceSymbolPosition == 'after' ? item.salePrice + priceSymbol : priceSymbol + item.salePrice}
                                </div>`;
                        html += `<div class="ofm-price ofm-price--old ofm-text-sm">
                                    ${priceSymbolPosition == 'after' ? item.price + priceSymbol : priceSymbol + item.price}
                                </div>`;
                    } else {
                        html += `<div class="ofm-price ofm-text-lg">
                                    ${priceSymbolPosition == 'after' ? item.price + priceSymbol : priceSymbol + item.price}
                                </div>`;
                    }

                    if ((version == 1 || version == 2) && !inModal && options[1]) {
                        html += `<div class="arrow-down rounded bg-slate-200"></div>`;
                    }

                html += `</div>`;
            html += `</div>`;
            return html;
        })
        .join("");
    };

export let productImageHTML = (imageUrl = "", name = "") =>
    imageUrl
        ? `<div class="image-bg image-bg-2">
            <img class="image-bg" src="${imageUrl}" alt="${name}" onerror="this.style.display='none'">
        </div>`
        : "";

