const toggle = document.querySelector('.checkbox');
const search_input = document.querySelector('.search');
const search_btn = document.querySelector('.search-btn');
const card_container = document.querySelector('.card-container');
const anchors = document.querySelectorAll('a');

toggle.addEventListener('change', ()=> {
    document.body.classList.toggle('dark-mode');
    
    if(search_input){
        search_input.classList.toggle('search-darkmode');
    };
    
    if(search_btn){
        search_btn.classList.toggle('search-btn-darkmode');
    };
    
    if(card_container){
        card_container.classList.toggle('card-darkmode');
    };
    
    if(avatar){
        avatar.classList.toggle('avatar-darkmode');
    };
    
    if(anchors){
        anchors.forEach((element)=> {
            element.classList.toggle('user-darkmode');
        });
    };
    
    if(followers || following){//can not find el probably, need to check
        followers.classList.toggle('followers-darkmode');
        following.classList.toggle('following-darkmode');
    };
    
    if(github){//can not find el probably, need to check
        github.classList.toggle('user-darkmode');
    };

});
