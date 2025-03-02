document.addEventListener('DOMContentLoaded', () => {
	const allSections = document.querySelectorAll('.shopify-section-aib-list');
	const effect = () => {
		allSections.forEach(section => {
			section.querySelectorAll('.payment-app-image').forEach(paymentImage => {
				const rect = paymentImage.getBoundingClientRect();
				if (rect.top <= window.innerHeight && rect.bottom >= 0) {
					const initPos = parseInt(paymentImage.getAttribute('init-pos'));
					const targetpos = parseInt(paymentImage.getAttribute('target-pos'));
					const ratio = rect.top / window.innerHeight;
					const currentPos = initPos + (targetpos - initPos) * ratio;
					paymentImage.style.left = `${currentPos}%`;
				}
			});
			section.querySelectorAll('.circle-image').forEach(circleImage => {
				const rect = circleImage.getBoundingClientRect();
				if (rect.top <= window.innerHeight && rect.bottom >= 0) {
					circleImage.classList.remove('effect');
					const initAngle = parseInt(circleImage.getAttribute('init-angle'));
					const targetAngle = parseInt(circleImage.getAttribute('target-angle'));
					const ratio = rect.top / window.innerHeight;
					const currentAngle = initAngle + (targetAngle - initAngle) * ratio;
					circleImage.style.transform = `rotate(${currentAngle}deg)`;
				}
			});
		});
	}
	effect();
	document.addEventListener('scroll',()=>{
		effect();
	});
});