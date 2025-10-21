//  PokePractica - main.js
// -----------------------------------------------------------
//  Ejercicio 1 - Manipulación de eventos y cambio de color
// -----------------------------------------------------------

const nav = document.querySelector(".menu");
const btnWater = document.getElementById("water");
const btnFire = document.getElementById("fire");
const btnElectric = document.getElementById("electric");
const btnMostrar = document.getElementById("mostrar");

btnWater.addEventListener("click", () => {
  nav.style.backgroundColor = "var(--type-water)";
});

btnFire.addEventListener("click", () => {
  nav.style.backgroundColor = "var(--type-fire)";
});

btnElectric.addEventListener("click", () => {
  nav.style.backgroundColor = "var(--type-electric)";
});

// -----------------------------------------------------------
//  Ejercicio 2 - Fetch y renderizado de los primeros 151 Pokémon
// -----------------------------------------------------------

const listaPokemon = document.getElementById("listaPokemon");
const URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

async function obtenerPokemons() {
  listaPokemon.innerHTML = "<p>Cargando Pokémon...</p>";

  try {
    const respuesta = await fetch(URL);
    const datos = await respuesta.json();

    listaPokemon.innerHTML = ""; 


    for (const pokemon of datos.results) {
      const respuestaPokemon = await fetch(pokemon.url);
      const datosPokemon = await respuestaPokemon.json();

      mostrarPokemon(datosPokemon);
    }
  } catch (error) {
    listaPokemon.innerHTML = "<p>Error al cargar los Pokémon </p>";
    console.error(error);
  }
}

function mostrarPokemon(pokemon) {
  const tipos = pokemon.types
    .map((tipo) => `<p class="${tipo.type.name} tipo">${tipo.type.name}</p>`)
    .join("");

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
      <div class="pokemon-imagen">
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
      </div>
      <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokemon.id
              .toString()
              .padStart(3, "0")}</p>
            <h2 class="pokemon-nombre">${pokemon.name}</h2>
        </div>
        <div class="pokemon-tipos">${tipos}</div>
      </div>
  `;
  listaPokemon.append(div);
}

btnMostrar.addEventListener("click", obtenerPokemons);