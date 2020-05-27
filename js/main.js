const API_KEY = "fa9de1bb626c74440bbf2532a0d596a0";
//Получение элементов
const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    tvShowsList = document.querySelector('.tv-shows__list'),
    modal = document.querySelector('.modal'),
    tvCardVote = document.querySelector('.tv-card__vote');

class DBConnect {
    getData = async(url) => {
        const res = await fetch(url);

        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Не удалось получить данные с ${url}`);
        }
    }

    getTestData = () => {
        return this.getData('./test.json');
    }
}

const renderCard = response => {
    const PATH = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";
    const data = response.results;
    tvShowsList.textContent = '';

    data.forEach((movie) => {

        const {
            name: title,
            poster_path: poster,
            backdrop_path: backdrop,
            vote_average: vote,
        } = movie;

        const posterImg = poster ? PATH + poster : '../img/no-poster.jpg';
        const backdropImg = backdrop ? PATH + backdrop : '../img/no-poster.jpg';;
        const voteImg = vote ? `<span class="tv-card__vote">${vote}</span>` : '';

        const card = document.createElement('li');
        card.classList.add('tv-shows__item');
        card.innerHTML = `
        <a href="#" class="tv-card"> 
            ${voteImg}
            <img class="tv-card__img" src="${posterImg}" 
            data-backdrop="${backdropImg}" 
            alt="${title}">
            <h4 class="tv-card__head">${title}</h4>
        </a>`;
        tvShowsList.append(card);
    });

}

new DBConnect().getTestData().then(renderCard).catch(e => console.log(e.message));


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