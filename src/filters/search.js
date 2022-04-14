// Imports
import { getElement } from '../utils.js';
import display from '../displayProducts.js';

// Function
const setupSearch = (store) => {
	// Text search
	const form = getElement('.input-form');
	const nameInput = getElement('.search-input');
	let searchTimer = null;
	form.addEventListener('keyup', () => {
		if (searchTimer){ clearTimeout(searchTimer); }
		searchTimer = setTimeout(() => {
			const value = nameInput.value;
			if (value){
				const newStore = store.filter((product) => {
					let { name } = product;
					name = name.toLowerCase();
					if (name.startsWith(value)){
						return product;
					}
				});
				if (newStore.length < 1){
					const products = getElement('.products-container');
					products.innerHTML = `<h3 class="filter-error">Sorry, no product match your search.</h3>`;
				} else {
					display(newStore, getElement('.products-container'), true);
				}
			} else {
				// Empty field, display all store
				display(store, getElement('.products-container'));
			}
		},200);
	});
};

// Export
export default setupSearch;