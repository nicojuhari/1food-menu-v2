import { showModal } from './modal';

export const events = () => {
    const { configs = {} } = window.__OneFoodMenu__ ?? {};
    const { version = 1 } = configs;
    
    // Check if version is valid for event attachment
    if ([1, 2, 3].includes(version)) {
        attachProductClickEvents();
    }
};

const attachProductClickEvents = () => {
    const PRODUCT_SELECTOR = 'data-product-id';
    
    // Use event delegation for better performance
    document.addEventListener('click', handleProductClick, { capture: true });
    
    function handleProductClick(event) {
        const { configs = {} } = window.__OneFoodMenu__ ?? {};
        
        // Early return if version 4
        if (configs.version === 4) return;
        
        // Find closest product element
        const productElement = event.target.closest(`[${PRODUCT_SELECTOR}]`);
        if (!productElement) return;
        
        const productId = productElement.getAttribute(PRODUCT_SELECTOR);
        if (productId) {
            showModal(productId);
        }
    }
};   