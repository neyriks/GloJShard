'use strict';
const buttonz = document.querySelector('.button');
buttonz.addEventListener('click', () => {
    document.body.style.background = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
});