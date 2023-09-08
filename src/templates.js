export const createMenuHTML = (obj) => {
    let { version } = obj;
    let menuHTML = "";

    if (version == 1) menuHTML = menuDesignOne(obj);
    if (version == 2) menuHTML = menuDesignTwo(obj);
    if (version == 3) menuHTML = menuDesignTree(obj);
    if (version == 4) menuHTML = menuDesignFour(obj);

    return menuHTML;
};

export const allergensHTML = (prod_allergens) => {
    let allergens = window.__OneFoodMenu__.allergens;
    let allergensHTML = "";

    if (prod_allergens?.length == 0 || !prod_allergens) return "";

    allergensHTML += prod_allergens.map((allergen) => {
        return `<div data-prod-allergen class="cursor-pointer flex-shrink-0 text-xs p-1 bg-slate-100 rounded-full border w-6 h-6 grid place-content-center">${
            allergens.find((al) => al.uid == allergen).name
        }</div>`;
    })
    .join("");
    // allergensHTML += `<div class="mr-auto pr-2"></div>`;

    return allergensHTML;
};

export const tagsHTML = (tags) => {
    return tags.map((tag) => {
        return ` <div data-prod-tag class="flex text-xs flex-shrink-0 px-2 py-1 rounded-full bg-green-600 bg-opacity-10 text-green-600">${tag}</div>`;
    }).join("")
}

export let optionsHTML = (options, inModal = false) => {
    let priceSymbol = window.__OneFoodMenu__.configs.priceSymbol;
    let version = window.__OneFoodMenu__.configs.version;
    let html = ''
    return options
        .map((item, idx) => {
            html = "";
            if((version == 1 || version == 2) && idx >= 1 && !inModal) {
               return html;
            }
            
            html += `<div class="flex justify-between items-center border-t first:border-t-0 border-dashed border-gray-300 
            ${ (version == 1 || version == 2) && !inModal ? 'py-0' : 'py-2'}">
                        
                        <div class="text-gray-500 text-sm">${item?.size}</div>`;
                        
                html += `<div class="flex gap-2 items-center">`;
                
                    if(item.salePrice) {
                        html += `<div class="text-gray-700 font-medium text-lg">
                                    ${priceSymbol} ${item.salePrice}
                                </div>`;
                        html += `<div class="text-red-400 line-through opacity-70 text-sm">
                                    ${priceSymbol} ${item.price}
                                </div>`;
                    } else {
                        html += `<div class="text-gray-700 font-medium text-lg">
                                    ${priceSymbol} ${item.price}
                                </div>`;
                    }

                    if ((version == 1 || version == 2) && !inModal && options[1]) {
                        html += `<span class="arrow-down rounded bg-slate-200"></span>`;
                    }

                html += `</div>`;
            html += `</div>`;
            return html;
        })
        .join("");
    };

const menuDesignOne = ({ products, categories }) => {

    return categories
        .map((category) => {
            let cat = "";
            let prod = "";

            prod = products[category.uid]
                .map((product) => {
                    let html = "";

                    html += `   <div class="1fm-product flex cursor-pointer rounded-xl bg-white flex-shrink-0 shadow h-44" data-product-block="${product.uid}" >`;

                    // product Image
                    html += `   <div class=" h-full w-40 image-bg image-bg-2 shrink-0 rounded-l-xl">
                                        <div class="image-bg h-full w-full rounded-l-xl" style="background-image: url(${product.imageUrl})"> </div>
                                    </div>`;

                    // product content
                    html += `<div class="p-2.5 md:p-4 flex flex-col flex-grow overflow-hidden">`;

                    //product name
                    html += `<div class="font-bold mb-2">${product.name}</div>`;

                    //productTags && Allergens
                    html += `<div class="flex gap-2 overflow-x-auto overflow-hidden max-w-full pb-2">`;
                    html += allergensHTML(product.allergens);
                    product.tags && (html += tagsHTML(product.tags));
                    html += `</div>`;

                    //product description
                    html += `<div class="mt-auto opacity-60 leading-tight line-clamp-2 w-full hidden text-base">${product.description}</div>`;

                    //prices
                    html += `<div class="pt-4">`;
                        product.options && (html += optionsHTML(product.options));
                    html += `</div>`;
                    

                    //closing tags
                    html += `   </div>
                        </div>`;

                    return html;
                })
                .join("");

            cat += `<div class="1fm-category my-6" data-category>
                        <h2 class="1fm-category-title text-2xl font-bold">${category.name}</h2> 
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2"> ${prod} </div>
                    </div>`;
            return cat;
        })
        .join("");
};

