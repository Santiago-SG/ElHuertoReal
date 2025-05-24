// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    if (!listaCarrito) {
        console.error(`Contenedor del carrito con ID "lista-carrito" no encontrado.`);
        return;
    }
    listaCarrito.innerHTML = ""; // Limpiar el contenido previo

    const subtotalElement = document.getElementById("subtotal");
    const envioElement = document.getElementById("envio");
    const totalElement = document.getElementById("total");
    const botonLimpiarContainer = document.getElementById("boton-limpiar-container");

    if (!subtotalElement || !envioElement || !totalElement || !botonLimpiarContainer) {
        console.error("Algunos elementos de resumen o botón de limpiar no se encontraron.");
    }

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>No hay productos en el carrito.</p>";
        if (subtotalElement) subtotalElement.innerHTML = formatearPrecio(0);
        if (envioElement) envioElement.innerHTML = formatearPrecio(10000); // Asegurar que el envío se muestre
        if (totalElement) totalElement.innerText = `$0.00`; // Establecer el total en cero
        if (botonLimpiarContainer) botonLimpiarContainer.style.display = "none"; // Ocultar el botón de limpiar
        return;
    }

    carrito.forEach((item, index) => {
        const productoHTML = `
            <div class="producto-carrito">
                <h3>${item.nombre}</h3>
                <p><span class="precio">Precio por libra:</span> <span class="precio">${formatearPrecio(item.precio)} (lb)</span></p>
                <label>Cantidad:</label>
                <input type="number" id="cantidad-${index}" value="${item.cantidad}" min="1" onchange="actualizarCantidad(${index})">
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>
        `;
        listaCarrito.innerHTML += productoHTML;
    });

    // Mostrar el total
    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const costoEnvio = 10000; // Costo de envío
    const total = subtotal + costoEnvio; // Total a pagar
    
    if (subtotalElement) subtotalElement.innerHTML = formatearPrecio(subtotal);
    if (envioElement) envioElement.innerHTML = formatearPrecio(costoEnvio);
    if (totalElement) totalElement.innerHTML = `<span class="total">${formatearPrecio(total)}</span>`;

    // Mostrar el botón de limpiar
    if (botonLimpiarContainer) botonLimpiarContainer.style.display = "block"; // Mostrar el botón de limpiar
}

// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidad(index) {
    const cantidadInput = document.getElementById(`cantidad-${index}`);
    carrito[index].cantidad = parseInt(cantidadInput.value);
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar localStorage
    mostrarCarrito(); // Actualizar la vista del carrito
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Eliminar el producto del carrito
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar localStorage
    mostrarCarrito(); // Actualizar la vista del carrito
}

// Función para limpiar el carrito
function limpiarCarrito() {
    carrito = []; // Vaciar el carrito
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar el almacenamiento local
    // La actualización visual del carrito ahora se maneja por separado en cada página si es necesario
}

// Llamar a mostrarCarrito al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    // Verificar si la página actual es carrito.html antes de llamar a mostrarCarrito
    if (window.location.pathname.endsWith('/carrito.html')) {
        mostrarCarrito();
    }
});
