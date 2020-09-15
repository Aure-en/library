//Book constructor
function Book(title, author, pages, status, rating, comment) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.rating = rating;
  this.comment = comment;
}

//Library
let library = [];

//Create a DOM Element from the book.
function createBook(book) {
  let newBook = document.createElement("article");
  newBook.classList.add("book");
  newBook.innerHTML = 
    `<div class="book__content">
        <div class="book__front">
          <img>
        </div>

        <div class="book__back">
          <h3 class="book__title">${book.title}<h3>
          <h4 class="book__author">${book.author}<h4>
          <span class="book__pages">${book.pages}</span>
          <span class="book__status ${book.status}">${book.status}</span>
          <span class="book__rating">${book.rating}</span>
          <button type="button" class="btn">More</button>
        </div>
      </div>`;
  
  main.append(newBook);
}

//Function looping through the library array to display each book on the page.
function displayBook(library) {
  for (let i = 0 ; i < library.length ; i++) {
    createBook(library[i]);
  }
}

//Filter the library

//Create a new book object from the user's input

//Display the new book form

//Close the new book forms