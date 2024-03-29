// Imports
import { formatPrice, getElement } from '../utils.js';

// Variables
const cartItems = getElement('.cart-items');

// Fonction
const addToCartDOM = (product) => {
	// Destructuring
	const { id, name, price, image, amount } = product;
	// Article, because we need to add to the container (appendChild)
	// we can't use innerHTML, because all others article will be deleted
	const article = document.createElement('article');
	article.classList.add('cart-item');
	article.setAttribute('data-id', id);
	article.innerHTML = `<img src="${ image }" class="cart-item-img" alt="${ name }"/>
		<div>
			<h4 class="cart-item-name">${ name }</h4>
			<p class="cart-item-price">${ formatPrice(price) }</p>
			<button class="cart-item-remove-btn" data-id="${ id }">remove</button>
		</div>
		<div>
			<button class="cart-item-increase-btn" data-id="${ id }">
				<i class="fas fa-chevron-up"></i>
			</button>
			<p class="cart-item-amount" data-id="${ id }">${ amount }</p>
			<button class="cart-item-decrease-btn" data-id="${ id }">
				<i class="fas fa-chevron-down"></i>
			</button>
		</div>`;
	// Add to cart-items
	cartItems.appendChild(article);
};

// Export
export default addToCartDOM;