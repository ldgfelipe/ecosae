export const actions ={

    async nuxtServerInit(ctx){
},

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
                if(res.licencia){
                
                ///// actualiza status de licencia en el sistema 
           
                    ctx.dispatch("updateDataLicencia",res)
                    
                
                
                }else{

                        ctx.commit('agregaMensaje',res[0])
                        setTimeout(function(){ ctx.commit('agregaMensaje','')  },6000)
                    }
                
                })
    },
    async updateDataLicencia(ctx,data){
   var url="";
        if(window.location.port!==null){
            url='http://'+window.location.hostname+':'+window.location.port+'/api/savedata'
        }else{
            url='http://'+window.location.hostname+'/api/savedata'
        }
    
       await fetch(url,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(res=>{
        
         ctx.commit('updateLicencia',data)

        })


        
    },
    async validaLicenciSql(ctx,data){




    },
    ejecutaInstruccion(ctx,data){

        var url="";
        if(window.location.port!==null){
            url='http://'+window.location.hostname+':'+window.location.port
        }else{
            url='http://'+window.location.hostname
        }           
        var codigo="";

        switch(data.tipo){
            case 'sistema':

                    switch(data.codigo){
                        case 'reinicio-ngnix':
                            codigo="sudo systemctl restart ngnix";
                            break;
                        case 'reinicio-pm2':
                            codigo="sudo pm2 restart all";
                            break;
                        case 'actualiza-sistema':
                            codigo="git pull origin dev   git merge sudo pm2 restart all";
                            break;
                    }



                var payload={

                }
                    fetch(url+'/api/exec',{
                        method:'POST',
                        headers:{
                            'Content-type':'applicacions/json'
                        },
                        body:JSON.stringify()
                    })
                    .then(res=>res.json())
                    .then((res)=>{

                    })
            
            break;

        }


    }

}

