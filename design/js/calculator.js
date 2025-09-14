window.addEventListener("load", (event) => {

    /*Add click event to percent buttons */
    const button5 = document.getElementById("5_percent");
    button5.classList.add("active");
    const percentButtons = document.querySelectorAll(".percent_button");

    function cleanActive() {
        const percentButtons = document.querySelectorAll(".percent_button");
        percentButtons.forEach(button => {
            button.classList.remove("active");
        });
    }

    percentButtons.forEach(button => {
        button.addEventListener("click", function (element) {
            const buttonActive = element.target;
            cleanActive();
            buttonActive.classList.add("active");
            document.querySelector(".custom").value = "";
            calculateTip();
        })
    });

    /*Add key event for Bill input*/
    const billInput = document.querySelector(".amount");
    billInput.addEventListener("input", (element) => {
        const billValue = parseFloat(element.target.value) || 0;
        if (billValue > 0) {
            document.getElementById("reset").classList.add("active");
            billInput.classList.remove("error");
            calculateTip();
        } else {
            document.getElementById("reset").classList.remove("active");
            billInput.classList.add("error");
        }
    });

    /*Add key event for People input*/
    const peopleInput = document.querySelector(".people");
    peopleInput.addEventListener("input", (element) => {
        const peopleValue = element.target.value;
        const messageError = document.getElementById("cant_be_zero");
        if (peopleValue > 0) {
            document.getElementById("reset").classList.add("active");
            peopleInput.classList.remove("error");
            messageError.style.display = "none";
            calculateTip();
        } else {
            document.getElementById("reset").classList.remove("active");
            peopleInput.classList.add("error");
            messageError.style.display = "flex";
        }
    });

    /* Custom Input Event */
    const customInput = document.querySelector(".custom");
    customInput.addEventListener("keyup", (element) => {
        cleanActive();
    });

    /* Reset button event listener */
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", function () {
        document.querySelector(".amount").value = "";
        document.querySelector(".people").value = "";
        document.querySelector(".custom").value = "";
        document.getElementById("tip_amount").textContent = "0.00";
        document.getElementById("total").textContent = "0.00";
    });

    /* Custom percent number input event */
    const customNumber = document.querySelector(".custom");
    customNumber.oninput = function () {
        const customInput = this.value;
        if (customInput === "") return;

        const customNum = parseFloat(customInput);
        if (isNaN(customNum)) {
            this.value = "";
            return;
        }

        if (customNum < 0) {
            this.value = "";
            alert("Value should be beetween 0 - 100");
        } else if (customNum > 100) {
            this.value = "";
            alert("Value should be between 0 - 100");
        }

        calculateTip();
    }
});

function calculateTip() {
    const billValue = document.querySelector(".amount").value;
    const peopleValue = document.querySelector(".people").value;

    if (billValue > 0 && peopleValue > 0) {
        /* Calculate for Tip Amount */
        const tipAmount = parseFloat(billValue) * getTipPercent();
        const tipAmountText = document.getElementById("tip_amount");
        const tipAmountTotal = tipAmount / parseFloat(peopleValue);
        tipAmountText.innerHTML = (Math.floor(tipAmountTotal * 100) / 100).toFixed(2);
        /* Calculate for Total */
        const totalAmount = (parseFloat(billValue) + tipAmount) / parseFloat(peopleValue);
        const totalAmountText = document.getElementById("total");
        totalAmountText.innerHTML = (Math.floor(totalAmount * 100) / 100).toFixed(2);
    }
}

function getTipPercent() {
    const customValue = document.querySelector(".custom").value;

    if (customValue && customValue > 0) {
        return parseFloat(customValue) / 100;
    } else {
        const selectTipPercent = document.querySelector(".percent_button.active");
        const selectTipPercentText = selectTipPercent.textContent;

        switch (selectTipPercentText) {
            case "5%":
                return 0.05;
            case "10%":
                return 0.1;
            case "15%":
                return 0.15;
            case "25%":
                return 0.25;
            case "50%":
                return 0.5;

            default:
                return null;
        }
    }

}
