const fs = require('fs');

class ProductManager {

    constructor() {
        this.path = ('./info.json');
        this.id = 0;
        this.product = []
        
        if (!(fs.existsSync(this.path))) {
            fs.writeFileSync(
                this.path,
                JSON.stringify([]))
            return;
        }
    }
            //lo importante sería: const actualProductos = await this.getProducts()
    async getProducts(){
        try {
            const actualProducts = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(actualProducts);
        } catch (error) { 
            console.log("No se puede agregar mas productos");
        }
    };

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

            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log("Error: no se completaron los campos, faltan datos.");
                return;
            }

            const readId =
            this.id++;
            product.id = this.id; 
            this.product.push(product);

            const actualProductos = await this.getProducts()
            actualProductos.find(element => 
                {if(element.code === product.code){
                    console.log("Ya existe el código", product.code);
            }
        });

            let productList = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
                
                this.product.push(productList)
                productList.push(product);
                await fs.promises.writeFile(this.path,
                    JSON.stringify(productList)
                );
        } catch (err) {
            console.log('Error al querer agregar el producto a la lista');
        }
    }

    async getProductByID(id){
        let producto = ""
        const actualProductos = await this.getProducts()
            actualProductos.find(element => 
                {if (element.id == id){
                    producto = element;
                }})
    }

    readCodes () {
        let readCode = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        console.log("ReadCode:");
        console.log(readCode);
    }

    async updateProduct(id, product) {
        try {
            const actualProductos = await this.getProducts()
            actualProductos.find(element => {if (element.id === product.id)
                element.title = product.title;
                element.description = product.description;
                element.price = product.price;
                element.thumbnail = product.thumbnail;
                element.code = product.code;
                element.stock = product.stock;})
        } catch (error) {
            console.log("No existe la id: " + id)
        }
    }
}

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
        
    await listaProducto.updateProduct(2, product);
    
    console.log("UPDATE listo")
        /////
    await listaProducto.getProductByID(2);

    console.log("ID recibida");
        /////
    }

test()