//Book constructor
function Book(title, author, pages, status, review, comment) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.review = review;
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
          <h3>${book.title}<h3>
          <h4>${book.author}<h4>
          <span>${book.pages}</span>
          <span>${book.status}</span>
          <span>${book.review}</span>
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
