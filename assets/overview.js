document.addEventListener('DOMContentLoaded', () => {
  const overview = document.querySelector('.shopify-section-overview');
  if (overview) {
    const imageContent = overview.querySelector('.image-content');
    const overviewLeftImages = document.querySelectorAll('.shopify-section-overview .left-image');
    const overviewRightImages = document.querySelectorAll('.shopify-section-overview .right-image');
    const overviewClapImages = document.querySelectorAll('.shopify-section-overview .clap-image');
    const overviewPaymentAppImages = document.querySelectorAll('.shopify-section-overview .payment-app-image');
    document.addEventListener('mouseover', (e) => {
      const xRatio = e.clientX / window.innerWidth;
      const yRatio = e.clientY / window.innerHeight;
      effectImages(xRatio, yRatio, {
        leftImage: overviewLeftImages,
        rightImage: overviewRightImages,
        clapImage: overviewClapImages,
        paymentAppImage: overviewPaymentAppImages
      });
    });
    const showImages = () => {
      const rect = imageContent.getBoundingClientRect();
      if (rect.top < window.innerHeight || rect.bottom > 0) {
        document.removeEventListener('scroll', showImages);
        imageContent?.classList.remove('not');
        let hTime = setInterval(() => {
          clearInterval(hTime);
          imageContent?.querySelector('.clap-image')?.classList.add('show');
        }, 450);
        return true;
      }
      return false;
    }
    if (!showImages()) {
      document.addEventListener('scroll', showImages);
    }
  }
})

const effectImages = (xRatio, yRatio, { leftImage, rightImage, clapImage, paymentAppImage }) => {
  const { leftImageTransform, rightImageTransform, clapImageTransform, paymentAppTransform } = prepareTransform(xRatio, yRatio);
  effectImage(leftImage, leftImageTransform);
  effectImage(rightImage, rightImageTransform);
  effectImage(clapImage, clapImageTransform);
  effectImage(paymentAppImage, paymentAppTransform);
}
const prepareTransform = (xRatio, yRatio) => {
  const paymentAppTransform = {
    translateX: (xRatio * (-30) + 15),
    translateY: (yRatio * (-30) + 15),
    rotateX: (yRatio * (-40) + 20),
    rotateY: (xRatio * 40 - 20)
  };
  const leftImageTransform = {
    translateX: (xRatio * 10 - 5),
    translateY: (yRatio * 10 - 5),
    rotateX: (yRatio * (-4) + 2),
    rotateY: (xRatio * 4 - 2)
  };
  const rightImageTransform = {
    translateX: (xRatio * (-10) + 5),
    translateY: (yRatio * (-10) + 5),
    rotateX: (yRatio * 4 - 2),
    rotateY: (xRatio * (-4) + 2)
  };
  const clapImageTransform = {
    translateX: 0,
    translateY: 0,
    rotateX: (yRatio * (-1) + 0.5),
    rotateY: (xRatio - 0.5)
  }
  return {
    leftImageTransform, rightImageTransform, paymentAppTransform, clapImageTransform
  };
}
const effectImage = (imageList, transform) => {
  if (imageList && transform) {
    imageList.forEach(item => {
      item.style.transform = `translateX(${transform.translateX}px) translateY(${transform.translateY}px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`;
    });
  }
}