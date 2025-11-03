const express = require("express"); //extrayendo el modulo con require en este caso a Express

const app = express(); //llamamos y guardamos en una variable los metodos o funciones de Express

const bodyParser = require("body-parser");

const puerto = 3001;

const cors = require("cors");

app.use(cors()); // ← ACTIVA CORS

app.use(bodyParser.json());

app.use("/contactos", (req, resp, next)=>{
    console.log("Ingresa a Middleware");
    console.log("headers:", req.headers);
    console.log("body:", req.body);
    next();
});

app.get("/contactos",(request, response)=>{
    const contactos = [
        {id:1, nombre: "Santiago", apellido: "Mosquera", celular: "098765412"},
        {id:2, nombre: "Sandra", apellido: "Romero", celular: "0985213654"},
        {id:3, nombre: "Kevin", apellido: "Oro", celular: "0923415621"}
    ];
    console.log("Ingresa a GET");
    response.send(contactos); 
});

app.post("/contactos",(pedido, repuesta)=>{
    pedido.body.id =99;
    repuesta.send(pedido.body);
    //repuesta.send("post contactos");
});

app.put("/contactos/:idParam",(req, resp)=>{
    const id = req.params.idParam;
    console.log("id", id);
    resp.send(req.body);
    //resp.send("put contactos");
});

app.delete("/contactos/:id",(req, resp)=>{
    const id = req.params.id;
    console.log("id:", id);
    resp.send({id : id});
});

//linea de codigo para levantar un servidor en Express 
// se levanta con la funcion listen y dentro de ella se ubica como primer parametro el puerto y el segundo la funcion creada alli que queremos wque ejecute 
app.listen(puerto,()=>{
    console.log("Servidor listo en el puerto "+ puerto);
});