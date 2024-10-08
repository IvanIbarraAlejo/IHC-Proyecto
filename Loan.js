document.addEventListener('DOMContentLoaded', function() {
    const startTutorialBtn = document.getElementById('startTutorial');
    
    startTutorialBtn.addEventListener('click', function() {
        introJs().setOptions({
            steps: [
                {
                    element: document.querySelector('[data-step="1"]'),
                    intro: "Aquí ingresa el monto total del préstamo que desea solicitar."
                },
                {
                    element: document.querySelector('[data-step="2"]'),
                    intro: "Este es el porcentaje de interés aplicable a su préstamo."
                },
                {
                    element: document.querySelector('[data-step="3"]'),
                    intro: "Seleccione el tipo de plazo de los pagos (semanal, quincenal o mensual)."
                },
                {
                    element: document.querySelector('[data-step="4"]'),
                    intro: "Ingrese la duración del préstamo según su elección anterior"
                },
                {
                    element: document.querySelector('[data-step="5"]'),
                    intro: "Aquí se mostrará el pago por cada período según su selección."
                },
                {
                    element: document.querySelector('[data-step="6"]'),
                    intro: "Aquí se mostrará el pago total dependiendo de los plazos y el monto inicial."
                },
                {
                    element: document.querySelector('[data-step="7"]'),
                    intro: "Haga clic aquí para calcular su préstamo basado en la información proporcionada."
                }
            ]
        }).start();
    });
});

//Busca en el DOM el tipo de plazo (semanal, quincenal o mensual)
const selectElement = document.getElementById('frequency');
let rate = 0;

/* Funciones que: 
InterestRateC: Calcula el interés por tipo de plazo y numero de pagos.
CalculateQuote: Calcula el pago por plazo individual.  */
function InterestRateC(divider) {
    const anualInterestRate = 0.15; 
    return anualInterestRate / divider;
}
function CalculateQuote(P, r, n) {
    const cuota = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return cuota;
}

/*Dependiendo el tipo de plazo es el valor por el que el interés anual se dividirá:
Si es mensual: 15% / 12
Si es quincenal: 15% / 24
Si es semanal: 15% / 52 
Llama a la función InterestRateC con el divisor para calcular el interés por tipo de plazo y número de pagos totales*/
selectElement.addEventListener('change', function() {
    const selectedValue = selectElement.value;
    let divider = 0;

    switch (selectedValue) {
        case 'monthly':
            divider = 12;  // 12 meses en un año
            break;
        case 'fortnightly':
            divider = 24;  // 24 quincenas en un año
            break;
        case 'weekly':
            divider = 52;  // 52 semanas en un año
            break;
    }

    rate = InterestRateC(divider);
    console.log('Tasa de interés por periodo: ', rate);
});

/*Al momento de presionar el botón calcular, se comprueba que los campos sean válidos antes
de prodecer a calcular el monto por plazo. Llama a la función CalculateQuote con los valores
de cantidad, porcentaje de interés y número de plazos respectivamente.

ES NECESARIO REVISAR ESTE CODIGO
*/
document.getElementById('calculateBtn').addEventListener('click', function() {
    const amountElement = document.getElementById('loanAmount');
    const timeLimitElement = document.getElementById('loanTerm');
    const amount = parseFloat(amountElement.value);
    const timeLimit = parseInt(timeLimitElement.value, 10);

    if (isNaN(amount) || isNaN(timeLimit) || isNaN(rate) || rate === 0) {
        console.log('Error: Por favor, complete todos los campos correctamente.');
        return;
    }

    const quote = CalculateQuote(amount, rate, timeLimit);
    console.log('Cuota:', quote);
});