import { createMenuHTML } from "./templates";
import { events } from "./events";


export const createMenu = ({ menu, version = 1, priceSymbol = "", }) => {

    // tests if global scope is bound to window
    if (!isBrowser()) return;

    const oneFoodMenuNode = document.getElementById("1FoodMenu");
    
    //validate
    if (oneFoodMenuNode == null) return;
    if(Object.entries(menu).length == 0 || menu?.products?.length == 0 || menu?.categories?.length == 0) return;

    // menuBlock
    let oneFoodMenuBlock = document.createElement("div");
    oneFoodMenuBlock.id = "1FoodMenuBlock";
    oneFoodMenuNode.appendChild(oneFoodMenuBlock);

    //create global object
    window.__OneFoodMenuData__ = {
        products: menu.products,
        categories: menu.categories,
        oneFoodMenuBlock,
        version,
        priceSymbol,
    };

    if ([1,2].includes(version)) {
        // create modalBlock
        if (document.getElementById("1FoodMenuModal") == null) {

            let modalDiv = document.createElement("div");
            modalDiv.id = "1FoodMenuModal";

            oneFoodMenuNode.appendChild(modalDiv);
            __OneFoodMenuData__.oneFoodMenuModal = modalDiv;
        }
    }

    if ([3, 4].includes(version)) {
        let classes = "bg-white p-4 my-6 shadow-md rounded-md".split(" ");
        classes.forEach((item) => {
            oneFoodMenuBlock.classList.add(item);
        });
    }

    let groupedProducts = [];
    let menuHTML = "";

    groupedProducts = productsByCategory(menu);
    menuHTML = createMenuHTML({ menu, categories: groupedProducts, version, priceSymbol });

    mountOnPage(oneFoodMenuBlock, menuHTML);


    //carousel
    if(version == 2) {
        import('swiper').then(({ default: Swiper, Navigation }) =>  {

            new Swiper(".mySwiper", {
            modules: [Navigation],
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            spaceBetween: 15,
            slidesPerView: 1.3,
            breakpoints: {
                640: {
                    slidesPerView: 2.3,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
            },
        });

        })
    }

    events();
};

const productsByCategory = (menu) => {
    let groupedProducts = {};

    menu.products.forEach((product) => {
        if (!groupedProducts?.[product?.categoryId]) {
            groupedProducts[product.categoryId] = [];
        }
        groupedProducts[product.categoryId].push(product);
    });

    return groupedProducts;
};

const mountOnPage = (oneFoodMenuNode, html) => oneFoodMenuNode.innerHTML = html;

function isBrowser() {
    return typeof window !== "undefined";
};
