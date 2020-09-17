//Variables
let books = document.querySelectorAll(".book");
let library = [];

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
  newBook.setAttribute("id", `book${library.length}`);
  newBook.classList.add("book");
  newBook.innerHTML = 
    `<div class="book__inner">
      <div class="book__front">
        <h2 class="heading3">${book.title}</h2>
      </div>

      <div class="book__back">
        <button type="button" class="btn btn--delete" data-index="book${library.length}"><i class="fas fa-times"></i></button>
        <h2 class="book__title">${book.title}</h2>
        <h3 class="book__author">${book.author}</h3>
        <span class="book__page">${book.pages}</span>
        <button type="button" class="btn btn--text--small btn--text book__status" data-index="book${library.length}">${book.status}</button>
        <span class="book__rating">${book.rating}⭑</span>
        <button type="button" class="btn btn--text--small btn--text book__more">More</button>
      </div>
    </div>

    <h2>${book.title}</h2>`;
  
  newBook.querySelector(".btn--delete").addEventListener("click", deleteBook);  
  newBook.querySelector(".book__status").addEventListener("click", changeStatus);
  document.querySelector("main").append(newBook);

  //Update books variable
  books = document.querySelectorAll(".book");
}

//Function looping through the library array to display each book on the page.
function displayBook(library) {
  for (let i = 0 ; i < library.length ; i++) {

    //If the user deleted the book, does nothing.
    if (library[i] == null) {
      break;
    }

    addBook(library[i]);
  }
}

//Create a new book object from the user's input
function createBook(e) {
  e.preventDefault();

  let book = new Book (
    document.querySelector("#title").value || "Title",
    document.querySelector("#author").value || "Author",
    document.querySelector("#pages").value || "0",
    document.querySelector("#status") ? document.querySelector("#status").value : "read",
    document.querySelector('input[name="rating"]:checked') ? document.querySelector('input[name="rating"]:checked').value : "0"
  );
    library.push(book);
}

const submit = document.querySelector(".add__submit");
submit.addEventListener("click", createBook);
submit.addEventListener("click", () => addBook(library[library.length - 1]));

//Delete a book
function deleteBook(event) {
  library[event.target.closest("button").dataset.index] = null;
  document.querySelector(`#${event.target.closest("button").dataset.index}`).remove();
}

//Change a book status
function changeStatus(event) {

  let book = document.querySelector(`#${event.target.dataset.index}`);
  let bookStatus = book.dataset.status;
  console.log(bookStatus);

  if (bookStatus == "read") {
    book.setAttribute("data-status", "unread");
  } else {
    book.setAttribute("data-status", "read");
  }
  
  bookStatus = book.dataset.status;
  event.target.innerHTML = bookStatus;
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

//Enables toggling buttons

const toggleBtn = document.querySelectorAll(".btn--toggle");

function toggle(event) {
  document.querySelector(`#${event.target.closest("button").dataset.toggle}`).classList.toggle("hidden");
}

toggleBtn.forEach( btn => btn.addEventListener("click", toggle));

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

document.querySelector("#filter_all").addEventListener("click", displayAll);
document.querySelector("#filter_read").addEventListener("click", () => filterStatus("read"));
document.querySelector("#filter_unread").addEventListener("click", () => filterStatus("unread"));
document.querySelector("#filter_favorites").addEventListener("click", filterFavorite);

/*Sort books:
  - Remove them from the document
  - Sort the library array
  - Put the books back in the right order */

function sortBooks(event) {
  books.forEach( book => book.remove());
  sort(library, event.target.value);
  displayBook(library);
}

function sort(arr, by) {
  return arr.sort( (a, b) => String(a[by]).localeCompare(String(b[by])) );
}

document.querySelectorAll(".sort__box label").forEach( label => label.addEventListener("click", sortBooks));

//Puts an example book

let welcomeBook = new Book(
  "Welcome to your Library",
  "Author",
  "1",
  "read",
  "5");

library.push(welcomeBook);
addBook(welcomeBook);