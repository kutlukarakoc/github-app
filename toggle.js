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
    
    if(back_btn){
        back_btn.forEach((button) => {
            button.classList.toggle('backbtn-darkmode');
        });
    };
});

function toggleDoubleCheck() { // to fix toggle bugs
    if (document.body.classList[0] == 'dark-mode' && checkbox.checked) {
        if (avatar) {
            if (avatar.length == 1) {
                if (!avatar[0].classList.contains('avatar-darkmode')) {
                    avatar[0].classList.add('avatar-darkmode');
                };
            } else {
                avatar.forEach((element) => {
                    if (!element.classList.contains('avatar-darkmode')) {
                        element.classList.add('avatar-darkmode');
                    };
                });
            }
        };

        if (anchors) {
            if (anchors.length == 1) {
                if (!anchors[0].classList.contains('user-darkmode')) {
                    anchors[0].classList.add('user-darkmode');
                };
            } else {
                anchors.forEach((element) => {
                    if (!element.classList.contains('user-darkmode')) {
                        element.classList.add('user-darkmode');
                    };
                });
            }
        };

        if(user_followers.style.display != 'block' && !user_followings.style.display != 'block'){
            if(document.querySelectorAll('.user').length){ // github_user
                if(!github_user.classList.contains('github-darkmode')){
                    github_user.classList.add('github-darkmode');
                };
            };

            if(document.querySelectorAll('.followers').length){ // followers
                if(!followers.classList.contains('followers-darkmode')){
                    followers.classList.add('followers-darkmode');
                };
            };

            if(document.querySelectorAll('.following').length){ // following
                if(!following.classList.contains('following-darkmode')){
                    following.classList.add('following-darkmode');
                };
            };
        };

    }else{
        if(user_followers.style.display != 'block' && user_followings.style.display != 'block'){ // if searched user displays
            if(document.querySelectorAll('.user').length){ // github_user
                if(github_user.classList.contains('github-darkmode')){
                    github_user.classList.remove('github-darkmode');
                };
            };

            if(document.querySelectorAll('.followers').length){ // followers
                if(followers.classList.contains('followers-darkmode')){
                    followers.classList.remove('followers-darkmode');
                };
            };

            if(document.querySelectorAll('.following').length){ // following
                if(following.classList.contains('following-darkmode')){
                    following.classList.remove('following-darkmode');
                };
            };
        };
    }
};
