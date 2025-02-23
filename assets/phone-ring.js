document.addEventListener('DOMContentLoaded', () => {
  const phoneRings = document.querySelectorAll('.shopify-section-phone-ring');
  if (phoneRings.length > 0) {
    phoneRings.forEach(phoneRing => {
      const rect = phoneRing.getBoundingClientRect();
      setupInitTop(phoneRing.querySelector('img'),rect);
    });
    document.addEventListener('scroll', () => {
      phoneRings.forEach(phoneRing => {
        const rect = phoneRing.getBoundingClientRect();
        if (isInScreen(rect)) {
          if (rect.top < 0) {
            phoneRing.querySelector('img').style.top = `${rect.top}px`;
          } else if (rect.bottom > window.innerHeight) {
            phoneRing.querySelector('img').style.top = `${(rect.bottom - window.innerHeight)}px`;
          }
        }
      });
    });
  }
});
const isInScreen = ({ top, bottom }) => {
  if (top < 0) {
    return bottom < window.innerHeight && bottom > 0;
  } else if (bottom > window.innerHeight) {
    return top > 0 && top < window.innerHeight;
  }
  return true;
}
const setupInitTop = (img,{ top, bottom }) => {
  if(img) {
    if (top < 0) {
      img.style.top = `${top / 3}px`;
    } else if (bottom > window.innerHeight) {
      img.style.top = `${(bottom - window.innerHeight) / 3}px`;
    }
  }
}