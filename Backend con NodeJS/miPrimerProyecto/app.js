const express = require("express"); //extrayendo el modulo con require en este caso a Express

const app = express(); //llamamos y guardamos en una variable los metodos o funciones de Express

const bodyParser = require("body-parser");

const puerto = 3001;

const cors = require("cors");

const { Client } = require("pg");


const client = new Client({
    user: "postgres",
    host: "192.168.1.26",  //localhost
    database: "nodeJS",
    password: "Postgresql.",
    port: 5432
});

app.use(cors()); // ← ACTIVA CORS

app.use(bodyParser.json());


app.use("/contactos", (req, resp, next) => {
    console.log("Ingresa a Middleware");
    console.log("headers:", req.headers);
    console.log("body:", req.body);
    next();
});


// METODO GET
app.get("/contactos", (request, response) => {
    // const contactos = [
    //     {id:1, nombre: "Santiago", apellido: "Mosquera", celular: "098765412"},
    //     {id:2, nombre: "Sandra", apellido: "Romero", celular: "0985213654"},
    //     {id:3, nombre: "Kevin", apellido: "Oro", celular: "0923415621"}
    // ];
    console.log("Ingresa a GET");

    client.connect();

    client.query("select * from contactos").then(responseQuery => {
        console.log(responseQuery.rows);
        response.send(responseQuery.rows);
        //client.end();
    }).catch(err => {
        console.log(err);
        client.end();
    })

    //response.send(contactos); 


});


// METODO POST  (INSERTAR)
app.post("/contactos", (pedido, repuesta) => {
    //pedido.body.id = 99;
    //repuesta.send("post contactos");

    client.query(
        'insert into contactos (nombre, apellido, celular) values ($1, $2, $3);', [pedido.body.nombre, pedido.body.apellido, pedido.body.celular]
    ).then(responseQuery => {
        console.log(responseQuery.rows);
        repuesta.send(responseQuery.rows);
        //client.end();
    }).catch(err => {
        console.log(err);
        client.end();
    })

    //repuesta.send(pedido.body);
});


//METODO PUT  (ACTUALIZAR)
app.put("/contactos/:idParam", (req, resp) => {
    const id = req.params.idParam;
    console.log("id", id);

    client.query(
        'UPDATE contactos set nombre = $1, apellido = $2, celular = $3 where id = $4', [req.body.nombre, req.body.apellido, req.body.celular, req.params.idParam]
    ).then(responseQuery => {
        console.log(responseQuery.rows);
        resp.send(responseQuery.rows);
        //client.end();
    }).catch(err => {
        console.log(err);
        client.end();
    })
    //resp.send(req.body);
    //resp.send("put contactos");
});


//METODO DELETE
app.delete("/contactos/:id", (req, resp) => {
    //const id = req.params.id;
    //console.log("id:", id);

     client.query(
        'delete from contactos where id = $1', [req.params.id]
    ).then(responseQuery => {
        console.log(responseQuery.rows);
        resp.send(responseQuery.rows);
        //client.end();
    }).catch(err => {
        console.log(err);
        client.end();
    })

    //resp.send({ id: id });
});

//linea de codigo para levantar un servidor en Express 
// se levanta con la funcion listen y dentro de ella se ubica como primer parametro el puerto y el segundo la funcion creada alli que queremos wque ejecute 
app.listen(puerto, () => {
    console.log("Servidor listo en el puerto " + puerto);
});