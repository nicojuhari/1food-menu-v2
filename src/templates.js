export const createMenuHTML = (obj) => {
    let { version } = obj;
    let menuHTML = "";

    if (version == 1) menuHTML = menuDesignOne(obj);
    if (version == 2) menuHTML = menuDesignTwo(obj);
    if (version == 3) menuHTML = menuDesignTree(obj);
    if (version == 4) menuHTML = menuDesignFour(obj);

    return menuHTML;
};

const menuDesignOne = ({ products, categories, priceSymbol }) => {

    let productTagsHTML = (tags) =>
        ` <div class="flex gap-2 overflow-x-auto mb-2">
            ${tags
                .map((tag) => {
                    return ` <div class="text-xs px-2 py-1 rounded-full bg-green-600 bg-opacity-10 text-green-600">${tag}</div>`;
                })
                .join("")}    
        </div>`;
    return categories
        .map((category) => {
            let cat = "";
            let prod = "";

            prod = products[category.uid]
                .map((product) => {
                    let html = "";


                    html += `   <div class="1fm-product flex cursor-pointer rounded-xl bg-white flex-shrink-0 shadow h-44 md:h-40" data-product-block="${product.uid}" >`;

                    // product Image
                    html += `   <div class=" h-full w-40 image-bg image-bg-2 shrink-0 rounded-l-xl">
                                        <div class="image-bg h-full w-full rounded-l-xl" style="background-image: url(${product.imageUrl})"> </div>
                                    </div>`;

                    // product content
                    html += `<div class="p-2.5 md:p-4 flex flex-col flex-grow">`;

                    //product name
                    html += `<div class="font-bold mb-2">${product.name}</div>`;

                    //productTagsHTML
                    product.tags && (html += productTagsHTML(product.tags));

                    //product description
                    html += `<div class="opacity-60 leading-tight line-clamp-2 w-full hidden">${product.description}</div>`;

                    //product prices
                    html += `   <div class="mt-auto pt-1 ">
                                    <div class="flex gap-1 justify-between items-center">
                                         <div class="text-gray-400 text-sm truncate">
                                            ${product.options?.[0].size}
                                        </div>
                                        
                                        <div class="font-medium flex gap-2 items-center flex-shrink-0">
                                            ${
                                                product.options?.[0].salePrice &&
                                                '<div class="text-gray-700">' +
                                                    priceSymbol +
                                                    " " +
                                                    product.options?.[0].salePrice +
                                                    "</div>"
                                            }
                                            <div class="text-gray-700 ${
                                                //class
                                                product.options?.[0].salePrice &&
                                                "!text-red-400 line-through"
                                            }
                                            "> 
                                                ${product.options?.[0].price && priceSymbol} ${ product.options?.[0].price }
                                            </div>
                                            ${
                                                product.options?.[1]
                                                    ? '<span class="arrow-down rounded bg-slate-200"></span>'
                                                    : ""
                                            }
                                        </div>
                                    </div>`;
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

                    html += `<div class="1fm-product snap-center flex flex-col cursor-pointer rounded-xl bg-white flex-shrink-0 shadow w-64" data-product-block="${product.uid}" >`;

                    // product Image
                    html += `<div class="h-48 w-full image-bg image-bg-2 shrink-0 rounded-t-xl">
                                    <div class="image-bg h-full w-full rounded-t-xl" style="background-image: url(${product.imageUrl})"> </div>
                                </div>`;

                    // product content
                    html += `<div class="p-4 flex flex-col flex-grow">`;

                    //product name
                    html += `<div class="font-bold mb-2">${product.name}</div>`;

                    //product description
                    html += `<div class="opacity-60 leading-tight line-clamp-2 w-full">${product.description}</div>`;

                    //product prices
                    html += `   <div class="mt-auto pt-4">
                                    <div class="flex gap-1 justify-between items-center">
                                        <div class="text-gray-400 text-sm truncate">
                                            ${product.options?.[0].size}
                                        </div>
                                        
                                        <div class="font-medium flex gap-2 items-center flex-shrink-0">
                                            ${
                                                product.options?.[0].salePrice &&
                                                '<div class="text-gray-700">' +
                                                    priceSymbol +
                                                    " " +
                                                    product.options?.[0].salePrice +
                                                    "</div>"
                                            }
                                            <div class="text-gray-700 ${
                                                //class
                                                product.options?.[0].salePrice &&
                                                "!text-red-400 line-through"
                                            }
                                            "> 
                                                ${product.options?.[0].price && priceSymbol} ${
                        product.options?.[0].price
                    }
                                            </div>
                                            ${
                                                product.options?.[1]
                                                    ? '<span class="arrow-down rounded bg-slate-200"></span>'
                                                    : ""
                                            }
                                        </div>
                                        
                                    </div>`;
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

const menuDesignTree = ({ products, categories, priceSymbol }) => {
    let productTagsHTML = (tags) =>
        ` <div class="flex gap-2 overflow-x-auto mb-2">
            ${tags && tags
                .map((tag) => {
                    return ` <div class="text-xs px-2 py-1 rounded-full bg-green-600 bg-opacity-10 text-green-600">${tag}</div>`;
                })
                .join("")}    
        </div>`;

    let optionsHTML = (options) =>
        options
            .map((item) => {
                return `<div class="font-medium flex justify-between py-2 border-t first:border-t-0 border-dashed border-gray-300 text-lg">
                        <div class="text-gray-700">${item?.size}</div>
                        <div class="flex gap-2">
                            ${
                                item.salePrice &&
                                `<div class="text-gray-700">${item.salePrice && priceSymbol} ${
                                    item.salePrice
                                }</div>`
                            }
                            ${
                                item.price &&
                                `<div class="text-gray-700 ${
                                    item.salePrice && "!text-red-400 text-md line-through"
                                }">
                                    ${item.price && priceSymbol} ${item.price}
                                </div>`
                            }
                        </div>
                    </div>`;
            })
            .join("");

    return categories
        .map((category) => {
            let cat = "";
            let prod = "";

            prod = products[category.uid]
                .map((product) => {
                    let html = "";

                    html += `<div class="1fm-product bg-white rounded-md shadow p-4 md:p-6 flex flex-shrink-0">`;

                    // product content
                    html += `<div class="w-full">`;

                    //product name
                    html += `<div class="font-bold mb-2 text-2xl line-clamp-2">${product.name}</div>`;

                    //productTagsHTML

                    product.tags && (html += productTagsHTML(product.tags));

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

const menuDesignFour = ({ products, categories, priceSymbol }) => {
    let productTagsHTML = (tags) =>
        ` <div class="flex gap-2 overflow-x-auto mb-2">
            ${
                tags &&
                tags
                    .map((tag) => {
                        return ` <div class="text-xs px-2 py-1 rounded-full bg-green-600 bg-opacity-10 text-green-600">${tag}</div>`;
                    })
                    .join("")
            }    
        </div>`;

    let optionsHTML = (options) =>
        options
            .map((item) => {
                return `<div class="flex justify-between pt-2 text-lg font-medium">
                        <div class="text-gray-700">${item?.size}</div>
                        <div class="flex gap-2 items-center">
                            ${
                                item.salePrice &&
                                `<div class="text-gray-700">${item.salePrice && priceSymbol} ${
                                    item.salePrice
                                }</div>`
                            }
                            ${
                                item.price &&
                                `<div class="text-gray-700 ${
                                    item.salePrice &&
                                    "!text-red-400 text-sm line-through text-opacity-70"
                                }">
                                    ${item.price && priceSymbol} ${item.price}
                                </div>`
                            }
                        </div>
                    </div>`;
            })
            .join("");

    let categoriesHTML =  categories
        .map((category) => {
            let cat = "";
            let prod = "";

            prod = products[category.uid]
                .map((product) => {
                    let html = "";

                    html += `<div class="1fm-product flex flex-shrink-0 p-2 md:p-4 border-b last:border-b-0 border-dashed border-gray-300">`;

                    // product content
                    html += `<div class="w-full">`;

                    //product name
                    html += `<div class="font-bold mb-2 text-2xl line-clamp-2">${product.name}</div>`;

                    //productTagsHTML

                    product.tags && (html += productTagsHTML(product.tags));

                    //product description
                    html += `<div class="opacity-50 italic leading-tight w-full mb-2 text-lg">${product.description}</div>`;

                    product.options && (html += optionsHTML(product.options));

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

