import { mensaje, historialDiv, modal, pokeHistorial } from './constants.js'

export function insertarImagenesEnHistorial() {  
  historialDiv.innerHTML = '';
  mensaje.style.display = 'none';  
  pokeHistorial.forEach(poke => {
    const img = poke.img
    const imagenHTML = `
      <div class='historialContainer'onclick="window.eliminarPkm(${poke.id})">
      <span class='close' >X</span>
        <img src="${img}" alt="Pokemon" id="fotoHistorial" onclick="abrirInfo(${poke.id})">
        <span>
         <p>#${poke.id}</p>
        </span>
      </div>`;
    historialDiv.insertAdjacentHTML('beforeend', imagenHTML);
  });
 
}

 export function loadHistorial (){
  let recupero= JSON.parse(localStorage.getItem("pkm") || "[]");
  recupero.forEach(item => {  
    pokeHistorial.push(item);
  }); 
  insertarImagenesEnHistorial()
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

export function generoCard (data){
  spinner.style.display = 'block';
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
    localStorage.setItem("pkm", JSON.stringify(pokeHistorial))     
    insertarImagenesEnHistorial()
  }, 1000);
  
}

window.eliminarPkm = function (id) {
  console.log('ENTRE ACA');
  console.log(id);
  const index = pokeHistorial.findIndex(objeto => objeto.id === id);
  console.log(index);
    pokeHistorial.splice(index, 1);
  
};
window.limpiarHistorial = function () {
  pokeHistorial.splice(0, pokeHistorial.length) 
  historialDiv.innerHTML = '';
  modal.innerHTML = '';
  mensaje.style.display = 'block';
  localStorage.removeItem('pkm');
}

window.cerrarModal = function () {
  modal.style.display = 'none'
  modal.innerHTML = ''
  const infoModalDiv = document.querySelector('.infoModal');
  infoModalDiv.style.display='none'
  infoModalDiv.innerHTML = ''
}

export function abrirModal() {
  modal.style.display = 'block';
  btnAceptar.disabled = true;
}

window.abrirInfo =function (id) {
  const pokemon = pokeHistorial.find(objeto => objeto.id === id)
  const infoModalDiv = document.querySelector('.infoModal');
  infoModalDiv.style.display='block'
  infoModalDiv.innerHTML = bodyModal(pokemon);
  abrirModal()


}
