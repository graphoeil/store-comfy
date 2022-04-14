// Imports
import { getStorageItem, setStorageItem, formatPrice, getElement } from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';

// Variables
// Counter in the shopping-cart icon
const cartItemCountDOM = getElement('.cart-item-count');
// Cart items container
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

// Get cart items from localStorage
let cart = getStorageItem('comfyCart');

// Cart item count
const displayCartItemCount = () => {
	const amount = cart.reduce((acc, current) => {
		/* We invoke this function for every item in the cart, 
		just adding amount value for each loop ,-) */
		return acc += current.amount;
	},0);
	cartItemCountDOM.textContent = amount;
};

// Total
const displayCartTotal = () => {
	const total = cart.reduce((acc, current) => {
		return acc += (current.amount * current.price);
	},0);
	cartTotalDOM.textContent = `Total : ${ formatPrice(total) }`;
};

// Increase amount for one cart item
const increaseAmount = (id) => {
	let newAmount;
	cart = cart.map((cartItem) => {
		if (cartItem.id === id){
			newAmount = cartItem.amount + 1;
			cartItem = { ...cartItem, amount:newAmount };
		}
		return cartItem;
	});
	return newAmount;
};

// Decrease amount
const decreaseAmount = (id) => {
	let newAmount;
	cart = cart.map((cartItem) => {
		if (cartItem.id === id){
			newAmount = cartItem.amount - 1;
			cartItem = { ...cartItem, amount:newAmount };
		}
		return cartItem;
	});
	return newAmount;
};

// Remove item from the cart
const removeItem = (id) => {
	cart = cart.filter((cartItem) => {
		return cartItem.id !== id;
	});
};

// Setup cart functionnality, event listener on button for amount and remove
const setupCartFunctionality = () => {
	// Event listener on container (bubbling)
	cartItemsDOM.addEventListener('click', (e) => {
		// Click on icons (chevron-up or down) or on remove btn ?
		const element = e.target;
		const parent = e.target.parentElement;
		const id = e.target.dataset.id;
		const parentID = e.target.parentElement.dataset.id;
		// Remove from cart, looking for element because no icons
		if (element.classList.contains('cart-item-remove-btn')){
			// Remove from cart
			removeItem(id);
			// Remove from DOM
			element.parentElement.parentElement.remove();
		}
		// Increase amount
		if (parent.classList.contains('cart-item-increase-btn')){
			const newAmount = increaseAmount(parentID);
			// Change amount text (sibling), next after chevron-up
			parent.nextElementSibling.textContent = newAmount;
		}
		// Decrease amount
		if (parent.classList.contains('cart-item-decrease-btn')){
			const newAmount = decreaseAmount(parentID);
			if (newAmount === 0){
				removeItem(parentID);
				parent.parentElement.parentElement.remove();
			} else {
				parent.previousElementSibling.textContent = newAmount;
			}
		}
		// Display values in DOM
		displayCartItemCount();
		displayCartTotal();
		setStorageItem('comfyCart', cart);
	});
};
const displayCartItemsDOM = () => {
	// We just invoke addToCartDOM, because on init, cart is empty array
	cart.forEach((item) => {
		addToCartDOM(item);
	});
};

// Update values on every refresh
const init = () => {
	displayCartItemCount();
	displayCartTotal();
	// Display all items in cart items container
	displayCartItemsDOM();
	// Add cart items to cart items container
	setupCartFunctionality();
};
init();

// Fonction & export
export const addToCart = (id) => {
	// Get item from the cart
	let item = cart.find((cartItem) => {
		return cartItem.id === id;
	});
	// Already in the cart ?
	if (!item){
		// Add to cart
		let product = findProduct(id);
		// We add amount property, specific for the cart
		product = { ...product, amount:1 };
		cart.push(product);
		// Add item to the DOM
		addToCartDOM(product);
	} else {
		// Increase qty
		const amount = increaseAmount(id);
		// Get all amount from the DOM
		const items = [ ...cartItemsDOM.querySelectorAll('.cart-item-amount') ];
		// We need to update amount in the cart for this specific item because 
		// we can't refresh to invoke displayCartItemsDOM ,-)
		const newAmount = items.find((value) => {
			return value.dataset.id === id;
		});
		newAmount.textContent = amount;
	}
	// Add one to the item count icon
	displayCartItemCount();
	// Calculate the total
	displayCartTotal();
	// Set localStorage
	setStorageItem('comfyCart', cart);
	// Open the cart after adding product
	openCart();
};