const mobileWidth = 749;

document.addEventListener('DOMContentLoaded', () => {
  const formSections = document.querySelectorAll('.shopify-section-effect-form');
  const effect = () => {
    formSections.forEach(effectFormSection => {
      const headingWrapper = effectFormSection.querySelector('.heading-wrapper');
      if (headingWrapper) {
        if (!headingWrapper.classList.contains('removed-effect')) {
          const headingRect = headingWrapper.getBoundingClientRect();
          if (headingRect.top <= window.innerHeight && headingRect.bottom >= 0) {
            const hTime = setInterval(() => {
              clearInterval(hTime);
              headingWrapper.querySelectorAll('.heading').forEach(heading => {
                heading.classList.remove('effect');
              });
            }, 700);
            headingWrapper.classList.add('removed-effect');
          }
        }
      }
      effectFormSection.querySelectorAll('.circle-image').forEach(circleImage => {
        rotateImage(circleImage);
      });
      effectFormSection.querySelectorAll('.payment-app-image').forEach(paymentAppImage => {
        movePaymentAppImage(paymentAppImage);
      });
    });
  };
  const transformEffect = (event) => {
    formSections.forEach(formSection => {
      formSection.querySelectorAll('.payment-app-image').forEach(paymentAppImage => {
        transformImage(paymentAppImage, event);
      });
    });
  }
  effect();
  transformEffect();
  document.addEventListener('scroll', effect);
  document.addEventListener('mousemove', (e) => {
    transformEffect(e);
  });
});

const rotateImage = (image) => {
  if (image) {
    const rect = image.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      const initAngle = parseInt(image.getAttribute('init-angle'));
      const targetAngle = parseInt(image.getAttribute('target-angle'));
      const ratio = rect.top / window.innerHeight;
      const currentAngle = initAngle + (targetAngle - initAngle) * ratio;
      image.style.transform = `rotate(${currentAngle}deg)`;
    }
  }
}
const movePaymentAppImage = (image) => {
  if (!image) {
    return;
  }
  const rect = image.getBoundingClientRect();
  if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    let targetX = 0;
    let targetY = 0;
    let currentTop = 0;
    let currentLeft = 0;
    if (window.innerWidth > mobileWidth) {
      targetX = parseInt(image.getAttribute('desktop-max-x'));
      targetY = parseInt(image.getAttribute('desktop-max-y'));
      currentTop = image.getAttribute('desktop-top');
      currentLeft = image.getAttribute('desktop-left');
    } else {
      targetX = parseInt(image.getAttribute('mobile-max-x'));
      targetY = parseInt(image.getAttribute('mobile-max-y'));
      currentTop = image.getAttribute('mobile-top');
      currentLeft = image.getAttribute('mobile-left');
    }
    const ratio = rect.top / window.innerHeight;
    image.style.left = `calc(${currentLeft} + ${parseInt(targetX * ratio)}px)`;
    image.style.top = `calc(${currentTop} + ${parseInt(targetY * ratio)}px)`;
    console.log(`${ratio} : ${targetX}`);
  }
}
const transformImage = (image, event) => {
  if (image && event) {
    const rect = image.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      let targetTranslateX = 0;
      let targetTranslateY = 0;
      let targetRotateX = 0;
      let targetRotateY = 0;
      if (window.innerWidth > mobileWidth) {
        targetTranslateX = parseInt(image.getAttribute('desktop-translate-x'));
        targetTranslateY = parseInt(image.getAttribute('desktop-translate-y'));
        targetRotateX = parseInt(image.getAttribute('desktop-rotate-x'));
        targetRotateY = parseInt(image.getAttribute('desktop-rotate-y'));
      } else {
        targetTranslateX = parseInt(image.getAttribute('mobile-translate-x'));
        targetTranslateY = parseInt(image.getAttribute('mobile-translate-y'));
        targetRotateX = parseInt(image.getAttribute('mobile-rotate-x'));
        targetRotateY = parseInt(image.getAttribute('mobile-rotate-y'));
      }
      const initTranslateX = targetTranslateX * -1;
      const initTranslateY = targetTranslateY * -1;
      const initRotateX = targetRotateX * -1;
      const initRotateY = targetRotateY * -1;
      const xRatio = event.clientX / window.innerWidth;
      const yRatio = event.clientY / window.innerHeight;
      image.style.transform = `translate(${initTranslateX + (targetTranslateX - initTranslateX) * xRatio}px, ${initTranslateY + (targetTranslateY - initTranslateY) * yRatio}px) rotateX(${initRotateX + (targetRotateX - initRotateX) * yRatio}deg) rotateY(${initRotateY + (targetRotateY - initRotateY) * xRatio}deg)`;
      console.log(`translate(${initTranslateX + (targetTranslateX - initTranslateX) * xRatio}px, ${initTranslateY + (targetTranslateY - initTranslateY) * yRatio}px) rotateX(${initRotateX + (targetRotateX - initRotateX) * yRatio}deg) rotateY(${initRotateY + (targetRotateY - initRotateY) * xRatio}deg)`);
    }
  }
}