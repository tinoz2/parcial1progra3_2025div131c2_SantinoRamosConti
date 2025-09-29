let productosTienda = [
    { id: 1, nombre: "arandano", precio: 5000, ruta_img: "./img/arandano.jpg" },
    { id: 2, nombre: "banana", precio: 1000, ruta_img: "./img/banana.jpg" },
    { id: 3, nombre: "frambuesa", precio: 4000, ruta_img: "./img/frambuesa.png" },
    { id: 4, nombre: "frutilla", precio: 3000, ruta_img: "./img/frutilla.jpg" },
    { id: 5, nombre: "kiwi", precio: 2000, ruta_img: "./img/kiwi.jpg" },
    { id: 6, nombre: "mandarina", precio: 800, ruta_img: "./img/mandarina.jpg" },
    { id: 7, nombre: "manzana", precio: 1500, ruta_img: "./img/manzana.jpg" },
    { id: 8, nombre: "naranja", precio: 9000, ruta_img: "./img/naranja.jpg" },
    { id: 9, nombre: "pera", precio: 2500, ruta_img: "./img/pera.jpg" },
    { id: 10, nombre: "anana", precio: 3000, ruta_img: "./img/anana.jpg" },
    { id: 11, nombre: "pomelo-amarillo", precio: 2000, ruta_img: "./img/pomelo-amarillo.jpg" },
    { id: 12, nombre: "pomelo-rojo", precio: 2000, ruta_img: "./img/pomelo-rojo.jpg" }
];
let data = {
    dni: 46426580,
    nombre: "Santino",
    apellido: "Ramos Conti"
};

let nav = document.getElementById("nav");
let contenedor = document.getElementById("div-contenedor");
let search = document.getElementById("search");
let alumnoObj = document.getElementById("alumno-info");
let carritoObj = document.getElementById("carrito");
let contadorProductos = document.getElementById("contador");
let total = document.getElementById("total");
let vaciarCarritoObj = document.getElementById("vaciar-carrito");
const btnNombreObj = document.getElementById("orden-nombre");
const btnPrecioObj = document.getElementById("orden-precio");
let carrito = [];

const imprimirDatosAlumno = (alumno) => {
    let alumnoDiv = document.getElementById("alumno-info");
    alumnoDiv.innerHTML = `
        <p>${alumno.dni}</p>-<p>${alumno.nombre}</p>-<p>${alumno.apellido}</p>
    `;
}

const agregarAlCarrito = (productoId) => {

    let productoEncontrado = productosTienda.find(producto => producto.id === productoId);

    let productoEncontradoEnCarrito = carrito.find(producto => producto.id === productoId);

    if (productoEncontradoEnCarrito) {
        productoEncontradoEnCarrito.cantidad++
    } else {
        carrito.push({ ...productoEncontrado, cantidad: 1 })
    }

    calcularTotalProductos()
    calcularTotal()
    guardarEnLocalStorage(carrito)
    mostrarCarrito()
}

const mostrarCarrito = () => {

    let obj = ''
    carrito.forEach(producto => {
        obj +=
            `
            <li class="bloque-item">
                <p class="nombre-item">${producto.nombre} - ${producto.precio * producto.cantidad}$</p>
                <span>Cantidad: ${producto.cantidad} </span>
                <button class="boton-eliminar" onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </li>
        `
    })

    console.log(carrito)
    carritoObj.innerHTML = obj;
}

const eliminarProducto = (productoId) => {
    let productoEncontrado = carrito.find(producto => producto.id === productoId);

    if (productoEncontrado.cantidad === 1) {
        carrito = carrito.filter(producto => producto.id !== productoId);
    } else {
        productoEncontrado.cantidad--
    }
    calcularTotalProductos()
    calcularTotal()
    guardarEnLocalStorage(carrito)
    mostrarCarrito()
}

const calcularTotalProductos = () => {

    let cantidadProductos = carrito.reduce((acc, value) => acc + value.cantidad, 0)

    contadorProductos.innerText = `Carrito: ${cantidadProductos} productos`;
}

const calcularTotal = () => {

    let sumaTotal = carrito.reduce((acc, value) => acc + value.precio * value.cantidad, 0)
    total.innerText = `Total: ${sumaTotal}$`
}

search.addEventListener('keyup', function () {
    let value = search.value
    let valueFormatted = value.toLowerCase()

    let filteredProducts = productosTienda.filter(product =>
        product.nombre.toLowerCase().includes(valueFormatted)
    );
    mostrarProductos(filteredProducts)
})

const mostrarProductos = (array) => {
    let objetoProductos = ''
    array.forEach(producto => {
        objetoProductos +=
            `
            <div class="card-producto">
                <img class="img" src=${producto.ruta_img} alt=${producto.nombre}>
                <h3>${producto.nombre}</h3>
                <p>${producto.precio}$</p>
                <button class="btn" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `
    })
    contenedor.innerHTML = objetoProductos
}

vaciarCarritoObj.addEventListener('click', function () {
    carrito = [];
    localStorage.clear()
    mostrarCarrito()
    calcularTotal()
    calcularTotalProductos()
})

btnNombreObj.addEventListener("click", () => {
    let productosOrdenados = [...productosTienda].sort((a, b) => {
        return a.nombre.localeCompare(b.nombre);
    });
    mostrarProductos(productosOrdenados);
});

btnPrecioObj.addEventListener("click", () => {
    let productosOrdenados = [...productosTienda].sort((a, b) => a.precio - b.precio);
    mostrarProductos(productosOrdenados);
});

const guardarEnLocalStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const cargarLocalStorage = () => {
    let carritoGuardado = localStorage.getItem('carrito')
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado)
    } else {
        carrito = []
    }
    mostrarCarrito()
    calcularTotalProductos()
    calcularTotal()
}

const init = () => {
    console.log(data)
    imprimirDatosAlumno(data)
    mostrarProductos(productosTienda)
    calcularTotalProductos()
    calcularTotal()
    cargarLocalStorage()
}

init()