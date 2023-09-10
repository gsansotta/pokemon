import { btnAceptar, formulario,  pokemon, spinner, pokeHistorial } from './constants.js'
import { abrirModal, loadHistorial, generoCard} from './functions.js';


function fetchPokemonInfo(pokemonName) {
  spinner.style.display = 'block';
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json())
    .then(data => {
      generoCard(data)
    })
    .catch(error => {
      spinner.style.display = 'none'
      btnAceptar.disabled = true;
      alert('Ingreso incorrecto')
    });
}


/* TOMA EL VALOR DEL INPUT Y LO PARSEA A MINUSCULA PORQUE LA API ESPERA MINUSUCULAS */
function handleSubmit(event) {
  let selectedPokemon
  event.preventDefault();
  selectedPokemon = pokemon.value.toLowerCase()
  fetchPokemonInfo(selectedPokemon)
  abrirModal()
  document.getElementById('miFormulario').reset();
}

formulario.addEventListener('submit', handleSubmit);

/* VALIDA SI NO SE INGRESA DATO, EL BTN DE BUSQUEDA SERÁ DISABLED */
function validarCampo() {
  if (pokemon.value.trim() === '') {
    btnAceptar.disabled = true;
  } else {
    btnAceptar.disabled = false;
  }
}
pokemon.addEventListener('input', validarCampo);


document.addEventListener('DOMContentLoaded', function() {   
  loadHistorial ()  
});


