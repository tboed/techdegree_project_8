//global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const modalPrevious = document.getElementById('previous');
const modalNext = document.getElementById('next')
const searchBar = document.querySelector('#search')
const searchButton = document.querySelector('.header button')


//fetch data from API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))
 
//Functions
//Display employee function
function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = '';

    //loop through each employee and create HTML Markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" alt="avatar">
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
        `
    });
    gridContainer.innerHTML = employeeHTML;
}

//displays modal of clicked employee
function displayModal(index) {
    let {name, dob, phone, email, location:{ city, street, state, postcode }, picture } = employees[index];
    let date = new Date(dob.date);

    const modalHTML = `
    <img class="avatar" src="${picture.large}" alt="avatar">
    <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr>
        <p>${phone}</p>
        <p class="address">${street}, ${state} ${postcode}</p>
        <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;

    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;
};

//Search and filter function
function search() {
    const searchBar = document.querySelector('#search');
    const searchInput = searchBar.value.toLowerCase();
    let matches = [];
    for (let i = 0; i < employees.length; i++) {
        const employeeList = employees[i];
        const employeeName = (employees[i].name.first + employees[i].name.last).toLowerCase();
        if (employeeName.includes(searchInput)) {
            matches.push(employeeList)
        }
    }
    if (matches.length >= 1) {
        displayEmployees(matches);
        console.log(matches.length);
    } else {
        console.log(matches.length);
        const noMatch = '<h2>No results found, please try another name!</h2>'
        gridContainer.innerHTML = noMatch;
    }
}

//Next and previous functions
function nextEmployee() {
    console.log('next')
}

function previousEmployee() {
    console.log('previous')
}

//Event listeners

// modal opener
gridContainer.addEventListener('click', e => {
    if(e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        console.log(index)
        displayModal(index);
    }
});
// modal closer
modalClose.addEventListener('click', e => {
    overlay.classList.add('hidden');
});

//searchbar filter
searchBar.addEventListener('keyup', e => {
    searchInput = e.target.value.toLowerCase();
    console.log(searchInput)
    search(employees);
});
searchButton.addEventListener('click', e => {
    e.target = search(employees);
})

//modal previous
modalPrevious.addEventListener('click', e => {
    console.log(modalPrevious)
});

//modal next
modalNext.addEventListener('click', e => {
    console.log(modalNext)
});