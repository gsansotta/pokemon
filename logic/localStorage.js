import { pokeHistorial } from "./constants"

export function recuperoLocal(){
 let recuperoLocal = (JSON.parse(localStorage.getItem("pkm") || "[]"))
 pokeHistorial.length===0&&pokeHistorial.push(recuperoLocal)    
}