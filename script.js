// STEP 1: Select the elements from the HTML (by their ids)
const form = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const list = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");


let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}


function render() {
  list.innerHTML = "";

  expenses.forEach(function (expense) {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = expense.description + " (" + expense.category + ") - RM " + expense.amount.toFixed(2);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function () {
      deleteExpense(expense.id);
    });

    li.appendChild(text);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
  
  const total = expenses.reduce(function (sum, expense) {
    return sum + expense.amount;
  }, 0);
  totalDisplay.textContent = total.toFixed(2);
}


form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const expense = {
    id: Date.now(), // unique number based on the current time
    description: descriptionInput.value.trim(),
    amount: parseFloat(amountInput.value),
    category: categoryInput.value,
  };

  expenses.push(expense);
  saveExpenses();
  render();
  form.reset(); 
});

function deleteExpense(id) {
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });
  saveExpenses();
  render();
}

render();