const menuDesignTwo = ({ products, categories, priceSymbol }) => {

    return categories
        .map((category) => {
            let cat = "";
            let prod = "";

            prod = products[category.uid]
                .map((product) => {
                    let html = "";

                    html += `<div class="1fm-product snap-center flex flex-col cursor-pointer rounded-xl bg-white flex-shrink-0 shadow w-72" data-product-block="${product.uid}" >`;

                    // product Image
                    html += `<div class="h-52 w-full image-bg image-bg-2 shrink-0 rounded-t-xl">
                                    <div class="image-bg h-full w-full rounded-t-xl" style="background-image: url(${product.imageUrl})"> </div>
                                </div>`;

                    // product content
                    html += `<div class="p-4 flex flex-col flex-grow">`;

                    //product name
                    html += `<div class="font-bold pb-2">${product.name}</div>`;

                    //productTags && Allergens
                    if(product.allergens?.length > 0 || product.tags?.length > 0) {
                        html += `<div class="flex gap-2 overflow-x-auto overflow-hidden max-w-full my-2">`;
                        html += allergensHTML(product.allergens);
                        product.tags && (html += tagsHTML(product.tags));
                        html += `</div>`;
                    }

                    //product description
                    html += `<div class="opacity-60 leading-tight line-clamp-2 w-full mt-auto">${product.description}</div>`;

                    //product prices
                    html += `<div class="pt-4">`;
                        product.options && (html += optionsHTML(product.options));
                    html += `</div>`;

                    //closing tags
                    html += `   </div>
                        </div>`;

                    return html;
                })
                .join("");

            cat += `<div class="1fm-category my-6 overflow-hidden relative" data-category>
                        <h2 class="1fm-category-title text-2xl font-bold">${category.name}</h2>
                        <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory py-6 px-1">${prod}</div>
                    </div>`;
            return cat;
        })
        .join("");
};

const menuDesignTree = ({ products, categories }) => {
    return categories
        .map((category) => {
            let cat = "";
            let prod = "";

            prod = products[category.uid]
                .map((product) => {
                    let html = "";

                    html += `<div class="1fm-product bg-white rounded-md shadow p-4 md:p-6 flex flex-shrink-0 relative">`;

                    // product content
                    html += `<div class="w-full flex flex-col">`;

                    //product name
                    html += `<div class="font-bold mb-auto pb-2 text-2xl line-clamp-2">${product.name}</div>`;

                    //productTags && Allergens
                    if (product.tags?.length || product.allergens?.length) {
                        html += `<div class="flex gap-2 overflow-x-auto overflow-hidden max-w-full py-2">`;
                            html += allergensHTML(product.allergens);
                            html += tagsHTML(product.tags);
                        html += `</div>`;
                    }

                    //product description
                    html += `<div class="opacity-50 leading-tight w-full mb-2 text-lg">${product.description}</div>`;

                    html += `<div>`;
                        product.options && (html += optionsHTML(product.options));
                    html += `</div>`;

                    //closing tags
                    html += `</div>
                        </div>`;

                    return html;
                })
                .join("");

            cat += `<div class="1fm-category my-8 first:mt-0 py-5 bg-s rounded-md" data-category>
                        <h2 class="text-center text-2xl md:text-3xl mb-6 font-semibold uppercase p-4 w-full truncate">${category.name}</h2> 
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"> ${prod} </div>
                    </div>`;
            return cat;
        })
        .join("");
};

const menuDesignFour = ({ products, categories }) => {

    let categoriesHTML =  categories
        .map((category) => {
            let cat = "";
            let prod = "";

            prod = products[category.uid]
                .map((product) => {
                    let html = "";

                    html += `<div class="1fm-product flex flex-shrink-0 p-2 md:p-4">`;

                    // product content
                    html += `<div class="w-full flex flex-col">`;

                    //product name
                    html += `<div class="font-bold mb-2 text-2xl line-clamp-2">${product.name}</div>`;

                    //productTags && Allergens
                    if (product.tags?.length || product.allergens?.length) {
                        html += `<div class="flex gap-2 overflow-x-auto overflow-hidden max-w-full py-4">`;
                        html += allergensHTML(product.allergens);
                        html += tagsHTML(product.tags);
                        html += `</div>`;
                    }

                    //product description
                    html += `<div class="opacity-50 italic leading-tight w-full mb-2 text-lg">${product.description}</div>`;

                    html += `<div>`;
                    product.options && (html += optionsHTML(product.options));
                    html += `</div>`;
                    // product.options && (html += optionsHTML(product.options));

                    //closing tags
                    html += `</div>
                        </div>`;

                    return html;
                })
                .join("");

            cat += `
                    <div class="1fm-category my-20 first:mt-10 max-w-[768px] mx-auto" data-category>
                        <h2 class="text-center text-2xl md:text-3xl mb-6 font-semibold uppercase bg-gray-50 border border-gray-400 p-4">${category.name}</h2> 
                        <div class="grid grid-cols-1 gap-6 gap-y-8"> ${prod} </div>
                    </div>`;
            return cat;
        })
        .join("");

    return `<div class="bg-white p-4 shadow rounded-md">${categoriesHTML}</div>`;
};

