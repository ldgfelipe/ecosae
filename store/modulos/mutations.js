import {state } from "./state"
export const mutations = {
  updateLicencia(state,data){

    if(data){
    state.licencia=data.licencia ? data.licencia : ""
    state.statusServer=data.status === 1 ? true : false 
    state.datos=data
    }
  },
  agregaMensaje(state,data){
    state.mensaje=data
  }
}