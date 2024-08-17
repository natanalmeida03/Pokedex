const input = document.getElementById("input");
const pokemonName = document.getElementById("pokemon-id");
const pokemonImg = document.getElementById("pokemon-img");

let searchPokemon = "1";
const requestPokemon = async (search) => {
  let json;
  try {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);

    if (r.status === 404) showNotFoundAlert();

    json = await r.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.log("There was a SyntaxError", error);
    } else {
      console.log("There was an error", error);
    }

    return null;
  }
  if (json) return json;
};

const showNotFoundAlert = () => {
  alert("Pokemon não encontrado");
};

const renderPokemon = async (p) => {
  // pokemonName.innerHTML = "carregando...";

  const data = await requestPokemon(p);
  if (data === null) return;

  pokemonImg.style.display = "none";

  pokemonName.innerHTML = `${data.id} - ${data.name}`;
  pokemonImg.style.display = "block ";
  searchPokemon = data.id;
  pokemonImg.src = data.sprites.other.showdown.front_default;
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    renderPokemon(input.value.toLowerCase());
    input.value = "";
  }
});

function nextPokemon() {
  console.log("aqui");
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
