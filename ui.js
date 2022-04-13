const toggle = document.querySelector('.checkbox');
const search_input = document.querySelector('.search');
const card_container = document.querySelector('.card-container');
const avatar = document.querySelector('.avatar');
const anchors = document.querySelectorAll('a');

toggle.addEventListener('change', ()=> {
    document.body.classList.toggle('dark-mode');
    search_input.classList.toggle('search-darkmode');
    card_container.classList.toggle('card-darkmode');
    avatar.classList.toggle('avatar-darkmode');
    anchors.forEach((element)=> {
        element.classList.toggle('user-darkmode');
    });

});