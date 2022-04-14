// Imports
import { allProductsUrl } from './utils.js';

// Function
const fetchProducts = async() => {
	const response = await fetch(allProductsUrl).catch((error) => {
		console.log(error);
	});
	if (response){
		return response.json();
	}
	return response;
};

// Export
export default fetchProducts;