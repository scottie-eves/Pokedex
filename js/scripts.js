let pokemonList = [
    {name: 'Squirtle: ' , type: ['water', ' speed'] , height: 3} , 
    {name: ' Charmander: ' , type: ['fire' , ' strength'] , height: 4} ,
    {name: ' Geodude: ' , type: ['rock', ' ground'] , height: 2}
];

for (let i=0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + pokemonList[i].type + ". " + "height: " + pokemonList[i].height);
    if (pokemonList[i].height > 3){
    document.write(", that's a big pokemon!");
}
}

console.log(pokemonList);