document.addEventListener("DOMContentLoaded", function () {
    fetch("data/productos.json")
        .then(response => response.json())
        .then(data => {
            cargarProductos(data.frutas.frutos_rojos, "frutos-rojos");
            cargarProductos(data.frutas.frutas_tropicales, "frutas-tropicales");
            cargarProductos(data.verduras.verduras_frescas, "verduras-frescas");
            cargarProductos(data.verduras.tuberculos_hortalizas, "tuberculos-hortalizas");
        })
        .catch(error => console.error("Error cargando productos:", error));
});

function cargarProductos(listaProductos, contenedorId) {
    let contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de cargar nuevos productos
    listaProductos.forEach(producto => {
        let productoHTML = `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="descripcion">${producto.descripcion}</p>
                <p><span class="precio">Precio:</span> <span class="precio">${formatearPrecio(producto.precio_kg)}/kg</span> | <span class="precio">${formatearPrecio(producto.precio_lb)}/lb</span></p>

                <label for="unidad-${producto.nombre}">Comprar por:</label>
                <select id="unidad-${producto.nombre}">
                    <option value="kg">Kilo</option>
                    <option value="lb">Libra</option>
                </select>

                <label for="cantidad-${producto.nombre}">Cantidad:</label>
                <input type="number" id="cantidad-${producto.nombre}" value="1" min="1">

                <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio_kg}, ${producto.precio_lb}, this)">Añadir al carrito</button>
            </div>
        `;
        contenedor.innerHTML += productoHTML;
    });
}

function agregarAlCarrito(nombre, precio_kg, precio_lb, button) {
    const cantidad = parseInt(document.getElementById(`cantidad-${nombre}`).value);
    const unidad = document.getElementById(`unidad-${nombre}`).value;

    // Convertir la cantidad a libras
    const cantidadEnLibras = unidad === "kg" ? cantidad * 2 : cantidad; // 1 kg = 2 lb
    const precioPorLibra = precio_lb; // Siempre usar el precio por libra

    // Verificar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        // Si el producto ya existe, sumar la cantidad en libras
        productoExistente.cantidad += cantidadEnLibras;
    } else {
        // Si no existe, agregar un nuevo producto al carrito
        carrito.push({ nombre, precio: precioPorLibra, unidad: "lb", cantidad: cantidadEnLibras });
    }

    // Actualizar el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Mostrar el mensaje de confirmación
    const mensaje = document.getElementById("mensaje");
    mensaje.innerText = `${nombre} ha sido añadido al carrito.`;
    mensaje.style.display = "block"; // Mostrar el mensaje
    setTimeout(() => {
        mensaje.style.display = "none"; // Ocultar el mensaje después de 3 segundos
    }, 3000); // 3000 ms para 3 segundos
}
