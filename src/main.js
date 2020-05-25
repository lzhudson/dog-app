import api, { getImageDog } from './api.js';
import { getSelectedValue } from './utils.js';
import { saveInLocalStorage, isLocalStorageEmpty, getInLocalStorage } from './storage.js';
import { generateOptionsInSelect, changeFont, changeColor, renderInCard, showMessage } from './ui.js';
import './assets/scss/style.scss';

class App {
	constructor() {
		this.dogNameInputEl = document.getElementById('dog-name');
		this.cardNameDog = document.getElementById('card-dog-name');
		this.cardImage = document.getElementById('card-dog-image');
		this.breedsEl = document.getElementById('breeds-select');
		this.colorsEl = document.getElementById('colors-select');
		this.fontsEl = document.getElementById('fonts-select');
		this.colors = ['Vermelho', 'Azul', 'Verde', 'Amarelo', 'Roxo'];
		this.fonts = ['Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald'];
		this.breeds = [];
		this.render();
	}
	async getBreeds() {
		try {
			const response = await api.get(`breeds/list/all`);
			await generateOptionsInSelect(response.data.message, this.breedsEl);
			return;
		}catch(err) {
			console.log(err);
		}
	}
	generateOptionsInSelect(values, field) {
		values.forEach(value => {
			let optionEl = document.createElement('option');
			optionEl.setAttribute('value', value);
			optionEl.appendChild(document.createTextNode(value));
			field.appendChild(optionEl);
		});
		return;
	}
	handleChangeInput() {
		const input = document.getElementById('dog-name');
		input.addEventListener('keyup', () => {
			let dogNameInputEl = document.getElementById('card-dog-name');
			dogNameInputEl.textContent = input.value;
		});
	}
	handleChangeSelect() {
		const selects = document.querySelectorAll('select');
		selects.forEach(select => {
			select.addEventListener('change', (e) =>{
				if(e.target.id === 'breeds-select') {
					async function setImageOnCard() {
						const cardDogImageEl = document.getElementById('card-dog-image');
						const getImageUrl = await getImageDog(e.target.value);
						cardDogImageEl.setAttribute('src', getImageUrl);
					}
					setImageOnCard();
				}
				if(e.target.id === 'fonts-select') {
					changeFont(e.target.value);
				}
				if(e.target.id === 'colors-select') {
					changeColor(e.target.value);
				}
			})
		})
	}
	handleOnSubmit() {
		const formEl = document.getElementById('form-dog');
		formEl.addEventListener('submit', (event) => {
			event.preventDefault();
			const dogNameValue = this.dogNameInputEl.value;
			const imageUrl = this.cardImage.getAttribute('src');
			const colorValue = getSelectedValue('colors-select');
			const fontValue = getSelectedValue('fonts-select');
			const breedValue = getSelectedValue('breeds-select');
			const date = new Date().getTime();
			saveInLocalStorage(dogNameValue, imageUrl, colorValue, fontValue, date, breedValue);
			showMessage('sucess', 'Deu certo salvar');
			
		});
	}
	async render() {
		this.breeds = await this.getBreeds();
		generateOptionsInSelect(this.colors, this.colorsEl);
		generateOptionsInSelect(this.fonts, this.fontsEl);
		this.handleChangeInput();
		this.handleOnSubmit();
		this.handleChangeSelect();
		if(isLocalStorageEmpty()) {
			const { nameDog, breedImageUrl, colorFont, typeFont, date, breedValue }  = JSON.parse(getInLocalStorage());
			renderInCard(breedImageUrl, nameDog, colorFont, typeFont, breedValue);
		}
	}
}

const meuapp = new App();
