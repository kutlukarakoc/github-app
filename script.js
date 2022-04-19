const searched_user = document.querySelector('.searched-user');
const search = document.querySelector('.search');
const name_surname = document.querySelector('.name-surname');
const locationEl = document.querySelector('.location');
const title = document.querySelector('.title');
const followers_container = document.querySelector('.followers-container');
const repositories = document.querySelector('.repositories');
const github_container = document.querySelector('.github-container');
const user_followers = document.querySelector('.user-followers');
const user_followings = document.querySelector('.user-followings')
const back_from_followers = document.querySelector('.back-from-followers');
const back_from_followings = document.querySelector('.back-from-followings');
let followers;
let following;
let followers_count;
let following_count;
let followers_avatar;
let followings_avatar;
let error_message;

let search_value;
search.addEventListener('input', (e) => {
    search_value = e.target.value.trim();
});

search_btn.addEventListener('click', () => {
    error_message = document.querySelector('.error-message');
    if (error_message) {
        error_message.remove();
        get();
    } else {
        get();
    }
});


function get() {

    async function getDatas(url) {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    };

    if (search_value !== '') {

        getDatas(`https://api.github.com/users/${search_value}`)

            .then((data) => {
                // If request successfull, add "founded" classes to search input and search button
                if (search.classList.contains('not-founded') || search_btn.classList.contains('not-founded')) {
                    search.classList.remove('not-founded');
                    search_btn.classList.remove('not-founded');
                    search.classList.add('founded');
                    search_btn.classList.add('founded');
                } else {
                    search.classList.add('founded');
                    search_btn.classList.add('founded');
                }

                return data;
            })

            .then((data) => {
                // If avatar element doesn't exist, create one
                let avatar = document.querySelector('.avatar');
                if (!avatar) {
                    let profile_picture = document.createElement('img');
                    profile_picture.src = data.avatar_url;
                    profile_picture.classList.add('avatar');
                    profile_picture.setAttribute('loading', 'lazy');
                    searched_user.prepend(profile_picture);
                }

                // If data contains name-surname information...
                if (data.name !== null) {
                    name_surname.textContent = data.name;
                } else {
                    name_surname.remove();
                }

                // If data contains location information...
                if (data.location !== null) {
                    locationEl.innerHTML = `${data.location} <i class="fa-solid fa-location-pin"></i>`;
                } else {
                    locationEl.remove();
                }

                // If data contains bio information...
                if (data.bio !== null) {
                    title.textContent = data.bio;
                } else {
                    title.remove();
                }

                // Adding follower and following informations to our website
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

                followers = document.querySelector('.followers');
                following = document.querySelector('.following');

                // Adding respositories count to our website
                repositories.innerHTML =
                    `
                        <i class="fa-solid fa-folder-open"></i>
                        Public Repositories ${data.public_repos}
                    `;

                // Adding github nickname and referral link to our website
                github_container.innerHTML =
                    `
                        <i class="fa-brands fa-github"></i>
                        <a href="${data.html_url}" class="user" target="_blank">${data.html_url.split('com/')[1]}</a>
                    `;

                return data;
            })
        

            .then((data) => {
                // followers

                // New request for followers informations
                followers.addEventListener('click', () => {
                    async function getFollowers(url) {
                        const response = await fetch(url);
                        const data = await response.json();

                        return data;
                    }

                    getFollowers(data.followers_url)

                        .then((data) => {
                            card_container.classList.toggle('toggle-rotate');

                            data.forEach((item, index) => {
                                let user_follower = document.createElement('div');
                                user_follower.classList.add('user-follower');
                                user_follower.classList.add(`user-follower-${index}`);

                                if (!document.querySelectorAll(`user-follower-${index}`).length) {
                                    user_followers.append(user_follower);
                                };

                                if (!document.querySelectorAll(`.avatar-${index}`).length) {
                                    let follower_picture =
                                        `
                                        <img src="${item.avatar_url}" class="avatar avatar-${index}" loading="lazy" alt="">
                                    `;
                                    user_follower.insertAdjacentHTML('afterbegin', follower_picture);
                                };


                                if (!document.querySelectorAll(`.follower-nickname-${index}`).length) {
                                    let follower_nickname =
                                        `
                                        <a href="${item.html_url}" class="follower-nickname follower-nickname-${index}" target="_blank">${item.login}</a>
                                    `;
                                    user_follower.insertAdjacentHTML('beforeend', follower_nickname);
                                };

                            });

                            searched_user.style.display = 'none';
                            user_followings.style.display = 'none';
                            user_followers.style.display = 'block';

                            back_from_followers.addEventListener('click', () => {

                                searched_user.style.display = 'flex';
                                user_followings.style.display = 'none';
                                user_followers.style.display = 'none';

                                card_container.classList.remove('toggle-rotate');
                            });
                        })

                        .catch(() => {
                            card_container.classList.toggle('toggle-rotate');
                            searched_user.style.display = 'none';


                            const followers_error_msg =
                                `
                                <div class="followers_error_msg" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);white-space:nowrap;">Followers not found.</div>
                            `;
                            card_container.innerHTML = followers_error_msg;
                        });
                });

                return data;

            })

            .then((data) => {
                //followings

                // manipulating following refferal to get all followings informations
                let following_ref = data.following_url.replace('{/other_user}', '');

                // New request for followings informations
                following.addEventListener('click', () => {
                    async function getFollowings(url) {
                        const response = await fetch(url);
                        const data = await response.json();

                        return data;
                    };

                    getFollowings(following_ref)

                        .then((data) => {
                            card_container.classList.toggle('toggle-rotate');

                            data.forEach((item, index) => {
                                let user_following = document.createElement('div');
                                user_following.classList.add('user-following');
                                user_following.classList.add(`following${index}`);
    
                                let following_avatar = document.createElement('img');
                                following_avatar.classList.add('avatar');
                                following_avatar.src = item.avatar_url;
                                following_avatar.setAttribute('loading','lazy');
                                user_following.prepend(following_avatar);

                                let following_nickname = document.createElement('a');
                                following_nickname.classList.add('follower-nickname');
                                following_nickname.href = item.html_url;
                                following_nickname.target = '_blank';
                                following_nickname.textContent = item.login;
                                user_following.append(following_nickname);                               

                                if (!document.querySelectorAll(`.following${index}`).length) {
                                    user_followings.append(user_following);
                                };
                            });

                            searched_user.style.display = 'none';
                            user_followers.style.display = 'none';
                            user_followings.style.display = 'block';

                            back_from_followings.addEventListener('click', () => {

                                searched_user.style.display = 'flex';
                                user_followers.style.display = 'none';
                                user_followings.style.display = 'none';

                                card_container.classList.remove('toggle-rotate');
                            })
                        })

                        .catch(() => {

                            card_container.classList.toggle('toggle-rotate');
                            searched_user.style.display = 'none';

                            const followers_error_msg =
                                `
                                    <div class="followers_error_msg" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);white-space:nowrap;">Followings not found.</div>
                                `;

                            card_container.innerHTML = followers_error_msg;
                        });
                });
            })

            .catch(() => {

                if (searched_user) {
                    searched_user.remove();
                };

                // If request unsuccessfull, add "not-founded" classes to search input and search button
                if (search.classList.contains('founded') || search_btn.classList.contains('founded')) {
                    search.classList.remove('founded');
                    search_btn.classList.remove('founded');
                    search.classList.add('not-founded');
                    search_btn.classList.add('not-founded');
                } else {
                    search.classList.add('not-founded');
                    search_btn.classList.add('not-founded');
                }

                // Display error message

                const error_message =
                 `
                    <div class="error-message" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);white-space:nowrap;">User not found.</div>
                `;
                card_container.innerHTML = error_message;

            });
        };   
};
