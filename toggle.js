const toggle = document.querySelector('.checkbox');
const search_btn = document.querySelector('.search-btn');
const card_container = document.querySelector('.card-container');
let anchors = document.querySelectorAll('a');
let github_user;
let avatar;

toggle.addEventListener('change', ()=> {
    document.body.classList.toggle('dark-mode');
    
    if(search){
        search.classList.toggle('search-darkmode');
    };
    
    if(search_btn){
        search_btn.classList.toggle('search-btn-darkmode');
    };
    
    if(card_container){
        card_container.classList.toggle('card-darkmode');
    };
    
    if(avatar){
        if(avatar.length < 2){
            avatar[0].classList.toggle('avatar-darkmode');
        }else{
            avatar.forEach((element) => {
                element.classList.toggle('avatar-darkmode');
            });
        }
    };
    
    if(anchors){
        anchors.forEach((element)=> {
            element.classList.toggle('user-darkmode');
        });
    };
    
    if(followers || following){
        followers.classList.toggle('followers-darkmode');
        following.classList.toggle('following-darkmode');
    };
    
    if(repositories){
        repositories.classList.toggle('repositories-darkmode');
    };
    
    if(github_user){
        github_user.classList.toggle('github-darkmode');
    };

});
