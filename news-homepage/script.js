const main = document.querySelector('main');
const opacity = document.getElementById('opacity');
const burger = document.getElementById('burger');
const burgerMenuOpen = document.getElementById('burger-button');
const burgerMenu = document.getElementById('menu');
const burgerMenuClose = document.getElementById('menu-close');

const checkNav = () => {
    if (screen.width < 480) {
    burger.style.display = 'block';
    } else    {
    burger.style.display = 'none';
    }
}


burgerMenuOpen.addEventListener('click', () => {
    burgerMenu.style.display = 'block';
    opacity.style.display = 'block';
})

burgerMenuClose.addEventListener('click', () => {
    burgerMenu.style.display = 'none';
    opacity.style.display = 'none';
})