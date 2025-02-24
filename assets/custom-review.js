document.addEventListener('DOMContentLoaded', () => {
  const customReviewLists = document.querySelectorAll('.shopify-section-custom-review .custom-review-list');
  document.addEventListener('scroll',(e)=>{
    if(window.innerWidth > 1023) {
      customReviewLists.forEach(customReview=> {
        parallex(customReview);
      });
    } else {
      customReviewLists.forEach(customReview=>{
        customReview.querySelectorAll('.custom-review-item').forEach(reviewItem=>{
          reviewItem.style.transform = 'none';
        });
      });
    }
  });
});
const parallex = (reviewList) => {
  if(typeof reviewList == 'object') {
    const rect = reviewList.getBoundingClientRect();
    if(rect.top > window.innerHeight || rect.bottom < 0) {
      return;
    }
    const isPlus = rect.top > 0;
    const isRange = rect.top * (-1) <= rect.height;
    const selfRatio = rect.top * (-1) / rect.height;
    const ratio = isPlus ? rect.top / window.innerHeight: (isRange)?selfRatio : rect.top;
    const oddTop = ratio > 0 ? isPlus ? ratio * (-150) + 75 : 24 + ratio * 26 : 50;
    const evenTop = ratio > 0 ? isPlus?ratio * 70 - 35:-18 + ratio * (-18): -36;
    const oddCustomReviewItems = reviewList.querySelectorAll('.custom-review-item:nth-child(odd)');
    const evenCustomReviewItems = reviewList.querySelectorAll('.custom-review-item:nth-child(even)');
    oddCustomReviewItems.forEach(reviewItem=>{
      reviewItem.style.transform = `translateY(${oddTop}px)`;
    });
    evenCustomReviewItems.forEach(reviewItem=>{
      reviewItem.style.transform = `translateY(${evenTop}px)`;
    });
    console.log(oddTop,evenTop);
  }
}