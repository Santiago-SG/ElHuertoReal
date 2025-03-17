function validarFormulario() {
    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;

    // Validar que el nombre tenga al menos dos palabras
    const nombreValido = nombre.trim().split(" ").length >= 2;

    // Validar que el teléfono tenga exactamente 10 dígitos
    const telefonoValido = /^\d{10}$/.test(telefono);

    if (!nombreValido) {
        alert("Por favor, ingrese al menos un nombre y un apellido.");
        return false; // Evitar el envío del formulario
    }

    if (!telefonoValido) {
        alert("Por favor, ingrese un número de teléfono válido (10 dígitos).");
        return false; // Evitar el envío del formulario
    }

    // Si las validaciones son correctas, limpiar el carrito
    limpiarCarrito();

    // Mostrar mensaje con los datos ingresados
    alert(`Hola ${nombre}, tu despacho será enviado en breve. Gracias por comprar en El Huerto Real.`);

    return true; // Permitir el envío del formulario
}

// Función para limpiar el carrito
function limpiarCarrito() {
    carrito = []; // Vaciar el carrito
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar el almacenamiento local
}
