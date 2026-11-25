// CONFIGURACIÓN DE LAS REGLAS DEL NEGOCIO

// Mi número de la lista.
const N = 22;

// Precio mínimo para aplicar el descuento.
const PRECIO_MINIMO_DESCUENTO = 100000;

// FUNCIÓN 1: VALIDAR LOS DATOS DE ENTRADA

function validarEntrada(precio, numeroLista) {

    // Comprobar que el precio sea un número válido.
    if (typeof precio !== "number" || !Number.isFinite(precio)) {
        throw new Error("El precio debe ser un número válido.");
    }

    // El precio debe ser mayor que cero.
    if (precio <= 0) {
        throw new Error("El precio debe ser mayor que cero.");
    }

    // Comprobar que el número de lista sea un entero positivo.
    if (!Number.isInteger(numeroLista) || numeroLista <= 0) {
        throw new Error("El número de lista debe ser un entero positivo.");
    }

    // Si todas las condiciones se cumplen, los datos son válidos.
    return true;
}

// FUNCIÓN 2: CALCULAR EL VALOR DE LA SUSCRIPCIÓN

function calcularSuscripcion(precio, numeroLista = N) {

    // Primero validamos los datos recibidos.
    validarEntrada(precio, numeroLista);

    // Calcular el porcentaje del equipo tasaEquipo=(N\bmod 5)+5 -> tasaEquipo=(22\bmod 5)+5 -> tasaEquipo=2+5 = 7 %.
    const tasaEquipo = (numeroLista % 5) + 5;

    // Inicializar el descuento en cero.
    let descuento = 0;

    // Aplicar el descuento únicamente si el precio es mayor a $100.000.
    if (precio > PRECIO_MINIMO_DESCUENTO) {
        descuento = precio * (tasaEquipo / 100);
    }

    // Calcular el valor final que debe pagar el cliente.
    const totalPagar = precio - descuento;

    // Devolver los resultados del cálculo.
    return {
        precioOriginal: precio,
        tasaEquipo: tasaEquipo,
        descuento: Math.round(descuento * 100) / 100,
        totalPagar: Math.round(totalPagar * 100) / 100
    };
}

// EXPORTAR LAS FUNCIONES
module.exports = {
    validarEntrada,
    calcularSuscripcion
};