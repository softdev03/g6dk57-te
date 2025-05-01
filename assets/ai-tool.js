const APIKEY = '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';
const model = 'gpt-4o-mini';
const additionalPattern = `
	※ : The writing style must be [writing style] and please use "[language]" language for all of the content.
	The content should be written in a [tone] tone.
`;
document.addEventListener('DOMContentLoaded', () => {
	const aiToolSection = document.querySelector('.shopify-section-ai-tools');
	if (aiToolSection) {
		new Swiper('.shopify-section-ai-tools .other-tools', {
			slidesPerView: 'auto',
			spaceBetween: 10
		});

		const inputArea = aiToolSection.querySelector('textarea');
		const languageSelect = aiToolSection.querySelector('.language select');
		const toneSelect = aiToolSection.querySelector('.tone select');
		const writingStyleSelect = aiToolSection.querySelector('.writing-style select');
		const input = aiToolSection.querySelector('.input');
		const pattern = aiToolSection.querySelector('.pattern').innerHTML;
		const output = aiToolSection.querySelector('.output');
		const generatedResult = output.querySelector('.output .result');
		const selectedImage = aiToolSection.querySelector('.selected-file');
		const fileInput = aiToolSection.querySelector('#photo');
		const enterButton = aiToolSection.querySelector('.enter-button');

		let language = languageSelect.value;
		let writingStyle = writingStyleSelect.value;
		let tone = toneSelect.value;
		let selectedImagePath = '';

		const generateResult = () => {
			if(inputArea.value === '') {
				return;
			}
			aiToolSection.classList.add('generating');
			enterButton.classList.add('disable');
			inputArea.setAttribute('readonly', true);
			writingStyleSelect.setAttribute('disabled', true);
			toneSelect.setAttribute('disabled', true);
			languageSelect.setAttribute('disabled', true);
			fileInput?.setAttribute('disabled', true);
			let oldHeight = generatedResult.scrollHeight
			output.scrollTo({ top: oldHeight, behavior: 'smooth' });
			generateText(pattern, language, tone, writingStyle, inputArea.value).then((generatedValue) => {
				aiToolSection.classList.remove('generating');
				inputArea.removeAttribute('readonly');
				writingStyleSelect.removeAttribute('disabled');
				toneSelect.removeAttribute('disabled');
				languageSelect.removeAttribute('disabled');
				fileInput?.removeAttribute('disabled');
				let content = '';
				for (const choice of generatedValue.choices) {
					content += wrapText(choice.message.content);
				}
				if (generatedResult.innerHTML !== '') {
					oldHeight += 20;
				}
				generatedResult.innerHTML += `
							<div class="query">${inputArea.value.replace(/\n/g, '<br />')}</div>
							${content}
						`;
				output.scrollTo({ top: oldHeight, behavior: 'smooth' });
				inputArea.value = '';
				enterButton.classList.remove('disable');

				const inputRect = input.getBoundingClientRect();
				if(inputRect.bottom > window.innerHeight) {
					const dif = inputRect.bottom - window.innerHeight;
					const currentScrollTop = document.documentElement.scrollTop;
					document.documentElement.scrollTo({top: currentScrollTop + dif, behavior: 'smooth'});
				}
			}).catch((error) => {
				console.log(error);
			});
		}
		inputArea.addEventListener('keypress', (e) => {
			if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
				e.preventDefault();
				generateResult();
			}
		});
		languageSelect.addEventListener('change', () => {
			language = languageSelect.value;
		});
		writingStyleSelect.addEventListener('change', () => {
			writingStyle = writingStyleSelect.value;
		});
		toneSelect.addEventListener('change', () => {
			tone = toneSelect.value;
		});
		fileInput?.addEventListener('change', () => {
			if (fileInput.value !== '') {
				selectedImage.innerHTML = `<img src="${fileInput.value}" />`;
				selectedImagePath = fileInput.value;
			}
		});
		enterButton?.addEventListener('click',()=>{
			if(enterButton.classList.contains('disable')) {
				return;
			}
			generateResult();
		});
	}
});

const generateText = (pattern, language, tone, writingStyle, inputText) => {
	return new Promise((resolve, reject) => {
		if (!pattern || !inputText) {
			reject('Pattern must be filled');
		}
		let newPattern;
		if (!language || !tone || !writingStyle) {
			newPattern = pattern.replace('[pattern]', inputText);
			newPattern += additionalPattern.replace('[language]', 'English').replace('[writing style]', 'Professional').replace('[tone]', 'Formal');
		} else {
			newPattern = pattern.replace('[pattern]', inputText);
			newPattern += additionalPattern.replace('[language]', language).replace('[writing style]', writingStyle).replace('[tone]', tone);
		}
		fetch(' https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${APIKEY}`
			},
			body: JSON.stringify({
				model: model,
				messages: [
					{
						role: "user",
						content: newPattern
					}
				]
			})
		}).then(res => res.json()).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		});
	});
}
const wrapText = (text) => {
	const textItems = text.replace(/`/g, '').replace(/html/g, '').split('\n');
	for (const [index, textItem] of textItems.entries()) {
		if (textItem.indexOf('<') === -1 && textItem.indexOf('>') === -1 && textItem.indexOf('</') === -1 && textItem.trim() !== '') {
			textItems[index] = `<span>${textItem}</span>`;
		}
	}
	return textItems.join('');
}