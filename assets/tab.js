const tab = (containerSelector,initIndex) => {
	const container = document.querySelector(containerSelector);
	if(container) {
		const tabHeaderThumb = container.querySelector('.tab-thumb');
		const tabHeaderItems = container.querySelectorAll('.tab-header-item');
		tabHeaderItems.forEach(tabHeaderItem=>{
			tabHeaderItem.addEventListener('click',()=>{
				const key = tabHeaderItem.getAttribute('key');
				container.querySelector('.tab-header-item.selected')?.classList.remove('selected');
				tabHeaderItem.classList.add('selected');
				container.querySelector('.tab-content.show')?.classList.remove('show');
				container.querySelector(`.tab-content[key="${key}"]`)?.classList.add('show');
				tabHeaderThumb.style.width = `${tabHeaderItem.offsetWidth}px`;
				tabHeaderThumb.style.left = `${tabHeaderItem.offsetLeft}px`;
			});
		});
		tabHeaderItems[initIndex]?.click();
		window.addEventListener('resize',()=>{
			container.querySelector('.tab-header-item.selected')?.click();
		});
	}
}
document.addEventListener('DOMContentLoaded',()=>{
	tab('.shopify-section--pricing-new',0);
});