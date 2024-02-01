let pokemonRepository = (function () {
    let pokemonList = [];
    // Pokemon API
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector('#modal-container');

    //creating a modal to open the details of the pokemon
    function showModal(item) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        
        let titleElement = document.createElement('h1');
        titleElement.innerText = 'item.name';

        let contentElement = document.createElement('p');
        contentElement.innerText = 'item.height';

        let imageElement = document.createElement('img');
        imageElement.src = 'item.imageUrl';

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal();
      });

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
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(loadDetails);
        });
    }

    // Adding the pokemon list buttons
    function addListItem(pokemon) {
        let ulItem = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        ulItem.appendChild(listItem);
        button.addEventListener('click', function() {
            showModal();
        });
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

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });
      
      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });

    return {
        add: add ,
        getAll: getAll ,
        addListItem: addListItem ,
        loadList: loadList ,
        loadDetails: loadDetails ,
        showDetails: showDetails ,
        showModal: showModal
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

console.log(pokemonRepository.getAll());