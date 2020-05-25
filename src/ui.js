import { generateArrayOfProperties } from './utils';
import { getImageDog } from './api.js';

export function generateOptionsInSelect(values, field) {
	let options = null;
	Array.isArray(values) ? options = values : options = generateArrayOfProperties(values);
	options.forEach(value => {
		let optionEl = document.createElement('option');
		optionEl.setAttribute('value', value);
		optionEl.appendChild(document.createTextNode(`${value.slice(0, 1).toUpperCase() + value.slice(1, )}`));
		field.appendChild(optionEl);
	});
	return;
}
export async function setImageOnCard(valueSelect) {
	if(!valueSelect) return;
	const cardDogImageEl = document.getElementById('card-dog-image');
	const getImageUrl = await getImageDog(valueSelect);
	cardDogImageEl.setAttribute('src', getImageUrl);
}
export function changeFont(typeFont) {
	const dogNameEl = document.getElementById('card-dog-name');
	dogNameEl.style.fontFamily = typeFont;
}
export function changeColor(color) {
	const dogNameEl = document.getElementById('card-dog-name');
	const colors = {
		"Vermelho": "red",
		"Azul": "blue",
		"Verde": "green",
		"Amarelo": "yellow",
		"Roxo": "purple"
	}
	dogNameEl.style.color = colors[color];
}
function changeSelect(valueEl , selectId) {
	const selectElement = document.getElementById(selectId);
	const selectOptions = selectElement.options;
	for (let opt, j = 0; opt = selectOptions[j]; j++) {
		if (opt.value == valueEl) {
			selectElement.selectedIndex = j;
			break;
		}
	}
}

export function showMessage(type, message) {
	if(!!document.querySelector('.message')) {
		hideMessage();
	}
	const messageEl = document.createElement('div');
	messageEl.classList.add('message', `${type}`);
	const messageTextEl = document.createElement('p');
	messageTextEl.style.color = 'white';
	messageTextEl.textContent = message;
	messageEl.appendChild(messageTextEl);
	document.body.appendChild(messageEl);
	setTimeout(() => {
		hideMessage()
	}, 2000);
}
function hideMessage() {
	document.querySelector('.message').parentNode.removeChild(document.querySelector('.message'));
}

export function renderInCard(imageUrl, dogName, colorFont, typeFont, breedValue) {
	const dogNameInputEl = document.getElementById('dog-name');
	dogNameInputEl.value = dogName;
	const cardNameDog = document.getElementById('card-dog-name');
	cardNameDog.textContent = dogName;
	const cardImage = document.getElementById('card-dog-image');
	cardImage.src = imageUrl; 
	changeFont(typeFont);
	changeColor(colorFont);
	changeSelect(breedValue, 'breeds-select');
	changeSelect(colorFont, 'colors-select');
	changeSelect(typeFont, 'fonts-select');
}

