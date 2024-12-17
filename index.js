//BUTTONS
const calculateRepaymentsBtn = document.getElementById("calculate-repayments-btn")
const clearAllBtn = document.getElementById("clear-all-text")

    //RADIOBUTTONS
    const radioBtnRepayment = document.getElementById("repayment-radio");
    const radioBtnInterest = document.getElementById("interest-only-radio");

//INPUTS
const mortgageAmountInput=document.getElementById("mortgage-amount-input")
const mortgageTermInput=document.getElementById("mortgage-term-input")
const interestRateInput=document.getElementById("interest-rate-input")

//WARNINGS
const mortgageAmountWarning = document.getElementById("mortgage-amount-warning")
const mortgageTermWarning = document.getElementById("mortgage-term-warning")
const interestRateWarning = document.getElementById("interest-rate-warning")

//DIVS
const containerRight = document.getElementById("container-right")
const repaymentDiv = document.getElementById("repayment-div")
const interestDiv = document.getElementById("interest-div")

//FUNCTIONS

calculateRepaymentsBtn.addEventListener("click", checkInputs)

clearAllBtn.addEventListener("click", function(){
    mortgageAmountInput.value = ""
    mortgageTermInput.value=""
    interestRateInput.value=""
    emptyScreenRight()
})

function calculateMortgage(principal, annualInterestRate, years){
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = years * 12;
    
    //TOTAL CALCULATION
    const monthlyPayment = (principal * monthlyInterestRate) / 
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    const totalPayment = numberOfPayments * monthlyPayment
    
    //INTERST-ONLY CALCULATION
    const monthlyInterest = monthlyInterestRate * principal
    const totalInterest = (monthlyPayment * numberOfPayments) - principal;
 
    if (radioBtnRepayment.checked){
        radioBtnRepayment.classList.add("lime-color-background")
        console.log("radiobtn repayment checked!")
        containerRight.innerHTML = `
        <p class = "white-text">Your results</p>
        <p class="small-text slate-three-hundred-text">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>
        <div class ="results-container">
            <p class="small-text">Your monthly payments</p>
            <h1 id = "monthly-repayment-result-text" class = "lime-color-text">$${monthlyPayment.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
            <hr>
            <p class="small-text">Total you'll repay over the ${years}-year term</p>
            <p class="white-text">$${totalPayment.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
        `
    }
    else{
        containerRight.innerHTML = `
        <h3>Your results</h3>
        <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>
        <div class ="results-container">
            <p>Your monthly payments in interest only</p>
            <h1 id = "monthly-repayment-result-text" class = "lime-color-text">$${monthlyInterest.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
            <p>Total interest you'll repay over the ${years}-year term</p>
            <p class = "white-text">$${totalInterest.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
        `
    }
}

radioBtnRepayment.addEventListener("change", function () {
    if (radioBtnRepayment.checked) {
        repaymentDiv.classList.add("lime-color-background");
        interestDiv.classList.remove("lime-color-background"); 
    }
});

radioBtnInterest.addEventListener("change", function () {
    if (radioBtnInterest.checked) {
        interestDiv.classList.add("lime-color-background");
        repaymentDiv.classList.remove("lime-color-background"); 
    }
});

function emptyScreenRight(){
    containerRight.innerHTML = `
    <img src="./images/illustration-empty.svg"/>
    <h4>Results shown here</h4>
    <p class = "slate-three-hundred-text small-text">Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>`
}

function checkInputs(){
    if (mortgageAmountInput.value === ""){
        mortgageAmountWarning.style.display = "flex"
        
    }
    else {
        mortgageAmountWarning.style.display = "none"
    }
    
    if (mortgageTermInput.value === ""){
        mortgageTermWarning.style.display = "flex"
    }
    else {
        mortgageTermWarning.style.display = "none"
    }
    
    if (interestRateInput.value === ""){
        interestRateWarning.style.display = "flex"
    }
    else {
        interestRateWarning.style.display = "none"
    }
    if (mortgageAmountInput.value != "" && mortgageTermInput.value != "" && interestRateInput.value != ""){
           calculateMortgage(mortgageAmountInput.value, interestRateInput.value, mortgageTermInput.value)
    }
}