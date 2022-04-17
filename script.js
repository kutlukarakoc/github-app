const searched_user = document.querySelector('.searched-user');
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

const user_followers = document.querySelector('.user-followers');
const user_followings = document.querySelector('.user-followings');
const followers_avatar = document.querySelector('.followers-avatar');
const followings_avatar = document.querySelector('.followings-avatar');

let error_message;

let search_value;
search.addEventListener('input', (e) => {
    search_value = e.target.value.trim();
});

search_btn.addEventListener('click', () => {
    error_message = document.querySelector('.error-message');
    if (error_message) {
        error_message.remove();
    };
    get();
});

async function getDatas(url){
    const response = await fetch(url);

    const data = await response.json();

    return data;
};

function get() {

    async function getDatas(url) {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    };

    if (search_value !== '') {

        getDatas(`https://api.github.com/users/${search_value}`)

            .then((data) => {
                if (data.message !== 'Not Found') {

                    let avatar = document.querySelector('.avatar');
                    console.log(data);
                    card_container.style.border = '1px solid #000';

                    if (search_input.classList.contains('not-founded') || search_btn.classList.contains('not-founded')) {
                        search_input.classList.remove('not-founded');
                        search_btn.classList.remove('not-founded');
                        search_input.classList.add('founded');
                        search_btn.classList.add('founded');
                    } else {
                        search_input.classList.add('founded');
                        search_btn.classList.add('founded');
                    }

                    if (!avatar) {
                        let profile_picture = document.createElement('img');
                        profile_picture.src = data.avatar_url;
                        profile_picture.classList.add('avatar');
                        profile_picture.setAttribute('loading', 'lazy');
                        console.log(searched_user);
                        searched_user.prepend(profile_picture);
                    }

                    if (data.name !== null) {
                        console.log(data.name, 'var');
                        console.log(name_surname);
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
                            <div class="followers">
                                Followers 
                                <span class="followers-count">${data.followers}</span>
                            </div>
                            <div>-</div>
                            <div class="following">
                                Following 
                                <span class="following-count">${data.following}</span>
                            </div>
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
                    if (searched_user) {
                        searched_user.remove();
                    };

                    if (search_input.classList.contains('founded') || search_btn.classList.contains('founded')) {
                        search_input.classList.remove('founded');
                        search_btn.classList.remove('founded');
                        search_input.classList.add('not-founded');
                        search_btn.classList.add('not-founded');
                    } else {
                        search_input.classList.add('not-founded');
                        search_btn.classList.add('not-founded');
                    }

                    if (!error_message) {
                        const error_message =
                            `
                            <div class="error-message" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);white-space:nowrap;">User not found.</div>
                        `;
                        card_container.innerHTML = error_message;
                    };
                }
            })

            .then((data) => {
                //followers

                getFollowers();

                /*if(!followers_avatar){
                    let follower_picture = document.createElement('img');
                    follower_picture.src = data.avatar_url;
                    follower_picture.classList.add('followers-avatar');
                    follower_picture.setAttribute('loading', 'lazy');
                    console.log(searched_user);
                    user_followers.prepend(follower_picture);
                };

                followers.addEventListener('click', () => {
                    card_container.classList.toggle('toggle');

                    searched_user.style.opacity = '0';
                    searched_user.style.display = 'none';
                    user_followers.style.opacity = '1';
                    user_followers.style.display = 'block';
                });*/

            })

            .then((data) => {
                //following

                getFollowings();
                
                /*following.addEventListener('click', () => {
                    card_container.classList.toggle('toggle');

                    searched_user.style.opacity = '0';
                    searched_user.style.display = 'none';
                    user_followings.style.opacity = '1';
                    user_followings.style.display = 'block';
                });

                if(!followings_avatar){
                    let following_picture = document.createElement('img');
                    following_picture.src = data.avatar_url;
                    following_picture.classList.add('followings-avatar');
                    following_picture.setAttribute('loading', 'lazy');
                    console.log(searched_user);
                    user_followings.prepend(following_picture);
                };*/
            })

    }
};
