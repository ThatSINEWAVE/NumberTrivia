const menu = document.getElementById('menu');
const option = document.getElementById('option');
const result = document.getElementById('result');
const optionDescription = document.getElementById('optionDescription');
const inputField = document.getElementById('inputField');
const fact = document.getElementById('fact');
const description = document.getElementById('description');

const descriptions = {
    trivia: 'Enter a number to learn an interesting trivia fact about it:',
    math: 'Enter a number to learn a mathematical fact about it:',
    date: 'Enter a date in MM/DD format to learn a fact about it:',
    year: 'Enter a year to learn a historical fact about it:'
};

let currentOption = '';

function showOption(optionType) {
    currentOption = optionType;
    description.classList.add('hidden');
    menu.classList.add('hidden');
    option.classList.remove('hidden');
    optionDescription.textContent = descriptions[optionType];
    inputField.value = '';
    inputField.focus();
}

function fetchFact() {
    const inputValue = inputField.value.trim();
    if (!inputValue) {
        alert('Please enter a value.');
        return;
    }

    let url = `http://numbersapi.com/${inputValue}`;
    if (currentOption !== 'trivia') {
        url += `/${currentOption}`;
    }

    fetch(url)
        .then(response => response.text())
        .then(data => {
            fact.textContent = data;
            option.classList.add('hidden');
            result.classList.remove('hidden');
        })
        .catch(error => {
            fact.textContent = 'Failed to fetch fact. Please try again.';
            option.classList.add('hidden');
            result.classList.remove('hidden');
        });
}

function goBack() {
    result.classList.add('hidden');
    menu.classList.remove('hidden');
    description.classList.remove('hidden');
}
