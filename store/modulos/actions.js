
export const actions ={
   async revisaLicencia(ctx,data){

var payload={
    licencia:data
}

               await fetch('https://apisaecsa.saecsaenergiasolar.com/api/ecosae',{
                    method:'POST',
                    headers:{
                        'Content-type':'application/json',
                    },
                    body:JSON.stringify(payload)
                })
                .then(res=>res.json())    
                .then((res)=>{
                    console.log(res)
                    ctx.dispatch("updateDataLicencia",res)
                
                })
    },
    async updateDataLicencia(ctx,res){
   
        
    
       await fetch('http://'+window.location.hostname+':8080/api/savedata',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(res)
        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)


        })


        ctx.commit('updateLicencia',res)
    }

}

