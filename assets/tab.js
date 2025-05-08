const tab = (containerSelector,initIndex) => {
	const container = document.querySelector(containerSelector);
	if(container) {
		if(container.classList.contains('fetch_init_key_from_site')) {
			initIndex = location.href;
		}
		const tabHeaderThumb = container.querySelector('.tab-thumb');
		const tabHeaderItems = container.querySelectorAll('.tab-header-item');
		const tabContentSections = document.querySelectorAll('[tab][key]');
		tabHeaderItems.forEach(tabHeaderItem=>{
			tabHeaderItem.addEventListener('click',(e)=>{
				if(tabHeaderItem.href === location.href) {
					e.preventDefault();
				}
				const key = tabHeaderItem.getAttribute('key');
				container.querySelector('.tab-header-item.selected')?.classList.remove('selected');
				tabHeaderItem.classList.add('selected');
				container.querySelector('.tab-content.show')?.classList.remove('show');
				container.querySelector(`.tab-content[key="${key}"]`)?.classList.add('show');
				tabContentSections.forEach(tabContentSection=>{
					tabContentSection.classList.remove('show');
				});
				document.querySelectorAll(`[tab][key="${key}"]`).forEach(tabContent=>{
					tabContent.classList.add('show');
				});
				tabHeaderThumb.style.width = `${tabHeaderItem.offsetWidth}px`;
				tabHeaderThumb.style.left = `${tabHeaderItem.offsetLeft}px`;
			});
		});
		if(typeof initIndex === 'number') {
			tabHeaderItems[initIndex]?.click();
		} else if(typeof initIndex === 'string') {
			for (const tabHeaderItem of tabHeaderItems) {
				if(tabHeaderItem.getAttribute('key') === initIndex) {
					tabHeaderItem.click();
					break;
				}
			}
		} else {
			tabHeaderItems[0]?.click();
		}
		window.addEventListener('resize',()=>{
			container.querySelector('.tab-header-item.selected')?.click();
		});
	}
}
document.addEventListener('DOMContentLoaded',()=>{
	tab('.shopify-section-pricing-new',0);

	if(document.querySelector('.shopify-section-tab-header[group=pricing]')) {
		const pricingItem = localStorage.getItem('pricing-item');
		tab('.shopify-section-tab-header[group=pricing]',pricingItem);
	}
});