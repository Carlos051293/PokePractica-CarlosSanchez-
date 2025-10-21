// 🧩 PokePractica - main.js
// -----------------------------------------------------------
// ✅ Ejercicio 1 - Manipulación de eventos y cambio de color
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