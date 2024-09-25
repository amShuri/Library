const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.updateReadStatus = function () {
    this.read = this.read ? false : true;
  };
}

function getBook() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;
  return [title, author, pages, read];
}

function addBookToLibrary() {
  const [title, author, pages, read] = getBook();
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);

  // modal comes from `modal.js`
  modal.close();
}

function createBookCards() {
  const books = document.querySelector("#books");
  books.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const bookId = i;

    books.insertAdjacentHTML(
      "beforeend",
      `
       <div class="book-card" data-book-id="${bookId}">
         <h3>Title: ${book.title}</h3>
         <p>Author: ${book.author}</p>
         <p>Pages: ${book.pages}</p>
         <p class="status">Status: ${book.read ? "Read" : "Not read"}</p>
         <div class="actions">
          <button class="edit" id="edit">Update Status</button>
          <button class="delete">Delete</button>
         </div>
       </div>
       `
    );
  }
}

document.querySelector("#books").addEventListener("click", (e) => {
  const bookCard = e.target.closest(".book-card");
  if (!bookCard) return;

  const bookId = bookCard.dataset.bookId;
  if (e.target.classList.contains("delete")) {
    myLibrary.splice(bookId, 1);
  } else if (e.target.classList.contains("edit")) {
    const book = myLibrary[bookId];

    book.updateReadStatus();
    bookCard.querySelector(".status").textContent = `Status: ${
      book.read ? "Read" : "Not read"
    }`;
  }
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  createBookCards();

  // Reset the form so the user doesn't have to manually empty the inputs.
  e.target.reset();
});
