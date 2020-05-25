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
export function formatDate(date) {
	const dateNow = new Date(date);
	const day = dateNow.getDate() < 10 ? `0${dateNow.getDate()}` : dateNow.getDate();
	const month = dateNow.getMonth() < 10 ? `0${dateNow.getMonth()}` : dateNow.getMonth();
	const year = dateNow.getFullYear();
	return `${day}/${month}/${year}`;
}

