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
    .then(res => employees = res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))
 
//Functions
//Display employee function
function displayEmployees(employeeData) {
    let employeeHTML = '';

    //loop through each employee and create HTML Markup
    employeeData.forEach((employee, index) => {
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
    let birthDate = new Date(dob.date);

    // Date formating
    month = birthDate.getMonth() + 1;
    date = birthDate.getDate();
    if (month < 10) {
        month = '0' + 1;
    }
    if (date < 10) {
        date = '0'+ 1;
    }

    const modalHTML = `
    <img class="avatar" src="${picture.large}" alt="avatar">
    <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr>
        <p>${phone}</p>
        <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
        <p>Birthday: ${month}/${date}/${birthDate.getFullYear()}</p>
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

//Event listeners
// modal 
let currentModal = ''
gridContainer.addEventListener('click', e => {
    if(e.target !== gridContainer) {
        const card = e.target.closest('.card');
        let index = card.getAttribute('data-index');
        console.log(index)
        displayModal(index);
        return currentModal = index;
    } 

});
// modal closer
modalClose.addEventListener('click', e => overlay.classList.add('hidden'));
//modal previous
modalPrevious.addEventListener('click', e => {
    if (currentModal > 0) {
        currentModal--;
        modalPrevious.disable = false;
    }
    if (currentModal === 0) {
        modalPrevious.disable = true;
    }
    displayModal(currentModal);
    console.log(currentModal);
});
//modal next
modalNext.addEventListener('click', e => {
    if (currentModal <= employees.length) {
        currentModal++;
        modalNext.disable = false;
    }
    if (currentModal === employees.length - 1) {
        modalNext.disable = true;
    }
    displayModal(currentModal);
    console.log(currentModal);
});

//searchbar filter
searchBar.addEventListener('keyup', e => {
    searchInput = e.target.value.toLowerCase();
    console.log(searchInput)
    search(employees);
});
//searchbar button
searchButton.addEventListener('click', e => e.target = search(employees))

