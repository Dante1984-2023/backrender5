const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
const authenticateToken = require("./auth/authenticateToken");
const log = require("./lib/trace");
const Producto = require('./model/userModels.tsx');
// middleware
const corsOptions = {
    origin: "https://galmesfinal.netlify.app" // frontend URI (ReactJS)
}
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
// connect MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    const PORT = process.env.PORT || 8000
  
 
app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/signout", require("./routes/logout"));

// Ruta para renovar el token de acceso utilizando el token de actualización
app.use("/api/refresh-token", require("./routes/refreshToken"));

app.use("/api/posts", authenticateToken, require("./routes/posts"));
// Ruta protegida que requiere autenticación

app.use("/api/user", authenticateToken, require("./routes/user"));





app.get('/', (req, res) => {
    res.send(`<h1>Soy el Back del CARRITO3</h1>`)
});

app.post('/productocarrito', async (req, res) => {
    console.log(req.body);
    const { id, nombre, urlimagen, precio } = req.body;

    console.log(`Mi id es ${id}, mi nombre es ${nombre}, mi url es ${urlimagen} y el precio ${precio}`);

       //4. si no Existe, creamos un nuevo usuario
    const nuevoProducto = new Producto(req.body);

    console.log(`1. Nuevo Usuario a guardar: ${nuevoProducto}`);

    await nuevoProducto.save();


});

app.get('/Mostrarproducto', async (req, res) =>{
    const productonuevo = await Producto.find({},
        {
            "id": 1,
            "nombre": 1,
           "urlimagen": 1,
           "precio":1,
           "timestamp": 1
        });

       let miDia= new Date();

        console.log(productonuevo);
        res.json({ 
          productonuevo
        })
})

/* Eliminamos los datos */
app.delete('/Mostrarproducto/:id', async (req, res)=>{
    const id = req.params.id;
    console.log(id);

    try {
        const deleteProductoE = await Producto.findByIdAndDelete(id);
         console.log(deleteProductoE);
         if(!deleteProductoE){
            return res.status(404).send();
         }else{
            console.log('Producto Eliminado');
            return res.status(200).send();
         }
    }catch(error){

    }
})


/* Actualizamos los datos del Producto */

app.put('/Mostrarproducto/:id', async (req, res)=>{
    const id = req.params.id;
    console.log(id);


    const data ={
        nombre: req.body.nombre,
        urlimagen:req.body.urlimagen,
        precio:req.body.precio,
      
    }
     console.log(data);
     console.log(id);
   
       try {
        const updateProductoA = await Producto.findByIdAndUpdate(id, data);
         console.log(updateProductoA);
         if(updateProductoA){
            console.log('Producto Actualizado');
            return res.status(200).send();
         }else{
           
            return res.status(404).send();
         }
    }catch(error){
          console.log(error);
    }
})


  app.listen(PORT, () => {
      console.log(`App conectada al puerto  ${PORT}`);
  })
}).catch(err => {
  console.log(err);
});






  
  
  

