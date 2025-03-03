document.addEventListener('DOMContentLoaded', () => {
	const classList = ['.mega-menu__content','.header__submenu'];
	for (const className of classList) {
		document.querySelectorAll(className).forEach(menu=>{
			const menuItem = menu.closest('details');
			if(menuItem) {
				menuItem.addEventListener('mouseenter',()=>{
					menuItem.setAttribute('open','');
				});
				menuItem.addEventListener('mouseleave',()=>{
					menuItem.removeAttribute('open');
				});
			}
		});	
	}
});