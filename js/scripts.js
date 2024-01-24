let pokemonRepository = (function () {
    let pokemonList = [];
    // Pokemon API
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// Add a Pokemon Item to a list
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon
        ) {
            pokemonList.push(pokemon);        
        } else {
            console.log('That is incorrect');
        }
    }

    // Return an Array of Pokemons
    function getAll() {
        return pokemonList;
    }

    // Show the details of the Pokemons
    function showDetails(pokemon){
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    // Adding the pokemon list buttons
    function addListItem(pokemon){
        let ulItem = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        ulItem.appendChild(listItem);
        button.addEventListener('click', function(showDetails) {
            console.log(pokemon);
        })
    }

    // Function to fetch the list of Pokemon Items from the API
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    // function to fetch the Pokemon details from the pokemon items
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        add: add ,
        getAll: getAll ,
        addListItem: addListItem ,
        loadList: loadList ,
        loadDetails: loadDetails ,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

console.log(pokemonRepository.getAll());