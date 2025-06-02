document.addEventListener('DOMContentLoaded', () => {
  const classList = ['.mega-menu__content', '.header__submenu'];
  for (const className of classList) {
    document.querySelectorAll(className).forEach(menu => {
      const menuItem = menu.closest('details');
      if (menuItem) {
        menuItem.addEventListener('mouseenter', () => {
          menuItem.setAttribute('open', '');
        });
        menuItem.addEventListener('mouseleave', () => {
          menuItem.removeAttribute('open');
        });
      }
    });
  }

  document.querySelector('.menu-drawer-container > summary')?.addEventListener('click', (e) => {
    const menuDrawerContainer = e.target.closest('.menu-drawer-container');
    menuDrawerContainer.querySelectorAll('summary.menu-drawer__menu-item').forEach(mobileMenuItem => {
      const mobileMegaMenu = mobileMenuItem.closest('details')?.querySelector('details.mega-menu');
      if (mobileMegaMenu) {
        mobileMegaMenu.setAttribute('open', true);
      }
    });
  });

  const milsSections = document.querySelectorAll('.shopify-section-milg');
  milsSections.forEach(milsSection => {
    // const breakpointEl = milsSection.querySelector('.breakpoints');
    // const breakpointListfromEl = {};
    // const breakpointItems = breakpointEl?.querySelectorAll('.breakpoint-item') || [];
    // let breakpointLength = breakpointItems.length;
    // breakpointItems.forEach(breakpointItem=>{
    // 	const [minWidth,itemCount,gap] = breakpointItem.innerHTML.split('|');
    // 	breakpointListfromEl[minWidth] = {
    // 		slidesPerView: parseFloat(itemCount),
    // 		spaceBetween: parseInt(gap),
    // 	};
    // });
    // const breakpointList = breakpointLength > 0 ? breakpointListfromEl : {
    // 	0: {
    // 		slidesPerView: 1,
    // 		spaceBetween: 10,
    // 	},
    // 	412: {
    // 		slidesPerView: 1.5,
    // 		spaceBetween: 10,
    // 	},
    // 	768: {
    // 		slidesPerView: 1.8,
    // 		spaceBetween: 10,
    // 	},
    // 	900: {
    // 		slidesPerView: 2.1,
    // 		spaceBetween: 10,
    // 	},
    // 	1024: {
    // 		slidesPerView: 2.5,
    // 		spaceBetween: 10,
    // 	},
    // 	1200: {
    // 		slidesPerView: 3.2,
    // 		spaceBetween: 10,
    // 	},
    // 	1400: {
    // 		slidesPerView: 4,
    // 		spaceBetween: 10,
    // 	}
    // };
    // milsSection.querySelectorAll('.image-slider').forEach(slider=>{
    // 	new Swiper(slider, {
    // 		navigation: {
    // 			nextEl: slider.querySelector('.swiper-button-next'),
    // 			prevEl: slider.querySelector('.swiper-button-prev'),
    // 		},
    // 		breakpoints: {
    // 			... breakpointList
    // 		},
    // 	});
    // });

    milsSection.querySelector('.loadmore')?.addEventListener('click', (e) => {
      const hiddenGrids = milsSection.querySelectorAll('.image-grid.hidden');
      hiddenGrids[0]?.classList.remove('hidden');
      if (hiddenGrids.length < 2) {
        e.target.remove();
      }
    });
  });

  const scoreSections = document.querySelectorAll('.shopify-section-slg');
  scoreSections.forEach(scoreSection => {
    if(scoreSection.classList.contains('not-necessary')) {
      return;
    }
    const scoreItems = scoreSection.querySelectorAll('.score-item .score-value');
    const scoreValues = {};
    const scoreTimer = {};
    const scoreStep = {};
    const scoreMax = {};
    let restCount = scoreItems.length;
    scoreItems.forEach(scoreItem => {
      scoreValues[scoreItem.id] = 0;
      scoreTimer[scoreItem.id] = null;
      scoreMax[scoreItem.id] = parseInt(scoreItem.getAttribute('target'));
      const step = parseInt(scoreMax[scoreItem.id] / 120);
      scoreStep[scoreItem.id] = step > 1 ? step : 1;
    });
    const increaseScore = () => {
      scoreItems.forEach(scoreItem => {
        if (scoreTimer[scoreItem.id] || scoreItem.classList.contains('reached')) {
          return;
        }
        const rect = scoreItem.getBoundingClientRect();
        let isVisible = false;
        if (rect.top > 0 && rect.top < window.innerHeight) {
          isVisible = true;
        } else if (rect.bottom <= window.innerHeight && rect.bottom > 0) {
          isVisible = true;
        }
        if (isVisible) {
          scoreTimer[scoreItem.id] = setInterval(() => {
            scoreValues[scoreItem.id] += scoreStep[scoreItem.id];
            if (scoreValues[scoreItem.id] >= scoreMax[scoreItem.id]) {
              clearInterval(scoreTimer[scoreItem.id]);
              scoreTimer[scoreItem.id] = null;
              restCount--;
              scoreValues[scoreItem.id] = scoreMax[scoreItem.id];
              scoreItem.classList.add('reached');
            }
            scoreItem.innerHTML = `${scoreItem.getAttribute('prefix')}${scoreValues[scoreItem.id]}${scoreItem.getAttribute('suffix')}`;
          }, 50);
        }
      });
      if (restCount === 0) {
        document.removeEventListener('scroll', increaseScore);
      }
    }
    document.addEventListener('scroll', increaseScore);
  });


  const pricingSections = document.querySelectorAll('.shopify-section-pricing-new');
  pricingSections.forEach(pricingSection => {
    const breakpointEl = pricingSection.querySelector('.breakpoints');
    const breakpointListfromEl = {};
    const breakpointItems = breakpointEl.querySelectorAll('.breakpoint-item');
    let breakpointLength = breakpointItems.length;
    breakpointItems.forEach(breakpointItem => {
      const [minWidth, itemCount, gap] = breakpointItem.innerHTML.split('|');
      breakpointListfromEl[minWidth] = {
        slidesPerView: parseFloat(itemCount),
        spaceBetween: parseInt(gap),
      };
    });
    const breakpointList = breakpointLength > 0 ? breakpointListfromEl : {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      412: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 1.8,
        spaceBetween: 10,
      },
      900: {
        slidesPerView: 2.1,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 2.5,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 10,
      }
    };
    pricingSection.querySelectorAll('.tab-content').forEach(slider => {
      new Swiper(slider, {
        navigation: {
          nextEl: slider.querySelector('.swiper-button-next'),
          prevEl: slider.querySelector('.swiper-button-prev'),
        },
        breakpoints: {
          ...breakpointList
        },
      });
    });

    const pricingItems = pricingSection.querySelectorAll('.pricing-item');
    pricingItems.forEach(pricingItem => {
      pricingItem.querySelector('.link')?.addEventListener('click', () => {
        localStorage.setItem('pricing-item', pricingItem.getAttribute('key'));
      });
    });
  });

  const customReviewItems = document.querySelectorAll('.shopify-section-csn .review-item');
  customReviewItems.forEach(customReviewItem => {
    const reviewContentWrapper = customReviewItem.querySelector('.review-content-wrapper');
    const reviewContent = reviewContentWrapper.querySelector('.review-content');
    customReviewItem.querySelectorAll('.read-more').forEach(readMoreButton => {
      readMoreButton.addEventListener('click', (e) => {
        if (e.target.classList.contains('to-hide')) {
          reviewContentWrapper.classList.remove('show-all');
          reviewContent.style.maxHeight = '';
        } else {
          reviewContentWrapper.classList.add('show-all');
          reviewContent.style.maxHeight = `${reviewContent.scrollHeight}px`;
        }
      });
    });
    const checkHeight = () => {
      const maxHeight = parseInt(reviewContent.getAttribute('max-height'));
      if (maxHeight > reviewContent.scrollHeight) {
        reviewContentWrapper.classList.add('no-need-read-more');
      } else {
        reviewContentWrapper.classList.remove('no-need-read-more');
      }
    }
    checkHeight();
    window.addEventListener('resize', () => {
      checkHeight();
    });
  });
  const globalEnquireLink = document.querySelector('.global-enquire-link');
  if(globalEnquireLink) {
    const showPos = parseInt(globalEnquireLink.getAttribute('show-pos')) || 100;
    const isBigger = globalEnquireLink.hasAttribute('is_bigger');
    globalEnquireLink.classList.toggle('show',isBigger?window.scrollY >= showPos:window.scrollY < showPos);
    document.addEventListener('scroll',()=>{
      globalEnquireLink.classList.toggle('show',isBigger?window.scrollY >= showPos:window.scrollY < showPos);
    });
  }
  replaceSecondText();
});

