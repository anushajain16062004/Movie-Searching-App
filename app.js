let input = document.querySelector('input');
let btn = document.querySelector('button');
let list = document.querySelector('#list');

btn.addEventListener('click', function() {
    let searchText = input.value;
    fetchData(searchText);
    input.value = "";
});

function fetchData(searchText) {
    // axios.get(`https://api.tvmaze.com/search/shows?q=${searchText}`)
    // .then(function(response) {
    //     console.log(response.data);
    //     manipulateDom(response.data);
    // })
    // .catch(function(error) {
    //     console.error('Error fetching data:', error);
    // });

    fetch(`https://api.tvmaze.com/search/shows?q=${searchText}`)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        manipulateDom(data)
    })
}

function manipulateDom(allthedata) {
    // Clear previous search results
    list.innerHTML = '';

    for (let data of allthedata) {
        let figure = document.createElement('figure');

        // Check if image exists
        let imageUrl = data.show.image ? data.show.image.medium : 'path/to/placeholder/image.jpg';
        
        figure.innerHTML = `
            <img src="${imageUrl}" alt="${data.show.name}">
            <h2>Name: ${data.show.name}</h2>
            <h5>${data.show.language}</h5>
        `;

        list.appendChild(figure);
    }
}
