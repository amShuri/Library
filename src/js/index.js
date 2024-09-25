const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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

function createBookCard() {
  const [title, author, pages, read] = getBook();

  const books = document.querySelector("#books");
  books.insertAdjacentHTML(
    "beforeend",
    `
    <div class="book-card">
      <h3>Title: ${title}</h3>
      <p>Author: ${author}</p>
      <p>Pages: ${pages}</p>
      <p>Status: ${read ? "Read" : "Not read yet"}</p>
    </div>
    `
  );
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  createBookCard();

  // Reset the form so the user doesn't have to manually empty the inputs.
  e.target.reset();
});
