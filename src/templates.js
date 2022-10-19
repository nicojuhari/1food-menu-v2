export const createMenuHTML = (obj) => {
    let { version } = obj;
    let menuHTML = "";

    if (version == 1) menuHTML = menuDesignOne(obj);
    if (version == 2) menuHTML = menuDesignTwo(obj);
    if (version == 3) menuHTML = menuDesignTree(obj);

    return menuHTML;
};

const menuDesignOne = ({ menu, categories, priceSymbol }) => {

    let productTagsHTML = (tags) =>
        ` <div class="flex gap-2 overflow-x-auto mb-2">
            ${tags
                .map((tag) => {
                    return ` <div class="text-xs px-2 py-1 rounded-full bg-green-600 bg-opacity-10 text-green-600">${tag}</div>`;
                })
                .join("")}    
        </div>`;
    return menu.categories
        .map((category) => {
            let cat = "";
            let prod = "";

            prod = categories[category.uid]
                .map((product) => {
                    let html = "";


                    html += `   <div class="1fm-product flex cursor-pointer rounded-xl bg-white flex-shrink-0 snap-start shadow-lg h-44 md:h-40" data-product-block="${product.uid}" >`;

                    // product Image
                    html += `   <div class="h-full w-40 image-bg image-bg-2 shrink-0 rounded-l-xl">
                                        <div class="image-bg h-full w-full rounded-l-xl" style="background-image: url(${product.imageUrl})"> </div>
                                    </div>`;

                    // product content
                    html += `<div class="p-4 flex flex-col flex-grow">`;

                    //product name
                    html += `<div class="font-bold mb-2">${product.name}</div>`;

                    //productTagsHTML
                    product.tags && (html += productTagsHTML(product.tags));

                    //product description
                    html += `<div class="opacity-60 leading-tight line-clamp-2 w-full">${product.description}</div>`;

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
                                                "!text-red-400 text-xs line-through text-opacity-70"
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

const menuDesignTwo = ({ menu, categories, priceSymbol }) => {

    return menu.categories
        .map((category) => {
            let cat = "";
            let prod = "";

            prod = categories[category.uid]
                .map((product) => {
                    let html = "";

                    html += `   <div class="swiper-slide 1fm-product !h-auto flex-auto w-full flex flex-col cursor-pointer rounded-xl bg-white flex-shrink-0 snap-start shadow-lg" data-product-block="${product.uid}" >`;

                    // product Image
                    html += `   <div class="h-48 w-full image-bg image-bg-2 shrink-0 rounded-t-xl">
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
                                                "!text-red-400 text-xs line-through text-opacity-70"
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

            cat += `<div class="1fm-category my-6 mx-4 overflow-hidden" data-category>
                        <h2 class="1fm-category-title text-2xl font-bold">${category.name}</h2>
                        <div class="swiper mySwiper">
                            <div class="swiper-wrapper py-6"> ${prod} </div>
                            <div class="swiper-navigation">
                                <div class="hidden md:flex swiper-button-next"></div>
                                <div class="hidden md:flex swiper-button-prev"></div>
                            </div>
                        </div>
                    </div>`;
            return cat;
        })
        .join("");
};

const menuDesignTree = ({ menu, categories, priceSymbol }) => {
    let productTagsHTML = (tags) =>
        ` <div class="flex gap-2 overflow-x-auto mb-2">
            ${tags
                .map((tag) => {
                    return ` <div class="text-xs px-2 py-1 rounded-full bg-green-600 bg-opacity-10 text-green-600">${tag}</div>`;
                })
                .join("")}    
        </div>`;

    let optionsHTML = (options) =>
        options
            .map((item) => {
                return `<div class="flex justify-between pt-4">
                        <div class="text-sm text-gray-400">${item?.size}</div>
                        <div class="font-bold flex gap-2 items-center">
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
                                    "!text-red-400 text-xs line-through text-opacity-70"
                                }">
                                    ${item.price && priceSymbol} ${item.price}
                                </div>`
                            }
                        </div>
                    </div>`;
            })
            .join("");

    return menu.categories
        .map((category) => {
            let cat = "";
            let prod = "";

            prod = categories[category.uid]
                .map((product) => {
                    let html = "";

                    html += `   <div class="1fm-product flex flex-shrink-0">`;

                    // product content
                    html += `<div class="p-4 flex flex-col flex-grow">`;

                    //product name
                    html += `<div class="font-bold mb-2">${product.name}</div>`;

                    //productTagsHTML
                    product.tags && (html += productTagsHTML(product.tags));

                    //product description
                    html += `<div class="opacity-60 leading-tight w-full">${product.description}</div>`;

                    product.options && (html += optionsHTML(product.options));

                    //closing tags
                    html += `   </div>
                        </div>`;

                    return html;
                })
                .join("");

            cat += `<div class="1fm-category my-6 bg-white rounded" data-category>
                        <h2 class="text-2xl mb-6 font-semibold uppercase border-y-2 border-black py-2 px-4">${category.name}</h2> 
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2"> ${prod} </div>
                    </div>`;
            return cat;
        })
        .join("");
};

