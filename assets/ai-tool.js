const APIKEY = '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';
const fuckingStrings = ['"```html"','"```"'];
const model = 'gpt-4o-mini';
const additionalPattern = `
	MOST IMPORTANT: The language to output for all content must be [language] and the writing style must be [writing style].
	NOTE: FORMAT THE CONTENT USING HTML TAGS LIKE <ul>,<li> without missing descriptions.
	IMPORTANT: 	Don't contain fucking string like '${fuckingStrings.join(',')}, NEVER!, NEVER!, NEVER!'.
	IMPORTANT: Please format the content like other AI such as monica or chatgpt or gemini.
	IMPORTANT: Don't use <a> tag to link something.
	IMPORTANT: Don't use the language for the site urls.
	Output format: 
		Introduction & overview & brief(Please include some greetings such as "sure or of course or here", Replace greeting word every times.): Must be contained.
		Items(※ include index number for each items)
			Each Item must be formatted like : {index number} : {item content}
		Rest Description & simple greeting like "feel free to ask if you have any questions"
		※ : Please don't include words of the pattern as possible.
`;
document.addEventListener('DOMContentLoaded', () => {
	const aiToolSection = document.querySelector('.shopify-section-ai-tools');
	if (aiToolSection) {
		new Swiper('.shopify-section-ai-tools .other-tools', {
			slidesPerView: 'auto',
			spaceBetween: 10,
			centeredSlides: true
		});

		const inputArea = aiToolSection.querySelector('textarea');
		const languageSelect = aiToolSection.querySelector('.language select');
		const toneSelect = aiToolSection.querySelector('.tone select');
		const writingStyleSelect = aiToolSection.querySelector('.writing-style select');
		const input = aiToolSection.querySelector('.input');
		const pattern = input.getAttribute('pattern');
		const generatedResult = aiToolSection.querySelector('.output .result');

		input.removeAttribute('pattern');

		let language = languageSelect.value;
		let writingStyle = writingStyleSelect.value;
		let tone = toneSelect.value;

		inputArea.addEventListener('keypress', (e) => {
			if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
				aiToolSection.classList.add('generating');
				inputArea.setAttribute('readonly',true);
				generateText(pattern, language, tone, writingStyle, inputArea.value).then((generatedValue) => {
					e.preventDefault();
					aiToolSection.classList.remove('generating');
					generatedResult.innerHTML = '';
					inputArea.value = '';
					inputArea.removeAttribute('readonly');
					for (const choice of generatedValue.choices) {
						generatedResult.innerHTML += choice.message.content.replace(/\n/g,'<br />');
					}
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