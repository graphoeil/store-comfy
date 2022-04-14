// Imports
import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';

// Function
const display = (products, element, filters) => {
	// Display products
	element.innerHTML = products.map((product) => {
		// Variables
		const { id, name, price, image } = product;
		// Return
		return(
			`<article class="product">
				<div class="product-container">
					<img src="${ image }" class="product-img img" alt="${ name }">
					<div class="product-icons">
						<a href="product.html?id=${ id }" class="product-icon">
							<i class="fas fa-search"></i>
						</a>
						<button class="product-cart-btn product-icon" data-id="${ id }">
							<i class="fas fa-shopping-cart"></i>
						</button>
					</div>
				</div>
				<footer>
					<p class="product-name">${ name }</p>
					<h4 class="product-price">${ formatPrice(price) }</h4>
				</footer>
			</article>`
		);
	}).join('');
	if (filters){ return; }
	// Event listener (bubbling)
	/* !!!! We check if filters invoke displayProducts, because when filtering displayProducts 
	is invoked for each filtering operation and add a new eventListener, and when 
	we click on addToCartBtn all are FIRED !!! */
	element.addEventListener('click', (e) => {
		// Because the event start from the fontawesome icon ,-)
		const parent = e.target.parentElement;
		if (parent.classList.contains('product-cart-btn')){
			addToCart(parent.dataset.id);
		}
	});
};

// Add to cart btn

// Export
export default display;