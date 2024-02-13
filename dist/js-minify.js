let pokemonRepository=function(){let e=[];function t(){return e}function n(t){e.push(t)}return document.querySelector(".modal"),{getAll:t,add:n,addListItem:function e(t){let n=document.querySelector(".pokemon-list"),i=document.createElement("li");i.classList.add("col-12","col-md-4","mb-2"),n.appendChild(i);let l=document.createElement("button");l.innerHTML=t.name,i.appendChild(l),l.classList.add("btn","btn-outline-primary","btn-block","btn-lg","w-100","mb-3"),l.setAttribute("data-target","#exampleModal"),l.setAttribute("data-toggle","modal"),function e(t,n){t.addEventListener("click",function(){(function e(t){pokemonRepository.loadDetails(t).then(function(){(function e(t){let n=document.querySelector(".modal-body"),i=document.querySelector(".modal-header");n.innerHTML="";let l=document.querySelector(".modal-title");var a=t.name.split(" ").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ");l.innerHTML=a;let o=document.querySelector(".close"),r=document.createElement("img");r.classList.add("modal-img"),r.src=t.imageUrlFront,r.alt="Front image of "+t.name;let c=document.createElement("img");c.classList.add("modal-img"),c.src=t.imageUrlBack,c.alt="Back image of "+t.name;let p=document.createElement("p"),s=[t.types[0].type.name];for(let d=1;d<t.types.length;d++)s.push(", "+t.types[d].type.name);p.innerHTML="Types: "+s.join("");let m=document.createElement("p");m.innerHTML="Height: "+t.height;let u=document.createElement("p");u.innerHTML="Weigth: "+t.weight;let h=document.createElement("p"),f=[t.abilities[0].ability.name];for(let g=1;g<t.abilities.length;g++)f.push(", "+t.abilities[g].ability.name);h.innerHTML="Abilities: "+f.join(""),i.appendChild(l),i.appendChild(o),n.appendChild(r),n.appendChild(c),n.appendChild(p),n.appendChild(m),n.appendChild(u),n.appendChild(h)})(t)})})(n)})}(l,t)},loadList:function e(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){n({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:function e(t){return fetch(t.detailsUrl).then(function(e){return e.json()}).then(function(e){t.imageUrlFront=e.sprites.front_default,t.imageUrlBack=e.sprites.back_default,t.types=e.types,t.height=e.height,t.weight=e.weight,t.abilities=e.abilities}).catch(function(e){console.error(e)})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});