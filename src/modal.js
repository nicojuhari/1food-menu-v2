import {
    tagsHTML, allergensHTML, optionsHTML, productImageHTML
} from './template-helpers';
import { getLabel } from './helpers';

export const showModal = (productId) => {
    // Input validation
    if (!productId) return;

    // Destructure with default values for safety
    const { products = [], nodes = {}, configs = {} } = window.__OneFoodMenu__ ?? {};
    const { version = 1 } = configs;

    // Find product (using find instead of filter)
    const product = products.find(product => product.uid === productId);
    if (!product) return;

    // Check version and generate content
    const isValidVersion = [1, 2, 3].includes(version);
    const modalContent = isValidVersion ? getModalContent([product]) : '';
    
    // Create modal elements using DOM API
    const modalElement = createModalElement(modalContent);
    
    // Add to DOM and update state
    document.body.classList.add('modal-open');
    if (nodes.menuModal) {
        nodes.menuModal.replaceChildren(modalElement);
        
        // Ensure modal element is in the DOM before adding animation class
        const modal = nodes.menuModal.querySelector('.ofm-modal');
        if (modal) {
            setupModalCloseHandlers(nodes.menuModal);
            
            // Trigger animation after a micro-task to ensure DOM is ready
            requestAnimationFrame(() => {
                modal.classList.add('modal-show');
            });
        }
    }
};

const getModalContent = (productData) => {
    let product = productData?.[0];

    const outOfStockLabel = !product.inStock
        ? `<div class="out-of-stock-label">${getLabel("outOfStock")}</div>`
        : "";

    let html = "";

    html += `${outOfStockLabel}
            ${productImageHTML(product?.imageUrl, product?.name)}
            <div class="ofm-product__info">
                <div class="ofm-product__title ofm-text-xl">${product.name}</div>`;

    //descriptiom
    html += product.description && ` <div class="ofm-product__desc">${product.description}</div>`;

    //productTags
    if (product.tags?.length) {
        html += `<div class="ofm-product__tags flex items-center gap-2">`;
        html += tagsHTML(product.tags);
        html += `</div>`;
    }

    //prices
    if (product.options?.length) {
        html += `<div class="ofm-product__options">`;
        html += optionsHTML(product.options, true);
        html += `</div>`;
    }

    //allergens
    if (product.allergens?.length) {
        html += `<div class="ofm-modal-allergens">`;
        html += allergensHTML(product.allergens, true);
        html += `</div>`;
    }

    html += `</div>`;

    return html;
}

const createModalElement = (content) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = modalWrapper(content);
    
    const modalEl = wrapper.firstElementChild;
    modalEl.classList.add('modal-wrapper');
    
    return modalEl;
};

const setupModalCloseHandlers = (modalNode) => {
    const handleClose = () => {
        const modal = modalNode.querySelector('.ofm-modal');
        if (!modal) return;

        // Add closing animation
        modal.classList.remove('modal-show');
        modal.classList.add('modal-hide');

        // Wait for animation to complete before removing
        const container = modal.querySelector('.ofm-modal-container');
        if (container) {
            container.addEventListener('transitionend', () => {
                modalNode.replaceChildren();
                document.body.classList.remove('modal-open');
            }, { once: true });
        }
    };

    // Use event delegation instead of multiple listeners
    modalNode.addEventListener('click', (e) => {
        if (e.target.closest('[data-close-modal]')) {
            handleClose();
        }
    });

    // Add escape key handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            handleClose();
        }
    }, { once: true });
};

const modalWrapper = (content) => {
    return `
        <div class="ofm-modal">
            <div class="ofm-modal-backdrop" data-close-modal></div>
            <div class="ofm-modal-container">
                <div class="ofm-modal-close" data-close-modal>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div class="ofm-modal-content">
                    ${content}
                </div>
            </div>
        </div>`;
};