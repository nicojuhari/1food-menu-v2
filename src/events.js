import { showModal } from './modal';
export const events = () => {
    
    let { version } = window.__OneFoodMenu__.configs;
    
    if(version == 1 || version == 2) attachEvents()

}

const attachEvents = () => {

    //show modal events
    document.addEventListener( "click",
        function (event) {
            let targetElement = event.target;
            
            let selector = "data-product-block";

            while (targetElement != null) {
                if (targetElement.hasAttribute(selector)) {

                    let productId = targetElement.getAttribute(selector)

                    showModal(productId)
                    
                    targetElement = null
                    return;
                }

                targetElement = targetElement.parentElement;
            }
        },
        true
    );
}   