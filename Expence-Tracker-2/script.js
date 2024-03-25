const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');

document.addEventListener('DOMContentLoaded', function() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    renderExpenses(expenses);
});

expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (description && amount) {
        const expense = {
            id: Date.now(),
            description,
            amount
        };

        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        renderExpenses(expenses);

        expenseForm.reset();
    } else {
        alert('Please enter a description and amount.');
    }
});


function renderExpenses(expenses) {
    expenseList.innerHTML = expenses.map(expense => {
        return `<tr>
        <td>${expense.description} </td> 
        <td>$${expense.amount.toFixed(2)}</td> 
        <td>
            <button onclick="deleteExpense(${expense.id})">Delete</button>
            <button onclick="editExpense(${expense.id})">Edit</button>
        </td></tr>`;
    }).join('');
}


function editExpense(id) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expense = expenses.find(expense => expense.id === id);
    if (expense) {
        document.getElementById('description').value = expense.description;
        document.getElementById('amount').value = expense.amount;
        expenses.splice(expenses.indexOf(expense), 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses(expenses);
    }
}

function deleteExpense(id) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses(expenses);
}
