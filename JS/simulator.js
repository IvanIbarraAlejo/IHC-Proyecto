document.addEventListener('DOMContentLoaded', function() {
    const loanForm = document.getElementById('loanForm');
    const loanSummary = document.getElementById('loanSummary');
    const paymentSchedule = document.getElementById('paymentSchedule');

    loanForm.addEventListener('submit', function(e) {
        e.preventDefault();
        simulateLoan();
    });

    function simulateLoan() {
        const loanAmount = parseFloat(document.getElementById('loanAmount').value);
        const annualInterestRate = parseFloat(document.getElementById('interestRate').value) / 100;
        const loanTermMonths = parseInt(document.getElementById('loanTerm').value);
        const paymentFrequency = document.getElementById('paymentFrequency').value;

        let numberOfPayments, periodicInterestRate;
        switch (paymentFrequency) {
            case 'monthly':
                numberOfPayments = loanTermMonths;
                periodicInterestRate = annualInterestRate / 12;
                break;
            case 'biweekly':
                numberOfPayments = loanTermMonths * 2;
                periodicInterestRate = annualInterestRate / 26;
                break;
            case 'weekly':
                numberOfPayments = loanTermMonths * 4;
                periodicInterestRate = annualInterestRate / 52;
                break;
        }

        const paymentAmount = calculatePayment(loanAmount, periodicInterestRate, numberOfPayments);
        const totalInterest = (paymentAmount * numberOfPayments) - loanAmount;

        displayLoanSummary(loanAmount, paymentAmount, totalInterest, numberOfPayments);
        displayPaymentSchedule(loanAmount, periodicInterestRate, numberOfPayments, paymentAmount, paymentFrequency);
    }

    function calculatePayment(principal, periodicInterestRate, numberOfPayments) {
        return (principal * periodicInterestRate * Math.pow(1 + periodicInterestRate, numberOfPayments)) / 
               (Math.pow(1 + periodicInterestRate, numberOfPayments) - 1);
    }

    function displayLoanSummary(loanAmount, paymentAmount, totalInterest, numberOfPayments) {
        loanSummary.innerHTML = `
            <p><strong>Monto del Préstamo:</strong> $${loanAmount.toFixed(2)}</p>
            <p><strong>Costo Total del Préstamo:</strong> $${(loanAmount + totalInterest).toFixed(2)}</p>
            <p><strong>Número de Pagos:</strong> ${numberOfPayments}</p>
            <p><strong>Pago por Período:</strong> $${paymentAmount.toFixed(2)}</p>
            <p><strong>Total de Intereses:</strong> $${totalInterest.toFixed(2)}</p>
        `;
    }

    function displayPaymentSchedule(loanAmount, periodicInterestRate, numberOfPayments, paymentAmount, paymentFrequency) {
        let balance = loanAmount;
        let paymentDate = new Date();
        let html = '';

        for (let i = 1; i <= numberOfPayments; i++) {
            const interest = balance * periodicInterestRate;
            const principal = paymentAmount - interest;
            balance -= principal;

            html += `
                <tr class="payment-row">
                    <td>${i}</td>
                    <td>${formatDate(paymentDate)}</td>
                    <td>$${paymentAmount.toFixed(2)}</td>
                    <td>$${principal.toFixed(2)}</td>
                    <td>$${interest.toFixed(2)}</td>
                    <td>$${Math.max(balance, 0).toFixed(2)}</td>
                </tr>
            `;

            switch (paymentFrequency) {
                case 'monthly':
                    paymentDate.setMonth(paymentDate.getMonth() + 1);
                    break;
                case 'biweekly':
                    paymentDate.setDate(paymentDate.getDate() + 14);
                    break;
                case 'weekly':
                    paymentDate.setDate(paymentDate.getDate() + 7);
                    break;
            }
        }

        paymentSchedule.innerHTML = html;
    }

    function formatDate(date) {
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }

    // Simular el préstamo inicialmente
    simulateLoan();
});