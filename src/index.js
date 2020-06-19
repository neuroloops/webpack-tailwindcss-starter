import logoPath from './img/logo.svg';
import favicon from './img/favicon.png';
import heroPath from './img/hero.jpg';

import homeIcon from './img/home.svg';
import cartIcon from './img/shopping-cart.svg';
import productsIcon from './img/store-front.svg';

document.getElementById('homeIcon').src = homeIcon;
document.getElementById('cartIcon').src = cartIcon;
document.getElementById('productsIcon').src = productsIcon;

console.log('Follow the White Rabbit');

const logoImg = document.getElementById('logo');
logoImg.src = logoPath;
const faviconImg = document.getElementById('favicon');
faviconImg.href = favicon;
const heroImg = document.getElementById('hero');
heroImg.style.backgroundImage = `url(${heroPath})`;
