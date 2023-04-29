import  express  from "express";
import ProductManager from "./productManager.js";

const app = express() //crea un obj que tiene varios metodos

let productManager = new ProductManager();

app.get("/products", (req, res) =>{
    res.send(productManager.getProducts());
})


app.listen(8080, () => {
    console.log("Estoy escuchando el 8080");
})
