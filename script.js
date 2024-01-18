let totalIncome = 0;
let totalExpense = 0;
let transactions = [];

function toggleFields(type) {
    const incomeFields = document.getElementById('incomeFields');
    const expenseFields = document.getElementById('expenseFields');

    if (type === 'income') {
        incomeFields.style.display = 'block';
        expenseFields.style.display = 'none';
    } else {
        incomeFields.style.display = 'none';
        expenseFields.style.display = 'block';
    }
}

function addTransaction(type) {
    const amountInput = (type === 'income') ? document.getElementById('incomeInput') : document.getElementById('expenseInput');
    const amount = parseFloat(amountInput.value);

    if (!isNaN(amount)) {
        let message = '';

        if (type === 'income') {
            totalIncome += amount;
            message = 'Great job! You earned some money.';
        } else {
            totalExpense += amount;
            message = 'Expense Logged';
            // Add explosion effects here if desired
        }

        transactions.push({ type, amount, date: new Date().toLocaleString() });
        updateSummary();
        saveToLocalStorage();

        // Show a dramatic message
        

        // Reset input field after adding transaction
        amountInput.value = '';

        // Retract the dropdown
        resetTransactionButtons();
    } else {
        
    }
}

function handleEnter(event, type) {
    if (event.key === 'Enter') {
        addTransaction(type);
    }
}

function resetTransactionButtons() {
    const transactionButtons = document.getElementById('transactionButtons');
    const incomeFields = document.getElementById('incomeFields');
    const expenseFields = document.getElementById('expenseFields');

    // Reset the buttons
    transactionButtons.innerHTML = '<button onclick="toggleFields(\'income\')">Add Income</button>' +
        '<button onclick="toggleFields(\'expense\')">Add Expense</button>';

    // Hide the income and expense fields
    incomeFields.style.display = 'none';
    expenseFields.style.display = 'none';
}

function updateSummary() {
    document.getElementById('totalIncome').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('totalExpense').textContent = `$${totalExpense.toFixed(2)}`;
    const balance = totalIncome - totalExpense;
    document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;
}

function saveToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

document.addEventListener("DOMContentLoaded", function() {
    fetch("https://type.fit/api/quotes")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const quotes = data;
            const currentDate = new Date();
            const randomIndex = currentDate.getDate() % quotes.length;
            const quoteContainer = document.getElementById("quote-container");
            const quoteText = document.getElementById("quote-text");

            quoteText.textContent = quotes[randomIndex].text;
            quoteContainer.style.display = "block";
        })
        .catch(error => console.error("Error fetching quotes:", error));
});

// Load data from local storage on page load
window.onload = function () {
    transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });
    updateSummary();
};

let goals = [];

// Load goals from localStorage on page load
window.onload = function () {
  const storedGoals = localStorage.getItem('goals');
  if (storedGoals) {
    goals = JSON.parse(storedGoals);
    displayGoals();
  }
};

function addGoal() {
  const goalInput = document.getElementById('goal');
  const targetInput = document.getElementById('target');

  const goal = goalInput.value;
  const target = parseFloat(targetInput.value);

  if (goal && !isNaN(target) && target > 0) {
    goals.push({ goal, target, progress: 0 });
    displayGoals();
    saveGoalsToLocalStorage();
    goalInput.value = '';
    targetInput.value = '';
  } else {
    alert('Please enter a valid goal and target amount.');
  }
}

function updateProgress(index, amount) {
  goals[index].progress = Math.min(amount, goals[index].target);
  displayGoals();
  saveGoalsToLocalStorage();

  // Check if the goal is met and mark it as completed
  if (goals[index].progress >= goals[index].target) {
    alert(`Congratulations! Goal "${goals[index].goal}" is completed!`);
    
    // Remove completed goal from the array
    goals.splice(index, 1);

    // Update display after removing the goal
    displayGoals();
  }
}

function displayGoals() {
  const goalList = document.getElementById('goalList');
  goalList.innerHTML = '';

  goals.forEach((goal, index) => {
    const li = document.createElement('li');
    
    let status = '';
    if (goal.progress >= goal.target) {
      status = ' (Completed)';
    }

    li.innerHTML = `
      <strong>${goal.goal}</strong> - Target: $${goal.target.toFixed(2)}${status}<br>
      <div class="progress-bar">
        <div class="progress" style="width: ${(goal.progress / goal.target) * 100}%"></div>
      </div>
      <button onclick="updateProgress(${index}, ${goal.progress + 10})">+ $10</button>
      <button onclick="updateProgress(${index}, ${goal.progress + 20})">+ $20</button>
      <button onclick="updateProgress(${index}, ${goal.progress + 50})">+ $50</button>
      <button onclick="updateProgress(${index}, ${goal.progress + 100})">+ $100</button>

    `;
    goalList.appendChild(li);
  });
}

function saveGoalsToLocalStorage() {
  localStorage.setItem('goals', JSON.stringify(goals));
}