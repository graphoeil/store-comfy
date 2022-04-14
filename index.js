// Global imports, like we do in php ,-)
import './src/toggleSidebar.js';
import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';
// Specific imports
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';
import { getElement } from './src/utils.js';

// Init
const init = async() => {
	const products = await fetchProducts();
	/* if products => do something, 
	else => loading... is displayed */
	if (products){
		// Add products to the store
		setupStore(products);
		// Featured products
		const featured = store.filter((product) => {
			return product.featured;
		});
		// Display products in section featured
		display(featured, getElement('.featured-center'));
	}
};

// Fetch products on DOMReady, Featured products
window.addEventListener('DOMContentLoaded', init);