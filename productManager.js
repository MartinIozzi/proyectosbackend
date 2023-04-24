const fs = require('fs');

class ProductManager {

    #productID = 0;
    #getID() {
        this.#productID++;
        return this.#productID
    }

    constructor() {
        this.path = ('./info.json');
        this.product = [];
        
        if (!(fs.existsSync(this.path))) {
            fs.writeFileSync(
                this.path,
                JSON.stringify([]))
            return;
        }
        
    }

    getProducts(){
        return this.product;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            let product = {
                title,
                description,
                id: this.#getID(),
                price,
                thumbnail,                
                code,
                stock,
            };

            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log("Error: no se completaron los campos, faltan datos.");
                return;
            }

            let productList = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));

                productList.push(product);
                await fs.promises.writeFile(this.path,
                    JSON.stringify(productList)
                );
                //console.log(productList);
            

        } catch (err) {
            console.log('Error al querer agregar el producto a la lista');
        }
    }

    codeFunc () {
        let readCode = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        console.log("ReadCode:");
        console.log(readCode);
    }

    updateProduct(id, product) {

        this.product.forEach(element => {
            if (element.id == id){
                element.title = product.title;
                element.description = product.description;
                element.price = product.price;
                element.thumbnail = product.thumbnail;
                element.code = product.code;
                element.stock = product.stock;
                
                return;
            }
        })
        console.log("No existe la id: " + id)
    }
    
}

let listaProducto = new ProductManager();
/*
listaProducto.addProduct(
    "producto prueba",
    "Este es un producto de prueba",
    200,
    "sin imagen",
    "abc123",
    25
);

listaProducto.addProduct(
    "producto prueba 2",
    "Este es un producto de prueba",
    200,
    "sin imagen",
    "abc123",
    25
);
*/
/*
let product = {
    title: "producto reemplazado",
    description: "Este es un producto reemplazado",
    price: 300,
    thumbnail: "sin imagen",
    code: "abc456",
    stock: 20
};

listaProducto.updateProduct(1, product);
console.log(listaProducto.getProducts());

listaProducto.codeFunc()
*/
async function test (){

    await listaProducto.addProduct(
    "producto prueba",
    "Este es un producto de prueba",
    200,
    "sin imagen",
    "abc123",
    25);
    
    console.log("ADD listo")
    
    await listaProducto.codeFunc()
    
    console.log("GET listo")
    /*
    await listaProducto.updateProduct(1, product);
    
    console.log("UPDATE listo")
    */
    }

test()