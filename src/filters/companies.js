// Imports
import { getElement } from '../utils.js';
import display from '../displayProducts.js';

// Fonction
const setupCompanies = (store) => {
	// Company, unique => new Set()
	let companies = store.map((product) => {
		return product.company;
	});
	companies = [ 'all', ...new Set(companies) ];
	// Add company to DOM container
	const companiesDOM = getElement('.companies');
	companiesDOM.innerHTML = companies.map((company) => {
		return `<button class="company-btn">${ company }</button>`;
	}).join('');
	// Event listener (bubbles)
	companiesDOM.addEventListener('click', (e) => {
		const element = e.target;
		if (element.classList.contains('company-btn')){
			let newStore = [];
			if (e.target.textContent === 'all'){
				newStore = [ ...store ];
			} else {
				newStore = store.filter((product) => {
					return product.company === e.target.textContent;
				});
			}
			display(newStore, getElement('.products-container'), true);
		}
	});
};

// Export
export default setupCompanies;