// Función para mostrar los productos en el carrito

// Función para mostrar el modal de mensaje personalizado
function mostrarModal(mensaje) {
    const modal = document.getElementById("modal-mensaje");
    const mensajeTexto = document.getElementById("mensaje-texto");
    mensajeTexto.innerText = mensaje;
    modal.style.display = "flex"; // Mostrar el modal usando flex para centrado
}

// Función para ocultar el modal de mensaje personalizado
function ocultarModal() {
    const modal = document.getElementById("modal-mensaje");
    modal.style.display = "none"; // Ocultar el modal
    
    // Limpiar el carrito (llamando a la función global de carrito.js)
    if (typeof limpiarCarrito !== 'undefined') {
         limpiarCarrito(); // Llamar a la función limpiarCarrito global
    }

    // Limpiar campos del formulario
    document.getElementById("nombre").value = '';
    document.getElementById("direccion").value = '';
    document.getElementById("telefono").value = '';

    window.location.href = 'index.html'; // Redirigir a la página de inicio después de cerrar el modal
}

// Añadir event listener al botón de cerrar modal
document.addEventListener("DOMContentLoaded", function() {
    const cerrarModalButton = document.getElementById("cerrar-modal");
    if (cerrarModalButton) {
        cerrarModalButton.addEventListener("click", ocultarModal);
    }

    // También evitar el envío por defecto del formulario y manejarlo con JS
    const formPago = document.getElementById("formPago");
    if (formPago) {
        formPago.addEventListener("submit", function(event) {
            event.preventDefault(); // Evitar el envío por defecto
            if (validarFormularioManual()) { // Usar una nueva función de validación sin alerts
                const nombre = document.getElementById("nombre").value;
                mostrarModal(`Hola ${nombre}, tus productos serán enviados en breve. Gracias por comprar en El Huerto Real.`);
                // La limpieza del carrito ahora se hace en ocultarModal
            }
        });
    }
});

// Función de validación sin alerts para ser usada con el event listener
function validarFormularioManual() {
    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;

    // Validar que el nombre tenga al menos dos palabras
    const nombreValido = nombre.trim().split(" ").length >= 2;

    // Validar que el teléfono tenga exactamente 10 dígitos
    const telefonoValido = /^\d{10}$/.test(telefono);

    if (!nombreValido) {
        alert("Por favor, ingrese al menos un nombre y un apellido."); // Mantener alerts para validación por simplicidad
        return false;
    }

    if (!telefonoValido) {
        alert("Por favor, ingrese un número de teléfono válido (10 dígitos)."); // Mantener alerts para validación por simplicidad
        return false;
    }

    return true;
}
