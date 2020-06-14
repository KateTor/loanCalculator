// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    //hide results
    document.getElementById('results').style.display = 'none';

    //show loader when clicked
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//calculate results
function calculateResults(e) {
    //UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    //validation calculations
    if (isFinite(monthly)) {
        // if number is finite then assign value to monthly,fixed assigned # of decimals shown
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        // show results & hide spinner
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else {
        //display an error
        showError('Please check your numbers');
    };
}

//show error
function showError(error) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';


    //create div
    const errorDiv = document.createElement('div');

    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //add class
    errorDiv.className = 'alert alert-danger';
    // add text by creating text node and appending to div
    errorDiv.appendChild(document.createTextNode(error));
    // insert error above heading
    card.insertBefore(errorDiv, heading);
    //clear error
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}