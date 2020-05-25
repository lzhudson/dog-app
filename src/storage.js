export function saveInLocalStorage(nameDog, breedImageUrl, colorFont, typeFont, date, breedValue) {
	const dogInfo = {
		nameDog,
		breedImageUrl,
		colorFont,
		typeFont,
		date,
		breedValue
	};
	localStorage.setItem('dog-info', JSON.stringify(dogInfo));
}

export function isLocalStorageEmpty() {
	return !!localStorage.getItem('dog-info');
}

export function getInLocalStorage() {
	return localStorage.getItem('dog-info');
}
