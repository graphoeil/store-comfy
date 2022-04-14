// Imports
import { getStorageItem, setStorageItem } from './utils.js';

// Variables
let store = getStorageItem('comfyStore');

// Fonctions
//
// Init the store, only in index.html, in products pages we'll use localStorage ,-)
const setupStore = (products) => {
	// Defining the store
	store = products.map((product) => {
		const { id, fields:{ featured, name, price, company, colors, image:img } } = product;
		const image = img[0].thumbnails.large.url;
		return { id, featured, name, price, company, colors, image };
	});
	// Store the store in the localStorage, then the store is reachable from any pages
	setStorageItem('comfyStore', store);
};

// Search product
const findProduct = (id) => {
	let product = store.find((p) => {
		return p.id === id;
	});
	return product;
};

// Exports
export { store, setupStore, findProduct };