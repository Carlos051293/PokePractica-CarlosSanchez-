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

// -----------------------------------------------------------
//  Ejercicio 3 - Buscador de Pokémon con diseño personalizado
// -----------------------------------------------------------

const main = document.querySelector("main");
const buscadorDiv = document.createElement("div");
buscadorDiv.style.textAlign = "center";
buscadorDiv.style.marginBottom = "2rem";
buscadorDiv.innerHTML = `
  <input type="text" id="buscador" placeholder="Buscar Pokémon por nombre o ID..." 
         style="padding: 0.5rem 1rem; border-radius: 0.5rem; border: 1px solid #ccc; width: 60%;">
  <button id="btnBuscar" style="padding: 0.5rem 1rem; margin-left: 1rem; border-radius: 0.5rem; background-color: var(--type-grass); font-weight: bold; cursor: pointer;">Buscar</button>
`;
main.insertBefore(buscadorDiv, document.getElementById("todos"));

const inputBuscar = document.getElementById("buscador");
const btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener("click", () => {
  const nombre = inputBuscar.value.trim().toLowerCase();
  if (nombre === "") {
    alert("Introduce un nombre o ID de Pokémon");
    return;
  }
  buscarPokemon(nombre);
});

inputBuscar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btnBuscar.click();
  }
});

async function buscarPokemon(nombre) {
  listaPokemon.innerHTML = "<p>Buscando Pokémon...</p>";

  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!respuesta.ok) throw new Error("Pokémon no encontrado");

    const datos = await respuesta.json();

    listaPokemon.innerHTML = ""; 
    mostrarPokemon(datos);
  } catch (error) {
    listaPokemon.innerHTML = `<p>No se encontró ningún Pokémon con ese nombre o ID </p>`;
    console.error(error);
  }
}