document.addEventListener('DOMContentLoaded', () => {
  const horizontalMoveEffect = () => {
    const allImages = document.querySelectorAll('.shopify-section-about-hero .image');
    allImages.forEach(image=>{
      const rect = image.getBoundingClientRect();
      if(rect.top <= window.innerHeight && rect.bottom >= 0) {
        const ratio = rect.top / window.innerHeight;
        image.style.transform = `translateX(${ratio * 100 - 20}px)`;
      }
    });
  }
  horizontalMoveEffect();
  document.addEventListener('scroll',()=>{
    horizontalMoveEffect();
  });
});