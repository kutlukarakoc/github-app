const card_header = document.querySelector('.card-header');
const search = document.querySelector('.search');
const name_surname = document.querySelector('.name-surname');
const locationEl = document.querySelector('.location');
const title = document.querySelector('.title');
const followers = document.querySelector('.followers');
const following = document.querySelector('.following');
const followers_container = document.querySelector('.followers-container');
const followers_count = document.querySelector('.followers-count');
const following_count = document.querySelector('.following-count');
const repositories = document.querySelector('.repositories');
const github_container = document.querySelector('.github-container');
const github = document.querySelector('.user');
const twitter = document.querySelector('.twitter-container');
const error_message = document.querySelector('.error-message');

async function getDatas(url){
    const response = await fetch(url);

    const data = await response.json();

    return data;
};

search.addEventListener('change', (e) => { // some problems occured, need to check
    if (e.target.value!= '') {
        //console.log('change',e.target.value);
        search_btn.addEventListener('click', () => {
            //console.log('click',e.target.value);
            getDatas(`https://api.github.com/users/${e.target.value.trim()}`)

                .then((data) => {
                    //console.log(data);
                    if (data.message !== 'Not Found') {
                        if(error_message){
                            error_message.remove();
                        };

                        card_container.style.border = '1px solid #000';

                        if (search_input.classList.contains('not-founded') || search_btn.classList.contains('not-founded')) {
                            search_input.classList.remove('not-founded');
                            search_btn.classList.remove('not-founded');
                            search_input.classList.add('founded');
                            search_btn.classList.add('founded');
                        }else{
                            search_input.classList.add('founded');
                            search_btn.classList.add('founded');
                        }

                        let profile_picture = document.createElement('img');
                        profile_picture.src = data.avatar_url;
                        profile_picture.classList.add('avatar');
                        profile_picture.setAttribute('loadign', 'lazy');
                        card_header.prepend(profile_picture);

                        if (data.name !== null) {
                            name_surname.textContent = data.name;
                        } else {
                            name_surname.remove();
                        }

                        if (data.location !== null) {
                            locationEl.innerHTML = `${data.location} <i class="fa-solid fa-location-pin"></i>`;
                        } else {
                            locationEl.remove();
                        }

                        if (data.bio !== null) {
                            title.textContent = data.bio;
                        } else {
                            title.remove();
                        }

                        followers_container.innerHTML =
                            `
                            <i class="fa-solid fa-users"></i>
                            <a href="" class="followers">
                                Followers 
                                <span class="followers-count">${data.followers}</span>
                            </a>
                            <div>-</div>
                            <a href="" class="following">
                                Following 
                                <span class="following-count">${data.following}</span>
                            </a>
                        `;

                        repositories.innerHTML =
                            `
                            <i class="fa-solid fa-folder-open"></i>
                            Public Repositories ${data.public_repos}
                        `;

                        github_container.innerHTML =
                            `
                            <i class="fa-brands fa-github"></i>
                            <a href="${data.html_url}" class="user" target="_blank">${data.html_url.split('com/')[1]}</a>
                        `;

                        if (data.twitter_username !== null) {
                            twitter.innerHTML = `<i class="fa-brands fa-twitter"></i><a href="https://twitter.com/${data.twitter_username}" class="twitter">${data.twitter_username}</a>`;
                        } else {
                            twitter.remove();
                        }
                    } else {
                        if (search_input.classList.contains('founded') || search_btn.classList.contains('founded')) {
                            search_input.classList.remove('founded');
                            search_btn.classList.remove('founded');
                            search_input.classList.add('not-founded');
                            search_btn.classList.add('not-founded');
                        }else{
                            search_input.classList.add('not-founded');
                            search_btn.classList.add('not-founded');
                        }

                        if(!error_message){
                            const error_message =
                            `
                            <div class="error-message" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);white-space:nowrap;">User couldn't found.</div>
                        `;
                        card_container.innerHTML = error_message;
                        };
                    }
                })

                .then((data) => {
                    //followers
                })

                .then((data) => {
                    //following
                })
        });
    };
});
