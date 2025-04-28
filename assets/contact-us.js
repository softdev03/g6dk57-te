document.addEventListener('DOMContentLoaded', () => {
	const contactForm = document.querySelector('.shopify-section-cfn');
	if (contactForm) {
		const contactFormWrapper = contactForm.closest('.shopify-section--contact-form-new');
		const nextButton = contactForm.querySelector('.next-step');
		const backButton = contactForm.querySelector('.back-step');
		const progressBar = contactForm.querySelector('.progress-track');
		const itemPercent = parseFloat(progressBar.getAttribute('item-percent'));
		const phoneRegex = /^(\+?[1-9]\d{0,2})?[-. ]?(\(?\d{3}\)?)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const checkForms = contactForm.querySelectorAll('.check-form')
		let isClickedInput = false;
		nextButton.addEventListener('click', (e) => {
			const currentStepSection = contactForm.querySelector('.form-step-section.show');
			if (testValidation(currentStepSection)) {
				const targetIndex = parseInt(currentStepSection.getAttribute('index')) + 1;

				const nextStepSection = contactForm.querySelector(`.form-step-section[index='${targetIndex}']`);
				if (nextStepSection) {
					currentStepSection.classList.remove('show');
					backButton.classList.add('show');
					nextStepSection.classList.add('show');
					updateProgressBar(targetIndex);
				}
			} else {
				e.preventDefault();
				return;
			}
			if (currentStepSection.classList.contains('final')) {
				nextButton.classList.remove('show');
				backButton.classList.remove('show');
				progressBar.closest('.progressbar').classList.remove('show');

				const phoneNumberPrefix = contactForm.querySelector('.country-item.selected .phone-number-prefix').innerHTML.replace(' ', '');
				const phoneField = contactForm.querySelector('.field.phone .phone-field-prefix');
				if (phoneField) {
					phoneField.value = phoneNumberPrefix;
				}
				checkForms.forEach(checkForm => {
					const inputList = checkForm.querySelectorAll('input');
					let index = 1;
					for (const input of inputList) {
						if (input.value === '') {
							input.remove();
						} else {
							input.setAttribute('name', `${input.getAttribute('name')}(${index++})]`);
						}
					}
				});
			} else {
				e.preventDefault();
			}
			keepScrollPos();
		});
		backButton.addEventListener('click', (e) => {
			e.preventDefault();
			const currentStepSection = contactForm.querySelector('.form-step-section.show');
			const targetIndex = parseInt(currentStepSection.getAttribute('index')) - 1;
			if (targetIndex > 0) {
				const beforeSection = contactForm.querySelector(`.form-step-section[index='${targetIndex}']`);
				if (beforeSection) {
					currentStepSection.classList.remove('show');
					beforeSection.classList.add('show');
					updateProgressBar(targetIndex);
					if (targetIndex === 1) {
						backButton.classList.remove('show');
					}
				}
			}
		});
		const selectedCountry = contactForm.querySelector('.selected-country');
		if (selectedCountry) {
			const selectedCountryImage = selectedCountry.querySelector('.selected-country img');
			const countryList = contactForm.querySelector('.country-phone-numbers');
			selectedCountry.addEventListener('click', () => {
				if (selectedCountry.classList.contains('open')) {
					selectedCountry.classList.remove('open');
					countryList.classList.remove('open');
				} else {
					selectedCountry.classList.add('open');
					countryList.classList.add('open');
				}
			});
			if (selectedCountryImage) {
				const selectCountry = (countryItem) => {
					contactForm.querySelector('.country-item.selected')?.classList.remove('selected');
					countryItem.classList.add('selected');
					const image = countryItem.querySelector('img');
					selectedCountry.setAttribute('max', countryItem.getAttribute('max'));
					if (image) {
						selectedCountryImage.src = image.src;
						selectedCountryImage.classList.remove('no-image');
					}
				}
				countryList.querySelectorAll('.country-item').forEach(countryItem => {
					countryItem.addEventListener('click', () => {
						selectCountry(countryItem);
						selectedCountry.click();
					});
					if (countryItem.classList.contains('default-country')) {
						selectCountry(countryItem);
					}
				});
			}
		}
		const testValidation = (stepSection) => {
			let result = true;
			if (stepSection.classList.contains('form-main')) {
				const fields = stepSection.querySelectorAll('.field');
				for (const field of fields) {
					if (field.classList.contains('phone')) {
						const len = parseInt(selectedCountry.getAttribute('max'));
						const value = field.querySelector('input').value.replace(' ', '');

						if (!phoneRegex.test(value)) {
							result = false;
							field.closest('.field-wrapper').classList.add('error');
						} else {
							if (value.length != len) {
								if (value.at(0) === '0' && value.length - 1 === len) {
									field.closest('.field-wrapper').classList.remove('error');
								} else {
									field.closest('.field-wrapper').classList.add('error');
									result = false;
								}
							} else {
								field.closest('.field-wrapper').classList.remove('error');
							}
						}
					} else if (field.classList.contains('email')) {
						const value = field.querySelector('input').value;
						if (value === '' || !emailRegex.test(value)) {
							field.closest('.field-wrapper').classList.add('error');
							result = false;
						} else {
							field.closest('.field-wrapper').classList.remove('error');
						}
					} else {
						if (field.querySelector('input').value === '') {
							field.closest('.field-wrapper').classList.add('error');
							result = false;
						} else {
							field.closest('.field-wrapper').classList.remove('error');
						}
					}
				}
			} else if (stepSection.classList.contains('check-form')) {
				if (stepSection.classList.contains('required')) {
					const checkedField = stepSection.querySelector('.check-field span.selected');
					if (!checkedField) {
						stepSection.classList.add('error');
						result = false;
					} else {
						stepSection.classList.remove('error');
					}
				}
			} else {
				if (stepSection.classList.contains('required')) {
					const input = stepSection.querySelector('.field.dropdown-field input');
					const value = input.value;
					if (value === '') {
						input.closest('.field-wrapper').classList.add('error');
						result = false;
					} else {
						input.closest('.field-wrapper').classList.remove('error');
					}
				}
			}
			if (!stepSection.classList.contains('real-time-test')) {
				stepSection.classList.add('real-time-test');
				realTimeTest(stepSection);
			}
			return result;
		}
		const realTimeTest = (stepSection) => {
			if (stepSection.classList.contains('form-main')) {
				stepSection.querySelectorAll('.field-wrapper').forEach(fieldWrapper => {
					fieldWrapper.querySelector('input').addEventListener('change', (e) => {
						const field = e.target.closest('.field');
						const value = e.target.value;
						if (value === '') {
							fieldWrapper.classList.add('error');
						} else {
							fieldWrapper.classList.remove('error');
						}
						if (field.classList.contains('phone')) {
							if (!phoneRegex.test(value)) {
								fieldWrapper.classList.add('error');
							}
						} else if (field.classList.contains('email')) {
							if (!emailRegex.test(value)) {
								fieldWrapper.classList.add('error');
							}
						}
					});
				});
			}
		}
		checkForms.forEach(checkForm => {
			const required = checkForm.classList.contains('required');
			const checkFields = checkForm.querySelectorAll('.check-field')
			checkFields.forEach(checkField => {
				checkField.addEventListener('click', (e) => {
					const label = checkField.querySelector('label');
					const checkbox = checkField.querySelector('span');
					const field = checkField.querySelector('input');
					if (!checkbox.classList.contains('selected')) {
						if (required) {
							checkForm.classList.remove('error');
						}
						checkbox.classList.add('selected');
						if(checkField.classList.contains('unique')) {
							checkFields.forEach(otherField=>{
								if(otherField !== checkField) {
									if(otherField.querySelector('span').classList.contains('selected')) {
										otherField.click();
									}
								}
							});
						} else {
							checkForm.querySelectorAll('.check-field.unique').forEach(uniqueCheckField=>{
								if(uniqueCheckField.querySelector('span').classList.contains('selected')) {
									uniqueCheckField.click();
								}
							});
						}
						field.value = label.innerHTML;
					} else {
						checkbox.classList.remove('selected');
						field.value = '';
						if (required) {
							if (!checkForm.querySelector('.check-field span.selected')) {
								checkForm.classList.add('error');
							}
						}
					}
				});
			});
		});
		const updateProgressBar = (index) => {
			const percent = itemPercent * index;
			progressBar.style.width = `${percent}%`;
		}
		contactForm.querySelectorAll('.dropdown-field').forEach(dropdownField => {
			const input = dropdownField.querySelector('input');
			const dropdown = dropdownField.querySelector('.dropdown');
			input.addEventListener('click', () => {
				dropdown.classList.add('show');
				isClickedInput = true;
			});
			dropdown.querySelectorAll('.dropdown-item').forEach(dropdownItem => {
				dropdownItem.addEventListener('click', (e) => {
					e.preventDefault();
					const v = dropdownItem.querySelector('label').innerHTML;
					const stepSection = dropdown.closest('.form-step-section');
					const secondaryField = stepSection.querySelector('.field.secondary');
					if (secondaryField) {
						const appearText = secondaryField.getAttribute('appear-text');
						if (appearText === v) {
							secondaryField.closest('.field-wrapper').classList.add('show');
						} else {
							secondaryField.closest('.field-wrapper').classList.remove('show');
						}
					}
					input.value = v;
					dropdown.closest('.field-wrapper').classList.remove('error');
					dropdown.classList.remove('show');
					dropdown.querySelector('.dropdown-item.selected')?.classList.remove('selected');
					dropdownItem.classList.add('selected');
				});
			});
		});
		contactForm.querySelector('.form-content')?.addEventListener('click', (e) => {
			if (isClickedInput) {
				isClickedInput = false;
			} else {
				contactForm.querySelector('.dropdown.show')?.classList.remove('show');
			}
		});
		const keepScrollPos = () => {
			const rect = contactFormWrapper.getBoundingClientRect();
			if(rect.top < 0) {
				contactFormWrapper.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		}
	}
});