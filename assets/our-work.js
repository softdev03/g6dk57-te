document.addEventListener('DOMContentLoaded',()=>{
	const ourWorkSection = document.querySelector('.shopify-section-our-work');
	if(ourWorkSection) {
		const workItemCards = ourWorkSection.querySelectorAll('.card-item');
		ourWorkSection.querySelectorAll('.filter-item ').forEach(filterItem=>{
			filterItem.addEventListener('click',()=>{
				if(filterItem.classList.contains('all-items')) {
					filterItem.closest('.filter-list').querySelectorAll('.filter-item.selected').forEach(selectedItem=>{
						selectedItem.classList.remove('selected');
					});
					filterItem.classList.add('selected');
				} else {
					const filterList = filterItem.closest('.filter-list');
					filterList.querySelector('.filter-item.all-items.selected')?.classList.remove('selected');
					filterItem.classList.toggle('selected');
					if(!filterList.querySelector('.filter-item.selected:not(.all-items)')) {
						filterList.querySelector('.filter-item.all-items').classList.add('selected');
					}
				}
				filterCard();
			});
		});
		const filterCard = () => {
			const filterItems = {};
			ourWorkSection.querySelectorAll('.filter-item.selected').forEach(selectedItem=>{
				const type = selectedItem.getAttribute('type');
				const keyword = selectedItem.getAttribute('keyword');
				if(!filterItems[type]) {
					filterItems[type] = [];
				}
				if(keyword) {
					filterItems[type].push(keyword);
				}
			});
			workItemCards.forEach(workItemCard=>{
				let isFind = false;
				for (const key in filterItems) {
					let keywords = workItemCard.getAttribute(key);
					let isFindType = false;
					if(typeof keywords === 'string' && keywords) {
						keywords = keywords.split('|');
						if(filterItems[key].length > 0) {
							for (const filterItem of filterItems[key]) {
								if(keywords.indexOf(filterItem) !== -1) {
									workItemCard.classList.remove('hidden');
									isFind = true;
									isFindType = true;
									break;
								}
							}
						} else {
							workItemCard.classList.remove('hidden');
								isFind = true;
								isFindType = true;
						}
						if(!isFindType) {
							isFind = false;
							break;
						}
					}
				}
				if(!isFind) {
					workItemCard.classList.add('hidden');
				}
			});
		}
	}
});