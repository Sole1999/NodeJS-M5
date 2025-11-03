const exp = require("express");

const app = exp();
const bodyParser = require("body-parser");
const puerto = 2000

const cors = require("cors");

app.use(cors()); // ← ACTIVA CORS


app.use(bodyParser.json());

app.use("/laptops", (solicitud, respuesta, next)=>{
    console.log("HEADERS: ", solicitud.headers);
    console.log("BODY: ", solicitud.body);
    next();
});

app.post("/laptops", (req , resp)=>{
    id = req.body.id = 100;
    resp.send(req.body);
    console.log("id:", id);
});

app.get("/laptops/:id",(req, resp)=>{

    const lpts = [
         {id: 1, marca: "HP", procesador: "RYZEN 7", memoria: "62 GB", disco: "2 TB"},
         {id: 2, marca: "MAC", procesador: "CORE i9", memoria: "102 GB", disco: "1 TB"},
         {id: 3, marca: "LENOVO", procesador: "RYZEN 7", memoria: "32 GB", disco: "1 TB"},
         {id: 4, marca: "DELL", procesador: "CORE i6", memoria: "62 GB", disco: "328 GB"}
     ];

    const ide = req.params.id;
    //resp.send( req.marca, req.procesador, req.memoria, req.body.disco);
    console.log("id:", ide);
    resp.send(req.body);
});

app.get("/laptops",(req, resp)=>{

    const lpts = [
         {id: 1, marca: "HP", procesador: "RYZEN 7", memoria: "62 GB", disco: "2 TB"},
         {id: 2, marca: "MAC", procesador: "CORE i9", memoria: "102 GB", disco: "1 TB"},
         {id: 3, marca: "LENOVO", procesador: "RYZEN 7", memoria: "32 GB", disco: "1 TB"},
         {id: 4, marca: "DELL", procesador: "CORE i6", memoria: "62 GB", disco: "328 GB"}
     ];
    //resp.send(req.body);
    resp.send(lpts);
});

app.put("/laptops/:id",(req, resp)=>{

    const ide = req.params.id;
    console.log("id:", ide);
    resp.send(req.body);
});

app.delete("/laptops/:id",(req, resp)=>{

    const ide = req.params.id;
    console.log("id:", ide);
    resp.send({id : ide});
});

app.listen(puerto,()=>{
    console.log("Servidor activo con el puerto:", puerto);
});
