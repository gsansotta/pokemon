import { mensaje, historialDiv, modal, pokeHistorial } from './constants.js'

export function insertarImagenesEnHistorial() {
  historialDiv.innerHTML = '';
  mensaje.style.display = 'none'; 
  pokeHistorial.forEach(poke => {
    const img = poke.img
    const imagenHTML = `
      <div>
        <img src="${img}" alt="Pokemon" id="fotoHistorial" onclick="abrirInfo(${poke.id})">
        <span>
         <p>#${poke.id}</p>
        </span>
      </div>`;
    historialDiv.insertAdjacentHTML('beforeend', imagenHTML);
  });
  localStorage.setItem("pkm", JSON.stringify(pokeHistorial))
}


export function bodyModal(pokemon) {
  return `
  <div class="card">
  <span class="close" onclick="window.cerrarModal()" class="cerrar">X</span>
  <h4 class="card-text">#${pokemon.id}</h4>
  <img class="card-img-top" src="${pokemon.img}" alt="Card image cap">
       <div class="card-body">
       <p class="card-text">Nombre: ${pokemon.nombre}</p>
       <p class="card-text">Altura: ${pokemon.altura} MTS</p>
       <p class="card-text">Peso: ${pokemon.peso} KG</p>
       </div>
       </div>
       `;
}


window.limpiarHistorial = function () {
  pokeHistorial.shift()
  console.log(pokeHistorial);
  historialDiv.innerHTML = '';
  modal.innerHTML = '';
  mensaje.style.display = 'block';
  localStorage.removeItem('pkm');
}

window.cerrarModal = function () {
  modal.style.display = 'none'
  modal.innerHTML = ''
}

export function abrirModal() {
  modal.style.display = 'block';
  btnAceptar.disabled = true;
}

function abrirInfo(id) {
  const pokemon = pokeHistorial.find(objeto => objeto.id === id)
  console.log(pokemon);
}
