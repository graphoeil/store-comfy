// Global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// Filter imports
import setupSearch from '../filters/search.js';
import setupCompanies from '../filters/companies.js';
import setupPrice from '../filters/price.js';
// Specific imports
import fetchProducts from '../fetchProducts.js';
import { setupStore, store } from '../store.js';
import display from '../displayProducts.js';
import { getElement } from '../utils.js';

// Get loading element
const loading = getElement('.page-loading');

// Check if localStorage with comfyStore
const init = async() => {

	// if store = [] => fetchProducts
	if (store.length < 1){
		const products = await fetchProducts();
		setupStore(products);
	}

	// Display all products
	display(store, getElement('.products-container'));

	// Remove loading
	loading.style.display = 'none';

	// Filters
	setupSearch(store);
	setupCompanies(store);
	setupPrice(store);

};
init();