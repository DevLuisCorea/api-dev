//@ development luisCorea
//@ date  2025-01 
const express = require('express');
const app = express();
const PORT = 3000;

// Función para calcular el salario neto
function calcularSalarioNeto(salarioBruto) {
    const tasaINSS = 0.07; // 7% de INSS laboral
    const tramosIR = [
        { min: 0, max: 100000, tasa: 0, fijo: 0 },
        { min: 100000.01, max: 200000, tasa: 0.15, fijo: 0 },
        { min: 200000.01, max: 350000, tasa: 0.20, fijo: 15000 },
        { min: 350000.01, max: 500000, tasa: 0.25, fijo: 45000 },
        { min: 500000.01, max: Infinity, tasa: 0.30, fijo: 82500 }
    ];

    // Cálculo del INSS Laboral
    let inssLaboral = salarioBruto * tasaINSS;
    // Cálculo del salario neto gravable
    let salarioNetoGravable = salarioBruto - inssLaboral;
    // Convertimos el salario gravable a base anual
    let salarioAnual = salarioNetoGravable * 12;
    // Cálculo del IR según la tabla
    let irAnual = 0;
    for (let tramo of tramosIR) {
        if (salarioAnual > tramo.min) {
            let exceso = Math.min(salarioAnual, tramo.max) - tramo.min;
            irAnual = (exceso * tramo.tasa) + tramo.fijo;
        }
    }
    // IR mensual
    let irMensual = irAnual / 12;
    // Cálculo del salario neto final
    let salarioNeto = salarioBruto - inssLaboral - irMensual;
    return {
        salarioBruto: salarioBruto.toFixed(2),
        inssLaboral: inssLaboral.toFixed(2),
        salarioNetoGravable: salarioNetoGravable.toFixed(2),
        irMensual: irMensual.toFixed(2),
        salarioNeto: salarioNeto.toFixed(2)
    };
}


// Ruta para calcular el salario neto con la moneda
app.get('/api/calcularsalario', (req, res) => {
    let salarioBruto = parseFloat(req.query.salario);
    let moneda = req.query.moneda;
    const tasaCambio = 36.6243;
    const developer = "Esta API Fue Desarollada por Ing. Luis Corea"
    // Validamos que el salario sea un número válido
    if (isNaN(salarioBruto) || salarioBruto <= 0) {
        return res.status(400).json({ error: "Debe proporcionar un salario válido en la query, ejemplo: ?salario=18000&moneda=USD" });
    }
    // Validamos que la moneda venga en la petición y sea válida
    if (!moneda || (moneda !== "USD" && moneda !== "NIO")) {
        return res.status(400).json({ error: "Debe proporcionar una moneda válida (USD o NIO), ejemplo: ?salario=18000&moneda=USD" });
    }
    // Si la moneda es USD, convertimos el salario a córdobas
    if (moneda === "USD") {
        salarioBruto *= tasaCambio; // Conversión a NIO
    }
    let resultado = calcularSalarioNeto(salarioBruto);
    // Agregamos la moneda al resultado
    resultado.moneda = moneda;
    resultado.tasaCambio = tasaCambio;
    resultado.developer = developer;
    res.json(resultado);
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});

module.exports = app;