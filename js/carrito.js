let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Cargar carrito desde localStorage

function agregarAlCarrito(nombre, precio_kg, precio_lb) {
    let unidadSeleccionada = document.getElementById(`unidad-${nombre}`).value;
    let cantidad = parseFloat(document.getElementById(`cantidad-${nombre}`).value);
    let precio = unidadSeleccionada === "kg" ? precio_kg : precio_lb;

    // Si la cantidad es válida
    if (cantidad > 0) {
        let productoExistente = carrito.find(item => item.nombre === nombre && item.unidad === unidadSeleccionada);

        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            carrito.push({ nombre, precio, unidad: unidadSeleccionada, cantidad });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`${cantidad} ${unidadSeleccionada}(s) de ${nombre} añadido al carrito`);
    } else {
        alert("Por favor ingresa una cantidad válida.");
    }
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = ""; // Limpiar el contenido previo

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>No hay productos en el carrito.</p>";
        document.getElementById("total").innerText = `$0.00`; // Establecer el total en cero
        document.getElementById("boton-limpiar-container").style.display = "none"; // Ocultar el botón de limpiar
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
    
    document.getElementById("subtotal").innerHTML = formatearPrecio(subtotal);
    document.getElementById("envio").innerHTML = formatearPrecio(costoEnvio);
    document.getElementById("total").innerHTML = `<span class="total">${formatearPrecio(total)}</span>`;

    // Mostrar el botón de limpiar
    document.getElementById("boton-limpiar-container").style.display = "block"; // Mostrar el botón de limpiar
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
    mostrarCarrito(); // Volver a mostrar el carrito
}

// Llamar a mostrarCarrito al cargar la página
document.addEventListener("DOMContentLoaded", mostrarCarrito);
