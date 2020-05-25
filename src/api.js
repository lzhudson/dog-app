import axios from 'axios';

const api = axios.create({
	baseURL: 'https://dog.ceo/api/'
});

export async function getImageDog(dogName) {
	const response = await api.get(`breed/${dogName}/images`);
	const { message } = response.data;
	return message[0];
}

export default api;
