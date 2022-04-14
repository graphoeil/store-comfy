// Imports
import { getElement } from '../utils.js';
import display from '../displayProducts.js';

// Fonction
const setupPrice = (store) => {
	const priceInput = getElement('.price-filter');
	const priceValue = getElement('.price-value');
	// Max price
	const prices = store.map((product) => {
		return product.price;
	});
	let maxPrice = Math.max(...prices);
	maxPrice = Math.ceil(maxPrice / 100);
	// Min price
	let minPrice = Math.min(...prices);
	minPrice = Math.ceil(minPrice / 100);
	priceInput.value = maxPrice;
	priceInput.max = maxPrice;
	priceInput.min = minPrice;
	// Display price
	priceValue.textContent = `Value : $${ maxPrice }`;
	// Event listener
	/* input event fire continually, change event only when stop moving */
	priceInput.addEventListener('input', () => {
		const value = Number(priceInput.value);
		priceValue.textContent = `Value : $${ value }`;
		let newStore = store.filter((product) => {
			return (product.price/100) <= value;
		});
		display(newStore, getElement('.products-container'), true);
		/* useless here, because we have min price ,-) */
		if (newStore.length < 1){
			const products = getElement('.products-container');
			products.innerHTML = `<h3 class="filter-error">Sorry, no product match your search.</h3>`;
		}
	});
};

// Export
export default setupPrice;