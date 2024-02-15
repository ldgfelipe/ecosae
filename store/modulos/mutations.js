import {state } from "./state"
export const mutations = {
  updateLicencia(state,data){
console.log('update 1')
    if(data){
      console.log('update 2')
      console.log(data)
    state.licencia=data.licencia ? data.licencia : ""
    state.statusServer=data.status === 1 ? true : false 
    state.datos=data

    console.log(state.statusServer)
    }
  },
  agregaMensaje(state,data){
    state.mensaje=data
  }
}