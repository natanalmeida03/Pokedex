const input = document.getElementById("input");
const pokemonName = document.getElementById("pokemon-id");
const pokemonImg = document.getElementById("pokemon-img");

let searchPokemon = "1";
const requestPokemon = async (search) => {
  const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
  const json = await r.json();
  return json;
}

const renderPokemon = async (p) => {
  // pokemonName.innerHTML = "carregando...";
  pokemonImg.style.display = "none";

  const data = await requestPokemon(p);

  pokemonName.innerHTML = `${data.id} - ${data.name}`;
  pokemonImg.style.display = "block ";
  searchPokemon = data.id;
  pokemonImg.src = data.sprites.other.showdown.front_default;
}


input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    renderPokemon(input.value.toLowerCase());
    input.value = "";
  }
});

function nextPokemon() {
  console.log("aqui")
  searchPokemon++;
  renderPokemon(searchPokemon);
}

function prevPokemon() {
  searchPokemon--;
  if (searchPokemon < 1) {
    searchPokemon = 1;
  }
  renderPokemon(searchPokemon);
}

renderPokemon(searchPokemon);



