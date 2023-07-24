//COLECCION

//import mongoose from "mongoose";
// eslint-disable-next-line no-undef
const  { mongoose } = require('mongoose');
const { Schema } = require('mongoose');

//configuramos con Schema nuestra coleccion de DB
const userSchema = new Schema({
    id: {
        type: Number,
        require: true,
    },
    nombre:{
        type: String,
        require: true
    },
    precio:{
        type:String,
        require: true
    },
    urlimagen:{
        type: String,
        require: true
    },
    timestamp:{
        type: Date,
        default: new Date(),  //Fecha de dato insertado
    }
});

//exportamos la configuracion con el nombre de la coleccion

// eslint-disable-next-line no-undef
module.exports = mongoose.model('Carrito', userSchema);



