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

	document.querySelector('.menu-drawer-container > summary')?.addEventListener('click',(e)=>{
		const menuDrawerContainer = e.target.closest('.menu-drawer-container');
		menuDrawerContainer.querySelectorAll('summary.menu-drawer__menu-item').forEach(mobileMenuItem=>{
			const mobileMegaMenu = mobileMenuItem.closest('details')?.querySelector('details.mega-menu');
			if(mobileMegaMenu) {
				mobileMegaMenu.setAttribute('open',true);
			}
		});
	});
});