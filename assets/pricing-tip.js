document.addEventListener('DOMContentLoaded',()=>{
	const pricingItems = document.querySelectorAll('.pricing-item');
	pricingItems.forEach(pricingItem=>{
		const tip = pricingItem.querySelector('.tip');
		const tipContent = pricingItem.querySelector('.tip-content');
		if(tip && tipContent) {
			let x,y;
			tip.addEventListener('mouseenter',()=>{
				if(!x && !y) {
					getPos();
				}
				tipContent.classList.add('show');
				if(window.innerWidth > 749) {
					tipContent.style.left = `${x + 40}px`;
					tipContent.style.top = `${y - tipContent.scrollHeight / 2}px`;
				} else {
					const left = x - tipContent.scrollWidth / 2;
					const right = left + tipContent.scrollWidth;
					if(left + tipContent.scrollWidth > window.innerWidth) {
						tipContent.style.left = `${left - (right - window.innerWidth)}px`;
					} else {
						tipContent.style.left = `${left}px`;
					}
					tipContent.style.top = `${y + 30}px`;
				}
			});
			tip.addEventListener('mouseleave',()=>{
				tipContent.classList.remove('show');
			});
			const getPos = () => {
				const tipRect = tip.getBoundingClientRect();
				const pricingRect = pricingItem.getBoundingClientRect();
				x = tipRect.x - pricingRect.x;
				y = tipRect.y - pricingRect.y;
			};
			window.addEventListener('resize',()=>{
				getPos();
			});
		}
	});
});