const APIKEY = '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';
const fuckingStrings = ['"```html"','"```"',"introduction","overview","brief","items", "index"];
const model = 'gpt-4o-mini';
const additionalPattern = `
	NOTE: FORMAT THE CONTENT USING HTML TAGS LIKE <ul>,<li> without missing descriptions.
	IMPORTANT: 	Don't include fucking string like '${fuckingStrings.join(',')}, NEVER!, NEVER!, NEVER!'.
	IMPORTANT: Please format the content like other AI such as monica or chatgpt or gemini.
	IMPORTANT: Don't use <a> tag to link something.
	IMPORTANT: Don't use the language for the site urls.
	And please use h2 tag for heading and h3 tag for sub heading.
	IMPORTANT: Please use English for domains.
	※ : The writing style must be [writing style] and please translate all of the content into [language].
	I need only translated content. However I don't need original content, understand me???.
	Output format: 
		Introduction & overview & brief(Please include some greetings such as "sure or of course or here", Replace greeting word every times.:Must be contained.: Don't use heading tags for this! NEVER! NEVER!)
		Items(※ include index number for each items and the count of the items must be the count of the items in this pattern. the default is over 10.)
			Each Item must be formatted like : {index number} : {item content}
		Rest Description & simple greeting like "feel free to ask if you have any questions"
		※ : Please don't include words of the pattern as possible.
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
		const pattern = input.getAttribute('pattern');
		const generatedResult = aiToolSection.querySelector('.output .result');
		const selectedImage = aiToolSection.querySelector('.selected-file');
		const fileInput = aiToolSection.querySelector('#photo');

		input.removeAttribute('pattern');

		let language = languageSelect.value;
		let writingStyle = writingStyleSelect.value;
		let tone = toneSelect.value;
		let selectedImagePath = '';

		inputArea.addEventListener('keypress', (e) => {
			if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
				aiToolSection.classList.add('generating');
				inputArea.setAttribute('readonly',true);
				writingStyleSelect.setAttribute('disabled',true);
				toneSelect.setAttribute('disabled',true);
				languageSelect.setAttribute('disabled',true);
				fileInput?.setAttribute('disabled',true);
				generateText(pattern, language, tone, writingStyle, inputArea.value).then((generatedValue) => {
					e.preventDefault();
					aiToolSection.classList.remove('generating');
					// generatedResult.innerHTML = '';
					inputArea.removeAttribute('readonly');
					writingStyleSelect.removeAttribute('disabled');
					toneSelect.removeAttribute('disabled');
					languageSelect.removeAttribute('disabled');
					fileInput?.removeAttribute('disabled');
					let content = '';
					for (const choice of generatedValue.choices) {
						content += wrapText(choice.message.content);
					}
					generatedResult.innerHTML =  `
						<div class="query">${inputArea.value.replace(/\n/g,'<br />')}</div>
						${content}
						${generatedResult.innerHTML}
					`;
					inputArea.value = '';
				}).catch((error) => {
					console.log(error);
				});
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
		fileInput?.addEventListener('change',()=>{
			if(fileInput.value !== '') {
				selectedImage.innerHTML = `<img src="${fileInput.value}" />`;
				selectedImagePath = fileInput.value;
			}
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
			newPattern = pattern.replace('[pattern]', inputText).replace('[tone]', 'Formal');
			newPattern += additionalPattern.replace('[language]', 'English').replace('[writing style]', 'Professional');
		} else {
			newPattern = pattern.replace('[pattern]', inputText).replace('[tone]', tone);
			newPattern += additionalPattern.replace('[language]', language).replace('[writing style]', writingStyle);
		}
		console.log(newPattern);
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
	const textItems = text.replace(/`/g,'').replace(/html/g,'').split('\n');
	for (const [index,textItem] of textItems.entries()) {
		if(textItem.indexOf('<') === -1 && textItem.indexOf('>') === -1 && textItem.indexOf('</') === -1 && textItem.trim() !== '') {
			textItems[index] = `<span>${textItem}</span>`;
		}
	}
	return textItems.join('');
}