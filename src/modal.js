export const showModal = (product_id) => {
    let { products, version, priceSymbol } = __OneFoodMenuData__;
    let productData = products.filter((product) => product.uid === product_id);

    let modalContent = ''

    if(version == 1 || version == 2) modalContent = getModalContent(productData, priceSymbol);

    let html = modalWrapper(modalContent);

    document.body.classList.add('modal-open');
    __OneFoodMenuData__.oneFoodMenuModal.innerHTML = html;

    //close modal
    let closeModaEls = document.querySelectorAll('[data-close-modal]');
    closeModaEls.forEach((element) => {
        element.addEventListener("click", (e) => {
            __OneFoodMenuData__.oneFoodMenuModal.innerHTML = "";
            document.body.classList.remove("modal-open");
        });
    });

}

const getModalContent = (productData, priceSymbol) => {
    let product = productData?.[0];

    let html = ''

    let productImageHTML = () => (
        `<div class="h-80 w-full image-bg image-bg-2 shrink-0 border-b border-opacity-50">
            <div class="image-bg h-full w-full rounded-t-xl" style="background-image: url(${product.imageUrl})"></div>
        </div>`
    );

    let productTagsHTML = () => (
        ` <div class="flex gap-2 overflow-x-auto">
            ${ product.tags.map(tag => {
                    return `<div class="text-xs px-2 py-1 rounded-full bg-green-600 bg-opacity-10 text-green-600">${ tag }</div>`;
                }).join('') 
            }    
        </div>`
    )

    let optionsHTML = (options) => (
        options.map(item => {
            return `<div class="flex justify-between mt-auto pt-2">
                        ${item.size && `<div class="text-sm text-gray-400">${item.size}</div>`}
                        <div class="font-bold flex gap-2 items-center">
                            ${
                                item.salePrice &&
                                `<div class="text-gray-700">${item.salePrice && priceSymbol} ${item.salePrice}</div>`
                            }
                            ${
                                item.price && 
                                `<div class="text-gray-700 ${ item.salePrice && "!text-red-400 text-xs line-through text-opacity-70"}">
                                    ${item.price && priceSymbol} ${item.price}
                                </div>`
                            }
                        </div>
                    </div>`;
        }).join('')    
    );

    html += ` <div class="flex flex-col bg-white flex-shrink-0 rounded-t-xl">
                ${ productImageHTML() }
                <div class="p-4 flex flex-col flex-grow">
                    <div class="font-bold my-2">${product.name}</div>`;
                    
                    //tags
                    product.tags?.length && (html += productTagsHTML());
                    
                    //descriptiom
                    html+=` <div class="opacity-60 text leading-tight my-2">${ product.description }</div>`;

                    //prices
                    product.options && (html += optionsHTML(product.options));
            
        html += `</div>`;
    html += `</div>`;

    return html;
}




const modalWrapper = (content) => {
    return ` <div class="modal fixed z-20 flex items-end justify-center top-0 left-0 w-full h-screen p-2 md:p-4 fade-in">
        <div class="modal-backdrop fixed min-h-screen w-full top-0 left-0 bg-black bg-opacity-30" data-close-modal></div>
        <div class="modal-container bg-white rounded-xl z-10 m-auto w-full flex flex-col flex-1 max-h-full relative overflow-hidden max-w-[375px]">
            <div class="modal-close cursor-pointer bg-white text-black absolute text-opacity-80 transition-all p-2 rounded-full right-2 top-2" data-close-modal>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="modal-content overflow-y-auto h-full flex-1">
                <div class="overflow-y-hidden">
                    ${content}
                </div>
            </div>
        </div>
    </div>`;
}