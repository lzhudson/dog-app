import { generateArrayOfProperties } from './utils';

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
		"Yellow": "yellow",
		"Roxo": "Roxo"
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
export function renderInCard(imageUrl, dogName, colorFont, typeFont) {
	const dogNameInputEl = document.getElementById('dog-name');
	dogNameInputEl.value = dogName;
	const cardNameDog = document.getElementById('card-dog-name');
	cardNameDog.textContent = dogName;
	const cardImage = document.getElementById('card-dog-image');
	cardImage.src = imageUrl; 
	changeFont(typeFont);
	changeColor(colorFont);
	changeSelect(imageUrl.slice(30, imageUrl.lastIndexOf('/')), 'breeds-select');
}

