import api, { getImageDog } from './api.js';
import { getSelectedValue, formatDate } from './utils.js';
import { saveInLocalStorage, isLocalStorageEmpty, getInLocalStorage } from './storage.js';
import { generateOptionsInSelect, changeFont, changeColor, renderInCard, showMessage, setImageOnCard } from './ui.js';
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
			generateOptionsInSelect(response.data.message, this.breedsEl);
			return;
		}catch(err) {
			console.log(err);
		}
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
					setImageOnCard(e.target.value);
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
			if(this.validInput()) {
				const dogNameValue = this.dogNameInputEl.value;
				const imageUrl = this.cardImage.getAttribute('src');
				const colorValue = getSelectedValue('colors-select');
				const fontValue = getSelectedValue('fonts-select');
				const breedValue = getSelectedValue('breeds-select');
				const date = new Date().getTime();
				saveInLocalStorage(dogNameValue, imageUrl, colorValue, fontValue, date, breedValue);
				showMessage('success', 'Salvo com sucesso');
			} else {
				return;
			}
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
			showMessage('success', `Salvo em ${formatDate(date)}`)
			renderInCard(breedImageUrl, nameDog, colorFont, typeFont, breedValue);
		}
	}
	validInput() {
		if(!this.dogNameInputEl.value) {
			showMessage('error', 'Preencha o campo de nome');
			return;
		}if(!getSelectedValue('breeds-select')) {
			console.log(!getSelectedValue('breeds-select'));
			showMessage('error', 'Selecione uma raça');
			return;
		}if(!getSelectedValue('colors-select')) {
			showMessage('error', 'Selecione uma cor');
			return;
		}if(!getSelectedValue('fonts-select')) {
			showMessage('error', 'Selecione uma fonte');
			return;
		}
		return true;
	}
}

const meuapp = new App();
