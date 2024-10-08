document.addEventListener('DOMContentLoaded', function() {
    const startTutorialBtn = document.getElementById('startTutorial');
    
    startTutorialBtn.addEventListener('click', function() {
        introJs().setOptions({
            steps: [
                {
                    element: document.querySelector('[data-step="1"]'),
                    intro: "Ingrese el monto total del préstamo que desea solicitar."
                },
                {
                    element: document.querySelector('[data-step="2"]'),
                    intro: "Este es el porcentaje de interés aplicable a su préstamo."
                },
                {
                    element: document.querySelector('[data-step="3"]'),
                    intro: "Seleccione el tipo de plazo para su préstamo."
                },
                {
                    element: document.querySelector('[data-step="4"]'),
                    intro: "Ingrese la duración del préstamo en semanas, quincenas o meses."
                },
                {
                    element: document.querySelector('[data-step="5"]'),
                    intro: "Aquí se mostrará su pago mensual calculado."
                },
                {
                    element: document.querySelector('[data-step="6"]'),
                    intro: "Este campo muestra el pago por cada período según su selección."
                },
                {
                    element: document.querySelector('[data-step="7"]'),
                    intro: "Haga clic aquí para calcular su préstamo basado en la información proporcionada."
                }
            ]
        }).start();
    });
});


const amount = document.getElementById('loanAmount');
const timeLimit = document.getElementById('loanTerm');   
//calcula el interés
function InterestRateC(divider) {
    const anualInterestRate = 0.15; 
    let interestRate = anualInterestRate / divider;
    return interestRate;
}

let rate = InterestRateC();

function calculateQuote(P, r, n) {
    const cuota = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return cuota;
}
console.log(calculateQuote(amount, rate, timeLimit));

const selectElement = document.getElementById('frequency');
console.log('Frecuencia:', selectElement.value);
selectElement.addEventListener('change', function() {
    const selectedValue = selectElement.value;
    console.log('Opción seleccionada:');
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

    const interestRate = InterestRateC(divider);
    console.log('Tasa de interés por periodo:', interestRate);
});    

