// Global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// Specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

// Variables
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// Cart product
let productID;

// Show product when page loads
window.addEventListener('DOMContentLoaded', async() => {
	// Get ID
	const urlID = window.location.search;
	// Fetch product
	try {
		const response = await fetch(`${ singleProductUrl }${ urlID }`);
		if (response.status >= 200 && response.status <= 299){
			const product = await response.json();
			// Destructuring
			const { id, fields:{ name, company, price, colors, description, image:img } } = product;
			const image = img[0].thumbnails.large.url;
			productID = id;
			// Display product
			document.title = `${ name.toUpperCase() } | Comfy`;
			pageTitleDOM.textContent = `Home / ${ name }`;
			imgDOM.src = image;
			titleDOM.textContent = name;
			companyDOM.textContent = `By ${ company }`;
			priceDOM.textContent = formatPrice(price);
			descDOM.textContent = description;
			colors.forEach((color) => {
				const span = document.createElement('span');
				span.classList.add('product-color');
				span.style.backgroundColor = color;
				colorsDOM.appendChild(span);
			});
		} else {
			centerDOM.innerHTML = `<div>
				<h3 class="error">Sorry, something went wrong...</h3>
				<a href="index.html" class="btn">Back home</a>
			</div>`;
		}
	} catch(error){
		console.log(error);
	}
	// Hide loading
	loading.style.display = 'none';
});


// Add to cart event listener
cartBtn.addEventListener('click', () => {
	addToCart(productID);
});