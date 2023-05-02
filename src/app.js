import  express  from "express";
import ProductManager from "./productManager.js";

const app = express() //crea un obj que tiene varios metodos

let productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products" , async (req, res) => {     /*error que no pude encontrar: el tema es que se necesitaba poner un async await porque mis productos 
estan puestos asincronicamente en el test() del productManager.js, por lo tanto la funcion creada en este app.js debe ser asicronica para que tome los productos del array y no sea uno vacio.*/    
    try{
        let products = await productManager.getProducts()
        let type = req.query.type;
        let limit = req.query.limit;
        if(limit){
            res.send(await products.slice(0, limit));
            return;
        }
        if(!type || (type !== "pc" && type !== "phone")) { 
            res.send(products)
        } else {
            let productsFilter = products.filter(element => element.type === type);
            res.send (productsFilter);
        }
    } catch(error){
        console.log(error)
    }
})

app.get("/products/:pid" , async (req, res)=> {
    try {
        let products = await productManager.getProducts()
        let productID = products.find((element) => {
            return element.id == req.params.pid
        });
        res.send(productID);
    } catch (e) {
        console.log(e);
    }
})


app.listen(8080, () => {
    console.log("Estoy escuchando el 8080");
})