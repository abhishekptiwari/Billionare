const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

// Fetch random user and Add Money
async function getRandomUser() {
    const result = await fetch('https://randomuser.me/api');
    const data = await result.json();
    // console.log(data.results);
    const user = data.results[0];
    // Accessing data and creating random pseudo user's
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    }
    // console.log(newUser);
    addData(newUser);
}

// Adds object to data array.
function addData(obj) {
    data.push(obj);
    console.log(data);
    updateDOM();
}

// Updating the DOM (UI)
function updateDOM(providedData = data) {
    // Clear the main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach((person) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;
        main.appendChild(element);
    });
}

// This solution is compatible with every single major browser:
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Double everyOnes money
function ekDinMePaisaDouble() {
    data = data.map(user => {
        return {
            ...user,
            money: user.money * 2
        };
    });
    updateDOM();
}

// Sort users by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM(data);
}

// Filter only millionaires
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
  
    updateDOM();
  }

// Calculate the total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
      wealth
    )}</strong></h3>`;
    main.appendChild(wealthEl);
}

  
// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', ekDinMePaisaDouble);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);







/*
    // Number.prototype.toFixed
    const profits = 2489.8237;
    profits.toFixed(3) //returns 2489.824 (rounds up)
    profits.toFixed(2) //returns 2489.82
    profits.toFixed(7) //returns 2489.8237000 (pads the decimals)
*/