const replaceSecondText = () => {
  const enquireLinks = document.querySelectorAll('.header .enquire-link');
  const enquireLinkPosList = [];
  let isNecessary = false;
  const contactModal = document.querySelector('.contact-form-modal');
  for (const enquireLink of enquireLinks) {
    const pos = parseInt(enquireLink.getAttribute('replace-pos')) || 0;
    if (!isNaN(pos) && pos >= 0) {
      enquireLinkPosList.push({
        el: enquireLink,
        isBigger: enquireLink.hasAttribute('is_bigger'),
        pos
      });
      isNecessary = true;
    }
  }
  if (isNecessary) {
    document.addEventListener('scroll', () => {
      for (const enquireLinkPos of enquireLinkPosList) {
        enquireLinkPos.el.classList.toggle('state-sticky', enquireLinkPos.isBigger?window.scrollY >= enquireLinkPos.pos:window.scrollY <= enquireLinkPos.pos);
      }
    });
  }
  for (const enquireLinkPos of enquireLinkPosList) {
    enquireLinkPos.el.classList.toggle('state-sticky', enquireLinkPos.isBigger?window.scrollY >= enquireLinkPos.pos:window.scrollY <= enquireLinkPos.pos);
    if(contactModal) {
      enquireLinkPos.el.addEventListener('click',(e)=>{
        if(enquireLinkPos.el.classList.contains('state-sticky')) {
          e.preventDefault();
          contactModal.classList.add('show');
        }
      });
    }
  }
}