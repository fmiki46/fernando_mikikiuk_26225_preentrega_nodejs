console.log("Inicio de programa") // imprime por consola 

console.log(process.argv) // muestra los rutas que contiene el archivo que ejecuta

const args = process.argv.slice(2); // recorta los primeros dos elementos para tomar solo los que recibe del usuario

async function obtenerProductos(url){ // hace peticion http metodo asincronico
    try {
        const response = await fetch (`https://fakestoreapi.com/${url}`) // hace una peticion a la api
        const data = await response.json() // convierte la respuesta a json
        return data // retorna la información
    } 
    catch (error){
        console.log("error"); // imprime cualquier error
    }
}
async function crearProducto(producto){   // funcion para registrar un nuevo producto formato HTTP
    try{
        const response = await fetch(`https://fakestoreapi.com/products`,{
            method: "POST",
            headers: { "Content-Type": "application/json" }, // avisa al headers que va enviar información en formato json
            body: JSON.stringify(producto) // en el body convierte el objeto json a formato de texto
        })
        if(response.ok){
            const data = await response.json();  // extrae el json y lo imprime por consola mostrando el producto y el id creado.
            console.log(data)
            console.log("Id del producto creado: ", data.id)
        }
    }catch(error){
        console.log(error)
    }
}
async function eliminarProducto(producto){
    try{
        const response = await fetch(`https://fakestoreapi.com/${producto}`,{ 
            method: "DELETE"
        })
        const data = await response.json() // parsea la respuesta a json y la devuelve 
        return data
    }catch(error){        // si hay una falla lo atrapa en el catch
        console.log(error)
    }
}

switch(args[0]) {
    case "GET":
        console.log(args[0]);
            if(args[1] && args[1].startsWith("products")){ // validda que el segundo elemento comience con producto
            const products = await obtenerProductos(args[1]); 
            console.log("productos")

        }else{
            console.log("Comando incorrecto")
        }
        break;
    
    case "POST":
        console.log(args[0]);
        if(args[1] && args[2] && args[3] && args[4] && args[1] == "products"){
            await crearProducto({title: args[2], price: args[3], category: args[4]})
            console.log("Prodcuto creado")
        }else{
            console.log("Comando incompleto o incorrecto")
        }
        break;

    case "DELETE":
        console.log(args[0]);
        if(args[1].startsWith("products/") && args[1].length > 9){
            const response = await eliminarProducto(args[1]);
            console.log("Producto eliminado ", response)
        }else{
            console.log("Comando incompleto o incorrecto")
        }
        break;


}
