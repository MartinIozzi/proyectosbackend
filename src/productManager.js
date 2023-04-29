import fs from 'fs'
//const fs = require('fs');

class ProductManager {

    constructor() {
        this.path = ('../info.json');
        this.id = 0;
        this.product = []   //Creé este array y lo pushee a la constante, creada abajo, readID. 
        //hacer un getproducts al inicio para no estar a cada rato creando una variable.
        
        //Creo este código para que si no existe nada en el JSON cree igual lo que vendria siendo el array donde contendría los productos.
        if (!(fs.existsSync(this.path))) {
            fs.writeFileSync(
                this.path,
                JSON.stringify([]))
            return;
        }
    }
    //Creo el parse en donde los productos del JSON se quedan para poder utilizarlo en las funciones de mas adelante.
    async getProducts(){
        try {
            const actualProducts = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(actualProducts);
        } catch (error) { 
            console.log("No se puede agregar mas productos");
        }
    };

    //Se agregan los productos, los cuales son aclarados abajo, al array de productos creado en el código de this.path.
    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            let product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };


            //Creo esta variable para poder crear la id, y que, al momento de crearla, se pushee a la lista del array del JSON
            // **ACLARACIÓN: El "this.product" está creado arriba en el constructor, y se pushea mas adelante a la lista del array para poder asi, poder pushear directamente a la lista creada del array en el JSON.
            const readId =
            this.id++;
            product.id = this.id; 
            this.product.push(product);

            //Esto envía la información codeada abajo al array creado en el JSON para que la lista tome el array del mismo.
            let productList = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
                JSON.stringify(product)
                productList.push(product);
                await fs.promises.writeFile(this.path,
                    JSON.stringify(productList)
                );
            //Esto verifica que el código específico del producto (ejemplo: "abc123"), no se repita mas de una vez, en tal caso, saltaría el error.
            //const actualProductos = await this.getProducts()
            /*if(this.product.find(element => element.code == product.code) != undefined){
                return console.log("Ya existe el código", product.code)}*/
                if(this.product.find(element => element.code == product.code) != undefined){
                    return console.log('Error al agregar producto: Ya existe el código "' + product.code + '"')
                }
        } catch (err) {
            console.log('Error al querer agregar el producto a la lista');
        }
    }

    //Este metodo, seleccionaría una id, escrita al final del código, la cual permita filtrar por ID los productos.
    async getProductByID(id){
        try {
            const actualProducts = await this.getProducts()
            return actualProducts.find(element => element.id == id)
        } catch (error) {
            console.log(error);
        }

    }
    
    //Este metodo permite leer el codigo, del array que contiene la lista de los productos.
    readCodes () {
        let readCode = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        console.log(readCode);
    }

    //Este metodo, permite, seleccionando la ID del producto, poder sobreescribir los datos de uno seleccionado.
    async updateProduct(id, product) {
        try {
            const actualProducts = await this.getProducts()
            let index = actualProducts.findIndex(element => element.id == id);
            product.id = id;
            this.product[index] = product;
            await fs.writeFileSync(this.path, JSON.stringify(this.product));
            if(index == -1){return console.log('Error al actualizar producto: No existe la ID: ' + id)}
        } catch (error) {
            console.log("No existe la id: " + id)
        }
    }

    //CÓDIGO DE PRUEBA
    async deleteProduct(id) {
        try {
            const actualProducts = await this.getProducts()
            let index = actualProducts.findIndex(element => element.id == id);
            if(index == -1){return console.log('Error al borrar producto: No existe la ID: ' + id)}
    
            actualProducts.splice(index, 1);
            await fs.writeFileSync(this.path, JSON.stringify(actualProducts));
        } catch (e) {
            console.log(e);
        }

    }
}

//Comienza el proceso de testeo del código.
let listaProducto = new ProductManager();

async function test (){
        /////
    await listaProducto.addProduct(
        "producto prueba",
        "Este es un producto de prueba",
        200,
        "sin imagen",
        "abc123",
        25);
    
    await listaProducto.addProduct(
        "producto prueba 2",
        "Este es un producto de prueba",
        200,
        "sin imagen",
        "abc456",
        25);

    await listaProducto.addProduct(
        "producto prueba 3",
        "Este es un producto de prueba",
        400,
        "sin imagen",
        "abc112",
        25);
    
    console.log("ADD listo")
        /////
    await listaProducto.readCodes()
    
    console.log("GET listo")
        /////
        let product = {
            title: "producto reemplazado",
            description: "Este es un producto reemplazado",
            price: 300,
            thumbnail: "sin imagen",
            code: "abc789",
            stock: 20
        };

    await listaProducto.updateProduct(1, product); 
    
    console.log("UPDATE listo")
        /////
    //console.log(await listaProducto.getProductByID(1)); 
    

    console.log("ID recibida");
        /////
    await listaProducto.deleteProduct(1);

    console.log("DELETE listo");
    }

test()

export default ProductManager;
