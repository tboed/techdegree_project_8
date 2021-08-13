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
    employees.forEach((employeeData, index) => {
        let name = employeeData.name;
        let email = employeeData.email;
        let city = employeeData.location.city;
        let picture = employeeData.picture;

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

//Event listeners
// modal 
let currentModal = ''
gridContainer.addEventListener('click', e => {
    const card = e.target.closest('.card');
    let index = card.getAttribute('data-index');
    if(e.target !== gridContainer) {
        console.log(index)
        displayModal(index);
    }
    currentModal = index;
    return currentModal;
});
// modal closer
modalClose.addEventListener('click', e => overlay.classList.add('hidden'));
//modal previous
modalPrevious.addEventListener('click', e => {
    displayModal(currentModal--)
    console.log(currentModal);
});
//modal next
modalNext.addEventListener('click', e => {
    displayModal(currentModal++)
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

