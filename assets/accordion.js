const accordion = ({parentClassName,initOpenIndex,paddingTop,marginTop,borderColor}) => {
    const accordionItems = document.querySelectorAll(`.${parentClassName} .accordion`);
    accordionItems.forEach((accordionItem,index) => {
        initBorder(accordionItem);
        if(index !== initOpenIndex) {
            closeAccordion(accordionItem);
        } else {
            openAccordion(accordionItem,paddingTop,marginTop,borderColor);
        }
        accordionItem.querySelector('.accordion-heading')?.addEventListener('click', () => {
            if (accordionItem.classList.contains('open')) {
                closeAccordion(accordionItem);
            } else {
                if (accordionItem.getAttribute('type') === 'group') {
                    const container = accordionItem.closest(accordionItem.getAttribute('container'));
                    container?.querySelectorAll('.accordion').forEach(item => {
                        if (item.classList.contains('open')) {
                            closeAccordion(item);
                        }
                    });
                }
                openAccordion(accordionItem,paddingTop,marginTop,borderColor);
            }
        });
    });
}
const initBorder = (accordion) => {
    const accordionContent = accordion.querySelector('.accordion-content');
    accordionContent.style.borderTop = '1px solid transparent';
}
const openAccordion = (accordion,paddingTop,marginTop,borderColor) => {
    accordion.classList.add('open');
    const accordionContent = accordion.querySelector('.accordion-content');
    accordionContent.classList.remove('hidden');
    accordionContent.style.height = `${accordionContent.scrollHeight}px`;
    accordionContent.style.paddingTop = `${paddingTop?paddingTop:'20'}px`;
    if(marginTop) {
        accordionContent.style.marginTop = `${marginTop}px`;
    }
    if(borderColor) {
        accordionContent.style.borderColor = borderColor;
    }
}
const closeAccordion = (accordion) => {
    const accordionContent = accordion.querySelector('.accordion-content');
    accordionContent.style.height = '0px';
    accordionContent.style.paddingTop = '0px';
    accordionContent.style.marginTop = '0px';
    accordion.classList.remove('open');
    accordionContent.style.borderColor = 'transparent';
}