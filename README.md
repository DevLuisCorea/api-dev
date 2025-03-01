# api-dev
Testing and Development API´s


## API Calcular Salario Neto Nicaragua
##### development by Luis Corea
##### date  2025-02

Esta API fue desarrollada con el fin de hacer cálculos para que el cliente vea si es capaz sanamente de costear un crédito y calcular salario neto.

- Lenguaje JS
- Express JS
- Método GET

#### Endpoint
- http://localhost:3000/api/calcularsalario?salario=18000&moneda=NIO  (GET) DEV
- https://api-dev-beryl.vercel.app/api/calcularsalario?salario=18000&moneda=NIO  (GET) PROD
## Technologies ⚙️

API uses to work properly:

- Express JS - Development
- Vercel - Deployment
- JSON - Payload

Todo este desarollo queda alojado en un repositorio [GitHub](https://github.com/DevLuisCorea/api-dev).


### JSON - Payload Response Cálculo Salario Neto 
### Response 200 OK NIO ✅
/api/calcularsalario?salario=18000&moneda=NIO
{
  "salarioBruto": "18000.00",
  "inssLaboral": "1260.00",
  "salarioNetoGravable": "16740.00",
  "irMensual": "1264.67",
  "salarioNeto": "15475.33",
  "moneda": "NIO"
}
### Response 200 OK USD ✅
/api/calcularsalario?salario=500&moneda=USD
{
    "salarioBruto": "18000.00",
    "inssLaboral": "1260.00",
    "salarioNetoGravable": "16740.00",
    "irMensual": "1264.67",
    "salarioNeto": "15475.33",
    "moneda": "USD"
}

### Response 400 ERROR 🚩
{
    "error": "Debe proporcionar una moneda válida (USD o NIO), ejemplo: ?salario=18000&moneda=USD"
}

