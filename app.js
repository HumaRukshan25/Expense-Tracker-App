// JavaScript (app.js)
document.addEventListener("DOMContentLoaded", function () {
    // Check if there are existing expenses in local storage and display them
    displayExpenses();

    // Add an expense to local storage
    document.getElementById("addExpense").addEventListener("click", function () {
        const name = document.getElementById("expenseName").value;
        const amountInRupees = parseFloat(document.getElementById("expenseAmount").value);

        if (name && !isNaN(amountInRupees)) {
            const expense = { name, amount: amountInRupees };
            saveExpense(expense);
            displayExpenses();
        }
    });
});

function saveExpense(expense) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function displayExpenses() {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const expenseList = document.getElementById("expenseList");
    let total = 0;

    // Clear the current list
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        // Create a list item for each expense and apply Bootstrap styles
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = `
            ${expense.name} - ₹${expense.amount}
            <button class="btn btn-danger btn-sm" data-index="${index}">Delete</button>
        `;

        // Add a click event to delete expenses
        listItem.querySelector("button").addEventListener("click", function () {
            removeExpense(index);
        });

        expenseList.appendChild(listItem);
        total += expense.amount;
    });

    document.getElementById("totalAmount").textContent = `₹${total}`;
}

function removeExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}

