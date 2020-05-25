export function saveInLocalStorage(nameDog, breedImageUrl, colorFont, typeFont, date) {
	const dogInfo = {
		nameDog,
		breedImageUrl,
		colorFont,
		typeFont,
		date
	};
	localStorage.setItem('dog-info', JSON.stringify(dogInfo));
}

export function isLocalStorageEmpty() {
	return !!localStorage.getItem('dog-info');
}

export function getInLocalStorage() {
	return localStorage.getItem('dog-info');
}
