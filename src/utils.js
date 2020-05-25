import api from './api';

export function generateArrayOfProperties(properties) {
	const array = [];
	for(let propertie in properties) {
		array.push(propertie);
	}
	return array;
}
export function getSelectedValue(id) {
	const select = document.getElementById(id);
	return select.options[select.selectedIndex].value;
}


