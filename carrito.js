class Carrito {
    #nameShoppingCart = null
    #session = null

    constructor(nameShoppingCart, session = true) {
        this.#nameShoppingCart = nameShoppingCart
        this.#session = session

        if (this.#session && sessionStorage.getItem(this.#nameShoppingCart) === null) {
            sessionStorage.setItem(this.#nameShoppingCart, '');
        } else if (sessionStorage.getItem(this.#nameShoppingCart) === null) {
            localStorage.setItem(this.#nameShoppingCart, '');
        }
    }

    addCarrito(product, cantidad) {
        if (!this.#validateProduct(product))
            return console.warn('validar que el objeto producto que por lo menos tenga los siguientes campos: nombre (name), precio (price), img');
        
        let shoppingCart = this.#getStorage()
        if (this.#productExist(product)) {
            let { producto, indexProduct: index } = this.#getProduct(product)
            const nuevaCantidad = producto.cantidad + cantidad
            producto.cantidad = nuevaCantidad
            producto.total = product.precio * nuevaCantidad
            shoppingCart[index] = producto
        } else {
            const total = product.precio * cantidad
            const producto = {
                product,
                cantidad,
                total
            }
            shoppingCart.push(producto)
        }

        this.#guardarCadena(shoppingCart)
    }

    deleteProduct(product, cantidad = null) {
        if (!this.#validateProduct(product))
            return console.warn('validar que el objeto producto que por lo menos tenga los siguientes campos: nombre (name), precio (price), img');
        
        let shoppingCart = this.#getStorage()
        if (this.#productExist(product)) {
            let { producto, indexProduct: index } = this.#getProduct(product)
            if (cantidad) {
                const nuevaCantidad = producto.cantidad - cantidad
                producto.cantidad = nuevaCantidad
                producto.total = product.precio * nuevaCantidad
                shoppingCart[index] = producto
            } else {
                shoppingCart.splice(index, 1);
            }
            
            this.#guardarCadena(shoppingCart)
        } else {
            console.warn('no existe producto');
        }
    }

    getCarrito() {
        const shoppingCart = this.#getStorage()
        let totalProducts = 0
        let quantityProducts = 0
        shoppingCart.forEach(element => {
            totalProducts += element.total
            quantityProducts += element.cantidad
        });

        return {
            shoppingCart,
            totalProducts,
            quantityProducts
        }
    }

    limpiarCarrito() {
        if (this.#session) {
            sessionStorage.setItem(this.#nameShoppingCart, '');
        } else {
            localStorage.setItem(this.#nameShoppingCart, '');
        }
    }

    #guardarCadena(carrito) {
        const stringValue = JSON.stringify(carrito);
        if (sessionStorage.getItem(this.#nameShoppingCart) !== null) {
            sessionStorage.setItem(this.#nameShoppingCart, stringValue);
        } else if (localStorage.getItem(this.#nameShoppingCart) !== null) {
            localStorage.setItem(this.#nameShoppingCart, stringValue);
        }
    }

    #productExist(product) {
        const carrito = this.#getStorage()
        let producto = carrito.find((item) => {
            return JSON.stringify(item.product) === JSON.stringify(product);
        })

        return producto ? true : false
    }

    #getProduct(product) {
        const carrito = this.#getStorage();
        let indexProduct = null;
        let producto = carrito.find((item, index) => {
            indexProduct = index;
            return JSON.stringify(item.product) === JSON.stringify(product);
        })

        return { producto, indexProduct };
    }

    #getStorage() {
        let value = sessionStorage.getItem(this.#nameShoppingCart);
        if (!value) {
            value = localStorage.getItem(this.#nameShoppingCart);
        }
        return value ? JSON.parse(value) : [];
    }

    #validateProduct(product) {
        return (
            product
            //&& (typeof product.nombre === 'string' || typeof product.name === 'string')
            && (typeof product.precio === 'number' || typeof product.price === 'number') 
            //&& typeof product.img === 'string'
        );
    }
}

/*
https://www.toptal.com/developers/javascript-minifier
validacion1Email: '([a-zA-Z0-9]{1,50}[\\_\\-\\.]?[a-zA-Z0-9]{1,50}){1,100}',
validacion2Email: '[a-zA-Z]{2,5}$',
cadenaEmail() {
    return `^${this.validacion1Email}@${this.validacion1Email}\\.${this.validacion2Email}`;
}
validateEmail(value: string) {
    let valido = false;
    let expreg = new RegExp(this.cadenaEmail);
    if(expreg.test(value))
        valido = true;

    return valido;
},
 */