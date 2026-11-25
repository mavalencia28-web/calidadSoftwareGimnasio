const {
    validarEntrada,
    calcularSuscripcion
} = require("../src/calculadora");

// PRUEBAS UNITARIAS DE LA CALCULADORA

describe("Pruebas del módulo de suscripciones del gimnasio", () => {
    // CASOS NORMALES

    test("1. Debe calcular correctamente el plan básico sin descuento", () => {
        // ARRANGE: preparar los datos.
        const precio = 80000;
        // ACT: ejecutar la función.
        const resultado = calcularSuscripcion(precio);
        // ASSERT: comprobar el resultado.
        expect(resultado.precioOriginal).toBe(80000);
        expect(resultado.tasaEquipo).toBe(7);
        expect(resultado.descuento).toBe(0);
        expect(resultado.totalPagar).toBe(80000);

    });

    test("2. Debe aplicar exactamente el 7% de descuento al plan premium", () => {
        // ARRANGE
        const precio = 120000;
        const descuentoEsperado = 8400;
        const totalEsperado = 111600;
        // ACT
        const resultado = calcularSuscripcion(precio);
        // ASSERT
        expect(resultado.tasaEquipo).toBe(7);
        expect(resultado.descuento).toBe(descuentoEsperado);
        expect(resultado.totalPagar).toBe(totalEsperado);
    });

    test("3. Debe aplicar exactamente el 7% de descuento al plan VIP", () => {
        // ARRANGE
        const precio = 160000;
        const descuentoEsperado = 11200;
        const totalEsperado = 148800;
        // ACT
        const resultado = calcularSuscripcion(precio);
        // ASSERT
        expect(resultado.tasaEquipo).toBe(7);
        expect(resultado.descuento).toBe(descuentoEsperado);
        expect(resultado.totalPagar).toBe(totalEsperado);
    });

    // CASOS BORDE (EDGE CASES)

    test("4. No debe aplicar descuento cuando el precio es exactamente $100.000", () => {
        // ARRANGE
        const precio = 100000;
        // ACT
        const resultado = calcularSuscripcion(precio);
        // ASSERT
        expect(resultado.descuento).toBe(0);
        expect(resultado.totalPagar).toBe(100000);
    });

    test("5. Debe rechazar un precio igual a cero", () => {
        // ARRANGE
        const precio = 0;
        // ACT Y ASSERT
        expect(() => calcularSuscripcion(precio))
            .toThrow("El precio debe ser mayor que cero.");
    });

    test("6. Debe rechazar un precio negativo", () => {
        // ARRANGE
        const precio = -50000;
        // ACT Y ASSERT
        expect(() => calcularSuscripcion(precio))
            .toThrow("El precio debe ser mayor que cero.");
    });

    test("7. Debe rechazar un precio recibido como texto", () => {
        // ARRANGE
        const precio = "120000";
        // ACT Y ASSERT
        expect(() => calcularSuscripcion(precio))
            .toThrow("El precio debe ser un número válido.");
    });
    
    test("8. Debe aceptar datos de entrada válidos", () => {
        // ARRANGE
        const precio = 120000;
        const numeroLista = 22;
        // ACT
        const resultado = validarEntrada(precio, numeroLista);
        // ASSERT
        expect(resultado).toBe(true);
    });
    
    test("9. Debe rechazar un número de lista inválido", () => {
        // ARRANGE
        const precio = 120000;
        const numeroLista = 0;
        // ACT Y ASSERT
        expect(() => validarEntrada(precio, numeroLista))
            .toThrow("El número de lista debe ser un entero positivo.");
    });
});