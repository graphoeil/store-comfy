// Imports
import { getElement } from '../utils.js';

// Variables
const cartOverlay = getElement('.cart-overlay');
const openCartBtn = getElement('.toggle-container');
const closeCartBtn = getElement('.cart-close');

// Event listener
openCartBtn.addEventListener('click', () => {
	cartOverlay.classList.add('show');
});
closeCartBtn.addEventListener('click', () => {
	cartOverlay.classList.remove('show');
});

// Function & export
/* We need to export openCart function, because when 
we click on small btn addToCart on a thumbnails we 
open the cart right after. */
export const openCart = () => {
	cartOverlay.classList.add('show');
};