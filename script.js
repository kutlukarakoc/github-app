async function getDatas(url){
    const response = await fetch(url);

    const data = await response.json();

    return data;
};

getDatas('https://api.github.com/users/kutlukarakoc')
    .then((data) => {
        console.log(data);
    })