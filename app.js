const form = document.querySelector('#add-to-do'); // selecting the form and creating a variable
const toDo = document.querySelector('#to-do'); // selecting the text input and creating a variable
const li = document.querySelectorAll('ul li'); // variable to select lis that are nested in ul
const ul = document.querySelector('ul'); // variable to select the first ul on the page
const toDoList = document.querySelector('#to-do-list'); // variable for the big picture To Do List
const saveBtn = document.querySelector('#saveToLocalStorage'); // variable for save button

let storedToDoList = JSON.parse(localStorage.getItem('toDoList')) || []; // retrieve toDoList from localStorage
window.addEventListener('DOMContentLoaded', function () { // when the DOM loads, run this function
    for (let list of storedToDoList) { // loop array of variable that contains the value of toDoList
        let createLi = document.createElement('li'); // variable to create an li
        createLi.textContent = list; // create an li with content of looped array content
        ul.appendChild(createLi) // add to ul
    }
})

form.addEventListener('submit', function (e) { // "when I click submit, do this"
    e.preventDefault(); // don't refresh the page when I click submit
    const newToDo = document.createElement('li'); // variable to create a new li
    newToDo.innerText = toDo.value + "."; // referring to toDo variable up top, creating a new li with text from value of the text input
    ul.appendChild(newToDo); // add newly created li to end of ul
    storedToDoList.push(newToDo.innerText); // push to array
    localStorage.setItem('toDoList', JSON.stringify(storedToDoList)); // save array to localStorage
    form.reset();
});

// an EventListener so we can add the .completed class to clicked lis
toDoList.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
    };
});

// an EventListener so we can remove with a double click
toDoList.addEventListener('dblclick', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.remove();
        // console.log(e.target.innerText);
        // console.log(storedToDoList);
        const todo = e.target.innerText;
        storedToDoList = storedToDoList.filter(function (storedTodo) {
            return storedTodo !== todo;
        });
        localStorage.setItem('toDoList', JSON.stringify(storedToDoList));
    };
});

