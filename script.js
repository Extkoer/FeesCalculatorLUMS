// script.js
function calculateAnnualFees() {
    let creditHours = parseFloat(document.getElementById('creditHours').value);
    let isSSE = document.getElementById('isSSE').checked;

    let perCreditHourFee = 37070;
    let registrationFeePerSemester = 48210;
    let sseFeePerSemester = isSSE ? 115620 : 0;

    let semesterFees = registrationFeePerSemester + sseFeePerSemester;
    let annualFees = Math.round((creditHours * perCreditHourFee) + semesterFees * 2);

    document.getElementById('annualFees').textContent = annualFees;
}

