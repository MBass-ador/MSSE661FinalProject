import { doRegister } from './auth.js';

/**
 * @module register
 * * @description  -  handles registration on registration.html
 */
    
console.log('Attaching event listener to regForm');

const form = document.getElementById('regForm');

// whether or not event listener attached
if (form) {
  form.addEventListener('submit', doRegister);

  console.log('Event listener attached to regForm');
} else {
  console.error('regForm not found');
}