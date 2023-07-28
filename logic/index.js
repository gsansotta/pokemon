import { btnAceptar, formulario,  pokemon, spinner, pokeHistorial } from './constants.js'
import { insertarImagenesEnHistorial, bodyModal, abrirModal} from './functions.js';
import { recuperoLocal } from './localStorage.js';


function fetchPokemonInfo(pokemonName) {
  spinner.style.display = 'block';
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json())
    .then(data => {
      const pokemon = {
        id: data.id,
        nombre: data.name.toUpperCase(),
        altura: (data.height) / 10,
        peso: (data.weight) / 10,
        img: data.sprites.other.dream_world.front_default || data.sprites.other.home.front_default
      };
      setTimeout(() => {
        document.getElementById('pokemon-info').innerHTML = bodyModal(pokemon);
        pokeHistorial.push(pokemon)
        spinner.style.display = 'none';       
        insertarImagenesEnHistorial()
      }, "1000");
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



recuperoLocal()
insertarImagenesEnHistorial()



