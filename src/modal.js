import {
    tagsHTML, allergensHTML, optionsHTML
} from './templates';

export const showModal = (product_id) => {
    let { products } = window.__OneFoodMenu__;
    let { version, priceSymbol } = window.__OneFoodMenu__.configs;

    let productData = products.filter((product) => product.uid === product_id);

    let modalContent = ''

    if(version == 1 || version == 2) modalContent = getModalContent(productData, priceSymbol);

    let html = modalWrapper(modalContent);

    document.body.classList.add('modal-open');
    window.__OneFoodMenu__.nodes.menuModal.innerHTML = html;

    //close modal
    let closeModaEls = document.querySelectorAll('[data-close-modal]');
    closeModaEls.forEach((element) => {
        element.addEventListener("click", (e) => {
            window.__OneFoodMenu__.nodes.menuModal.innerHTML = "";
            document.body.classList.remove("modal-open");
        });
    });

}

const getModalContent = (productData, priceSymbol) => {
    let product = productData?.[0];

    let html = ''

    let productImageHTML = () => (
        `<div class="image-bg image-bg-2">
            <div class="image-bg" style="background-image: url(${product.imageUrl})"></div>
        </div>`
    );

    html += ` <div>
                ${ productImageHTML() }
                <div class="ofm-modal-content__text">
                    <div class="ofm-product__title">${product.name}</div>`;
                    
                    //productTags && Allergens
                    if (product.allergens?.length || product.tags?.length) {
                        html += `<div class="ofm-product__allergens">`;
                        html += allergensHTML(product.allergens);
                        html += tagsHTML(product.tags);
                        html += `</div>`;
                    }
                    
                    //descriptiom
                    html += ` <div class="ofm-product__desc">${product.description}</div>`;

                    //prices
                    html += `<div>`;
                        product.options && (html += optionsHTML(product.options, true));
                    html += `</div>`;

        html += `</div>`;
    html += `</div>`;

    return html;
}




const modalWrapper = (content) => {
    return ` <div class="ofm-modal">
        <div class="ofm-modal-backdrop" data-close-modal></div>
        <div class="ofm-modal-container">
            <div class="ofm-modal-close" data-close-modal>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="ofm-modal-content">
                <div class="ofm-overflow-y-hidden">
                    ${content}
                </div>
            </div>
        </div>
    </div>`;
}