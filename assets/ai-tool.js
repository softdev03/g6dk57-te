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
		const toolName = aiToolSection.getAttribute('tool-name');
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
			if (inputArea.value === '') {
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
			generateText(toolName, language, tone, writingStyle, inputArea.value).then((generatedValue) => {
				aiToolSection.classList.remove('generating');
				inputArea.removeAttribute('readonly');
				writingStyleSelect.removeAttribute('disabled');
				toneSelect.removeAttribute('disabled');
				languageSelect.removeAttribute('disabled');
				fileInput?.removeAttribute('disabled');

				const queryText = inputArea.value.replace(/\n/g, '<br />');
				generatedResult.innerHTML += `
							<div class="query">${queryText}</div>
							${generatedValue.replace(/\n/g, '<br />')}
						`;
				output.scrollTo({ top: oldHeight, behavior: 'smooth' });
				inputArea.value = '';
				enterButton.classList.remove('disable');

				const inputRect = input.getBoundingClientRect();
				if (inputRect.bottom > window.innerHeight) {
					const dif = inputRect.bottom - window.innerHeight;
					const currentScrollTop = document.documentElement.scrollTop;
					document.documentElement.scrollTo({ top: currentScrollTop + dif, behavior: 'smooth' });
				}
			}).catch((error) => {
				console.log(error);
				aiToolSection.classList.remove('generating');
				inputArea.removeAttribute('readonly');
				writingStyleSelect.removeAttribute('disabled');
				toneSelect.removeAttribute('disabled');
				languageSelect.removeAttribute('disabled');
				fileInput?.removeAttribute('disabled');
				enterButton.classList.remove('disable');
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
		enterButton?.addEventListener('click', () => {
			if (enterButton.classList.contains('disable')) {
				return;
			}
			generateResult();
		});
	}
});

const generateText = (toolName, language, tone, writingStyle, inputText) => {
	return new Promise(async (resolve, reject) => {
		const myHeaders = new Headers({
			"Content-Type": "application/x-www-form-urlencoded"
		});

		const urlencoded = new URLSearchParams();
		urlencoded.append("tool_name", toolName);
		urlencoded.append("input_text", inputText);
		urlencoded.append("tone", tone);
		urlencoded.append("language", language);
		urlencoded.append("writing_style", writingStyle);
		const res = await fetch('https://ai-tool-hun7.onrender.com/api/chat', {
			method: 'POST',
			headers: myHeaders,
			// mode: 'no-cors',					//don't use this
			body: urlencoded,
			redirect: "follow"
		});
		const data = await res.text();
		if (!res.ok) {
			reject(data);
		} else {
			resolve(data);
		}
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