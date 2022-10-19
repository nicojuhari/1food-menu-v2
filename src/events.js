import { showModal } from './modal';
export const events = () => {
    
    let { version } = __OneFoodMenuData__;
    
    if(version == 1 || version == 2) attachEvents()

}

const attachEvents = () => {

    //show modal events
    window.document.addEventListener( "click",
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