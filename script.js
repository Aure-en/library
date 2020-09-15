//Variables
let books = document.querySelectorAll(".book");
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
  newBook.setAttribute("data-status", `${book.status}`);
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
        <span class="book__status">${book.status}</span>
        <span class="book__rating">${book.rating}</span>
        <button type="button" class="btn book__more">More</button>
      </div>
    </div>
    <h2>${book.title}</h2>`;
  
  document.querySelector("main").append(newBook);

  //Update books variable
  books = document.querySelectorAll(".book");
}

//Function looping through the library array to display each book on the page.
function displayBook(library) {
  for (let i = 0 ; i < library.length ; i++) {
    addBook(library[i]);
  }
}

//Create a new book object from the user's input
function createBook(e) {
  e.preventDefault();
  let book = new Book (
    document.querySelector("#title").value,
    document.querySelector("#author").value,
    document.querySelector("#pages").value,
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

/*Filters books displayed in the library:
  - Hide the books who do not have the correct status*/

function filterStatus(status) {

  for (let book of books) {
    if (book.dataset.status == status) {
      book.classList.remove("hidden");
    } else {
      book.classList.add("hidden");
    }
  }
}

function filterFavorite() {

  for (let book of books) {
    if (!book.classList.contains("favorite")) {
      book.classList.add("hidden");
    }
  }
}

function displayAll() {

  for (let book of books) {
    book.classList.remove("hidden");
  }
}

document.querySelector("#filter__all").addEventListener("click", displayAll);
document.querySelector("#filter__read").addEventListener("click", () => filterStatus("read"));
document.querySelector("#filter__unread").addEventListener("click", () => filterStatus("unread"));
document.querySelector("#filter__favorites").addEventListener("click", filterFavorite);

/*Sort books:
  - Remove them from the document
  - Sort the library array
  - Put the books back in the right order */

function sortBooks(event) {
  books.forEach( book => book.remove());
  sort(library, event.target.value);
  displayBook(library);
  console.log(library);
}

function sort(arr, by) {
  return arr.sort( (a, b) => String(a[by]).localeCompare(String([by])) );
}

document.querySelector(".sort").addEventListener("input", sortBooks);