// Imports
import { getElement } from './utils.js';

// Navbar, sidebar
const toggleBtn = getElement('.toggle-nav');
const closeBtn = getElement('.sidebar-close');
const sidebar = getElement('.sidebar-overlay');
toggleBtn.addEventListener('click', () => {
	sidebar.classList.add('show');
});
closeBtn.addEventListener('click', () => {
	sidebar.classList.remove('show');
});