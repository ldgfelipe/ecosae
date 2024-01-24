
export const actions ={
   async revisaLicencia(ctx){
                fetch('http://localhost:8080/api/connect')
                .then(res=>res.json())    
                .then((res)=>{
                    console.log(res)
                   ctx.commit('updateLicencia',res.licencia[0].apikey)
                })
    }
}