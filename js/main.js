//Получение элементов
const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger');

//Вывод меню
hamburger.addEventListener('click', event => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
})

//Сворачивание меню при нажатии по документу
document.addEventListener('click', event => {
    const target = event.target;

    if (!target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
})

//Показывать подпункты
leftMenu.addEventListener('click', event => {
    const target = event.target;
    const dropdown = target.closest('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
})

const changeImg = event => {
    const target = event.target;
    const card = target.closest('.tv-card');
    if (card) {
        const img = card.querySelector('img');
        const data = img.getAttribute('src');
        img.setAttribute('src', img.dataset.backdrop);
        img.dataset.backdrop = data;
    }
}

window.addEventListener('mouseover', changeImg);

window.addEventListener('mouseout', changeImg);