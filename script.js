//Variables
let library = [];
let rating;

//Book constructor
function Book(title, author, pages, status, rating) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.rating = rating;
}

//Create a DOM Element from the book.
function addBook(book) {
  let newBook = document.createElement("article");
  newBook.classList.add("book");
  newBook.innerHTML = 
    `<div class="book__inner">
      <div class="book__front">
        <img>
      </div>

      <div class="book__back">
        <h2 class="book__title">${book.title}<h2>
        <h3 class="book__author">${book.author}<h3>
        <span class="book__pages">${book.pages}</span>
        <span class="book__status ${book.status}">${book.status}</span>
        <span class="book__rating">${book.rating}</span>
        <button type="button" class="btn book__more">More</button>
      </div>
    </div>
    <h2>${book.title}</h2>`;
  
  document.querySelector("main").append(newBook);
}

//Function looping through the library array to display each book on the page.
function displayBook(library) {
  for (let i = 0 ; i < library.length ; i++) {
    createBook(library[i]);
  }
}

//Filter the library

//Create a new book object from the user's input
function createBook(e) {
  e.preventDefault();
  let book = new Book (
    document.querySelector("#title").value,
    document.querySelector("#author").value,
    document.querySelector("#status").value,
    getRating()
  );
    library.push(book);
}

const submit = document.querySelector(".add__submit");
submit.addEventListener("click", createBook);
submit.addEventListener("click", () => console.log(library));
submit.addEventListener("click", () => addBook(library[0]));

//Get the rating of the book
function getRating() {
  let stars = document.querySelectorAll("[name='rating']");

  for (let i = 0; i < stars.length ; i++) {
    if (stars[i].checked) {
      rating = stars[i].getAttribute("id").slice(-1);
      break;
    }
  }
}

//Enables display buttons
const displayBtn = document.querySelectorAll(".btn--show");

function display(event) {
  document.querySelector(`#${event.target.closest("button").dataset.toggle}`).classList.remove("hidden");
}

displayBtn.forEach( btn => btn.addEventListener("click", display));

//Enables closing buttons
const closeBtn = document.querySelectorAll(".btn--close");

function close(event) {
  document.querySelector(`#${event.target.closest("button").dataset.toggle}`).classList.add("hidden");
}

closeBtn.forEach( btn => btn.addEventListener("click", close));