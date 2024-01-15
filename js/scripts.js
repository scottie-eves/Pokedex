let pokemonRepository = (function () {
    let repository = [
    {name: ' Squirtle ' , type: ['water', ' speed'] , height: 3} , 
    {name: ' Charmander ' , type: ['fire' , ' strength'] , height: 4} ,
    {name: ' Geodude ' , type: ['rock', ' ground'] , height: 2} ,
    {name: ' Pikachu ' , type: ['electric', ' flying'] , height: 1} , 
    {name: ' Cubone ' , type: ['rock' , ' ground'] , height: 0.5} ,
    {name: ' Diglett ' , type: ['rock', ' ground'] , height: 0.2}
];

function add(pokemon) {
    if (
        typeof pokemon === 'object' &&
        'name' in pokemon &&
        'height' in pokemon &&
        'type' in pokemon
    ) {
        repository.push(pokemon);        
    } else {
        console.log('That is incorrect');
    }
}
function getAll() {
    return repository;
}
function showDetails(pokemon){
    console.log(pokemon.name);
}
function addListItem(pokemon){
    let ulItem = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    ulItem.appendChild(listItem);
    button.addEventListener('click', function(showDetails) {
        console.log(pokemon.name);
    })
}
return {
    add: add ,
    getAll: getAll ,
    addListItem: addListItem
};
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});

console.log(pokemonRepository.getAll());

// function divide(dividend, divisor) {

//     if (divisor === 0) {
//         return 'you are trying to divide by zero'
//     } else {
//         let result = dividend/divisor;
//         return result;
//     }
// }

// console.log(divide(4, 2));
// console.log(divide(7, 0));
// console.log(divide(1, 4));
// console.log(divide(12, -3));
// console.log(divide(-4, -2));