const API_POKEMONS = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0";
const API_DE_IMAGENS = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

let apiPaginaProximo = "";
let apiPaginaAnterior = "";

let pokemons = [];

const loanding = document.createElement( "div");

loanding.classList.add("loader");

document.addEventListener("DOMContentLoaded", function() {

    const caixasPokemons = document.getElementById("caixasPokemons")
    const btnAnterior = document.getElementById("btnAnterior")
    const btnProximo = document.getElementById("btnProximo")

    buscarPokemons(API_POKEMONS)

    btnAnterior.addEventListener("click", () => {
        if(apiPaginaAnterior) buscarPokemons(apiPaginaAnterior)
    })
    btnProximo.addEventListener("click", () => {
        if(apiPaginaProximo) buscarPokemons(apiPaginaProximo);
    });

    function buscarPokemons(url) {
        pokemons = [];
        caixasPokemons.innerText = "";
        caixasPokemons.append(loanding);

        fetch(url, {Headers: { accept: "*" } })
        .then(resposta => resposta.json())
        .then(respostaApi =>{
            caixasPokemons.innerText = "";
            const { count, next, previous, results } = respostaApi;

            if(previous){
                apiPaginaAnterior = previous
            }else{
                apiPaginaAnterior = ""
            }
            if(next){
                apiPaginaProximo = next
            }else{
                apiPaginaProximo = ""
            }

            if(results.length){
                pokemons = results 
            }
            pokemons.forEach(pokemon =>{
                const urlImagemPokemon = API_DE_IMAGENS + pokemon.url.split("pokemon")[1].slice(0, -1) + ".png"

                const divDoPokemon = document.createElement("div");
                const nomeDoPokemon = document.createElement("h3");
                const imagemDoPokemon = document.createElement("img");
                imagemDoPokemon.width = 96;
                imagemDoPokemon.height = 96;
                imagemDoPokemon.src = urlImagemPokemon;

                nomeDoPokemon.innerText = pokemon.name 
                divDoPokemon.append( nomeDoPokemon)
                divDoPokemon.append(imagemDoPokemon)

                caixasPokemons.append(divDoPokemon)
            });
            
            
            
            }
        );
    }


     
});