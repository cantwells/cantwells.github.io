const API_KEY = "fa9de1bb626c74440bbf2532a0d596a0";

class DBConnect {
    getData(url) {
        // fetch( url )
    }
}

//Получение элементов
const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    tvShowsList = document.querySelector('.tv-shows__list'),
    modal = document.querySelector('.modal');

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

//Функция смены картинки
const changeImg = event => {
    const target = event.target;
    const card = target.closest('.tv-card');
    if (card) {
        const img = card.querySelector('img');
        //Деструктуризация
        [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
        //Альтернптива
        // const data = img.getAttribute('src');
        // img.setAttribute('src', img.dataset.backdrop);
        // img.dataset.backdrop = data;
    }
}

//При наведение мыши на карточку
tvShowsList.addEventListener('mouseover', changeImg);
//После выходе мышки за пределы карточки
tvShowsList.addEventListener('mouseout', changeImg);

//Вывод модального окна
tvShowsList.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    const card = target.closest('.tv-card');
    if (card) {
        document.body.style.overflow = 'hidden';
        modal.classList.remove('hide');
    }
});

//Закрытие модального окна
modal.addEventListener('click', event => {
    const target = event.target;
    const cross = target.closest('.cross');
    const overlay = target.matches('.modal');
    if (cross || overlay) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }
})