document.addEventListener('DOMContentLoaded', () => {
  const serviveLists = document.querySelectorAll('.shopify-section-service-list .service-list');
  let isMobile = true;
  if (serviveLists.length > 0) {
    document.addEventListener('scroll', () => {
      serviveLists.forEach(serviceList => {
        if (window.innerWidth >= 900) {
          isMobile = false;
          const rect = serviceList.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const ratio = rect.top / window.innerHeight;
            const overHalf = ratio >= 0.4;
            const serviceItems = serviceList.querySelectorAll('.service-item');
            if (serviceItems[0]) {
              serviceItems[0].style.transform = `translateY(${overHalf ? ratio * (-300) + 150 : 0}px)`;
            }
            if (serviceItems[1]) {
              serviceItems[1].style.transform = `translateY(${overHalf ? ratio * (-200) + 100 : 0}px)`;
            }
            if (serviceItems[2]) {
              serviceItems[2].style.transform = `translateY(${overHalf ? ratio * (-100) + 50 : 0}px)`;
            }
          }
        } else if(!isMobile) {
          isMobile = false;
          serviceList.querySelectorAll('.service-item').forEach(item => {
            item.style.transform = 'none';
          });
        }
      });
    });
  }
});