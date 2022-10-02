// Listen for Submit event
document.querySelector('#loan-form').addEventListener('submit', function (e) {
    // Hide Result
    document.getElementById('results').style.display = 'none';
    // Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();

});

// Calculate Results
function calculateResults() {

    console.info('Calculating...');

    // UI Input Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    // UI Output Variables
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        console.info('Generating result');
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        // Show Results
        document.getElementById('results').style.display = 'block';
        // Hide Loader
        document.getElementById('loading').style.display = 'none';


    } else {
        showError('Please check your numbers');

        console.info('Error occur in the input');
    }
}

// Show Error
function showError(error) {
    // Hide Loader
    document.getElementById('loading').style.display = 'none';

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Create a div
    const errorDiv = document.createElement('div');

    // Add Class name
    errorDiv.className = 'alert alert-danger';

    // Create Text Node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error before Element
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);

}

// Clear Error
function clearError() { document.querySelector('.alert').remove(); }

