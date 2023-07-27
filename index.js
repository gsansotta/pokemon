let pokeHistorial = []
const pokemon = document.getElementById('pokeInput')
let selectedPokemon

function handleSubmit(event) {
  event.preventDefault();
  selectedPokemon = pokemon.value.toLowerCase()
  console.log(selectedPokemon);
  document.getElementById('miFormulario').reset();
  fetchPokemonInfo(selectedPokemon) 
  abirModal()

}

const formulario = document.getElementById('miFormulario');
formulario.addEventListener('submit', handleSubmit);

const btnAceptar = document.getElementById('btnAceptar');

function validarCampo() {
  if (pokemon.value.trim() === '') {
    btnAceptar.disabled = true;
  } else {
    btnAceptar.disabled = false;
  }
}

pokemon.addEventListener('input', validarCampo);

const modal = document.getElementById('pokemon-info')



function abirModal() {
  modal.style.display = 'block'; 

}

function cerrarModal() {
  modal.style.display = 'none'
  btnAceptar.disabled = true;
  modal.innerHTML = ''
}
const historialDiv = document.getElementById('historial');

function insertarImagenesEnHistorial() {
  const mesaje = document.getElementById('msjBusqueda')
  historialDiv.innerHTML = '';
  mesaje.innerHTML = '';
  let recupero= JSON.parse(localStorage.getItem("pkm") || "[]");
  console.log(recupero);
  recupero.forEach(poke => {
    const img = poke.img
    const imagenHTML = `<img src="${img}" alt="Pokemon">`;
    historialDiv.insertAdjacentHTML('beforeend', imagenHTML);
  });  
  
}


function limpiarHistorial(){
  pokeHistorial = []
  historialDiv.innerHTML = '';
  modal.innerHTML ='';
  localStorage.removeItem('pkm');
}

const spinner = document.getElementById('spinner');

function fetchPokemonInfo(pokemonName) {
  spinner.style.display = 'block';
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json())
    .then(data => {
      const pokemon ={
      nombre : data.name.toUpperCase(),
      altura : (data.height)/10,
      peso : (data.weight)/10,
      img : data.sprites.other.home.front_default}
      const pokemonInfo = `
            <div class="card">
            <span class="close" onclick="cerrarModal()" class="cerrar">X</span>
            <img class="card-img-top" src="${pokemon.img}" alt="Card image cap">
            <div class="card-body">
              <h4 class="card-text">Nombre: ${pokemon.nombre}</h4>
              <h5 class="card-text">Altura: ${pokemon.altura} MTS</h5>
              <h5 class="card-text"> Peso: ${pokemon.peso} KG</h5>
            </div>
          </div>              
            `;
            setTimeout(() => {              
              document.getElementById('pokemon-info').innerHTML = pokemonInfo;
              pokeHistorial.push(pokemon)
              spinner.style.display = 'none';
              localStorage.setItem("pkm", JSON.stringify(pokeHistorial))
               insertarImagenesEnHistorial() 
              console.log(pokeHistorial);
            }, "1000");
    })
    .catch(error => {
      alert('Ingreso incorrecto. Ingrese el nombre del Pokemon correctamente')
      console.error('Error al obtener la información del Pokémon:', error);
    });

}


document.addEventListener('DOMContentLoaded', function() {
  insertarImagenesEnHistorial()
});



