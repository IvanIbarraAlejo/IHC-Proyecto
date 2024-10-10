document.addEventListener('DOMContentLoaded', function() {
    const startTutorialBtn = document.getElementById('startTutorial');
    const selectElement = document.getElementById('frequency');
    const loanTermInput = document.getElementById('loanTerm');
    const loanAmountInput = document.getElementById('loanAmount');
    const loanForm = document.getElementById('loanForm');
    let rate = 0;

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

    function InterestRateC(divider) {
        const anualInterestRate = 0.15; 
        return anualInterestRate / divider;
    }

    function CalculateQuote(P, r, n) {
        const cuota = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return cuota;
    }

    function updateLoanTermLimits() {
        let minTerm, maxTerm;
        
        switch (selectElement.value) {
            case 'monthly':
                minTerm = 3;
                maxTerm = 16;
                break;
            case 'fortnightly':
                minTerm = 4;
                maxTerm = 40;
                break;
            case 'weekly':
                minTerm = 6;
                maxTerm = 52;
                break;
            default:
                minTerm = 1;
                maxTerm = 100;
        }
        
        loanTermInput.min = minTerm;
        loanTermInput.max = maxTerm;
        
        const currentValue = parseInt(loanTermInput.value, 10);
        if (isNaN(currentValue) || currentValue < minTerm || currentValue > maxTerm) {
            loanTermInput.value = minTerm;
        }
        
        const helpText = `Seleccione un plazo entre ${minTerm} y ${maxTerm} ${selectElement.options[selectElement.selectedIndex].text.toLowerCase()}.`;
        loanTermInput.title = helpText;
        
        validateLoanTerm();
    }

    function validateLoanTerm() {
        const currentValue = parseInt(loanTermInput.value, 10);
        const minTerm = parseInt(loanTermInput.min, 10);
        const maxTerm = parseInt(loanTermInput.max, 10);
        
        if (isNaN(currentValue) || currentValue < minTerm || currentValue > maxTerm) {
            loanTermInput.setCustomValidity(`Por favor, ingrese un valor entre ${minTerm} y ${maxTerm}.`);
        } else {
            loanTermInput.setCustomValidity('');
        }
    }

    function validateLoanAmount() {
        const amount = parseFloat(loanAmountInput.value);
        if (isNaN(amount) || amount < 2500 || amount > 50000) {
            loanAmountInput.setCustomValidity('Por favor, ingrese un monto entre $2,500 y $50,000.');
        } else {
            loanAmountInput.setCustomValidity('');
        }
    }

    selectElement.addEventListener('change', function() {
        const selectedValue = selectElement.value;
        let divider = 0;

        switch (selectedValue) {
            case 'monthly':
                divider = 12;
                break;
            case 'fortnightly':
                divider = 24;
                break;
            case 'weekly':
                divider = 52;
                break;
        }

        rate = InterestRateC(divider);
        console.log('Tasa de interés por periodo: ', rate);

        updateLoanTermLimits();
    });

    loanTermInput.addEventListener('input', validateLoanTerm);
    loanAmountInput.addEventListener('input', validateLoanAmount);

    loanForm.addEventListener('submit', function(event) {
        event.preventDefault();

        validateLoanTerm();
        validateLoanAmount();

        if (!loanForm.checkValidity()) {
            loanForm.reportValidity();
            return;
        }

        const amount = parseFloat(loanAmountInput.value);
        const timeLimit = parseInt(loanTermInput.value, 10);
        const frequency = selectElement.value;

        let periods;
        switch (frequency) {
            case 'monthly':
                periods = timeLimit;
                break;
            case 'fortnightly':
                periods = timeLimit * 2;
                break;
            case 'weekly':
                periods = timeLimit * 4;
                break;
        }

        const quote = CalculateQuote(amount, rate, periods);
        const totalPayment = quote * periods;

        document.getElementById('termAmount').value = quote.toFixed(2);
        document.getElementById('totalPayment').value = totalPayment.toFixed(2);

        console.log('Cuota:', quote);
        console.log('Pago total:', totalPayment);
    });

    rate = InterestRateC(12);
    updateLoanTermLimits();
    validateLoanAmount();
});