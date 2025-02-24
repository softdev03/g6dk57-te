document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.shopify-section-home-advertise');
  const image = section?.querySelector('.image');
  if(image) {
    document.addEventListener('scroll',()=>{
      const rect = section.getBoundingClientRect();
      if(rect.top < window.innerHeight && rect.bottom > 0) {
        const ratio = rect.top / window.innerHeight;
        if(ratio < 0) {
          image.style.transform = `translateY(50px)`;
        } else {
          image.style.transform = `translateY(${50 - ratio * 100}px)`;
        }
      }
    });
  }
});