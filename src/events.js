import { showModal } from './modal';

export const events = () => {
    const { configs = {} } = window.__OneFoodMenu__ ?? {};
    const { version = 1 } = configs;

    // Check if version is valid for event attachment
    if ([1, 2, 3].includes(version)) {
        attachProductClickEvents();
    }

    // Add category filter events
    const categoryTabs = document.querySelectorAll(".ofm-cat-tab");
    categoryTabs.forEach((tab) => {
        tab.addEventListener("click", handleCategoryFilter);
    });
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

function handleCategoryFilter(e) {
    const categoryId = e.target.dataset.categoryFilter;
    const allTabs = document.querySelectorAll(".ofm-cat-tab");
    const allCategories = document.querySelectorAll(".ofm-category");

    // Update active tab
    allTabs.forEach((tab) => tab.classList.remove("active"));
    e.target.classList.add("active");

    // Show/hide categories
    allCategories.forEach((category) => {
        if (categoryId === "all") {
            category.style.display = "block";
        } else {
            category.style.display = category.dataset.categoryId === categoryId ? "block" : "none";
        }
    });
}