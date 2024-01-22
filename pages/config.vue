<template>
    <v-card>
        <v-card-title>
            Configuración de sistema

        </v-card-title>
        <v-card-text>
            <label>Producto</label>
            <v-select :items="itemProducto" ></v-select>
            <label>Variante</label>
{{ itemVariante[itemProducto] }}
            <v-select v-if="itemProducto" :items="itemVariante[itemProducto]"  ></v-select>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data(){
        return {
            itemProducto:["Deshidratador","Planta_Interconectada","Luminaria"],
            itemVariante:{
                Deshidratador:['Basico','Basico Plus','Semi industrial','Industrial'],
                Planta_Interconectada:['300w','600w','1000w'],
                Luminaria:['Super Urban','Urban','Optima24','TotalOne']
            }
        }
    }
}

</script>