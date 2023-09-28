class Book {
    constructor(title, author, chapter) {
        this.title = title;
        this.author = author;
        this.chapter = chapter;
    }
}

class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }
    

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td style="color: blueviolet;">${book.title}</td>
            <td style="color: blueviolet;">${book.author}</td>
            <td style="color: blueviolet;">${book.chapter}</td>
            <td><a href="#" class="Bin delete">X</a></td>
        `;
        list.appendChild(row);
    }
    
    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#chapter').value = '';
    }
}

class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books =[];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(chapter) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.chapter === chapter) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const chapter = document.querySelector('#chapter').value;

    if(title === '' || author === '' || chapter === '') {
        UI.showAlert('Fill The Blank Brackets', 'removed')
    } else{
        const book = new Book(title, author, chapter);
    
        UI.addBookToList(book);
        UI.clearFields();
        Store.addBook(book);
        UI.showAlert('Manhwa Added', 'added')
    }
});

document.querySelector('#book-list').addEventListener('click', (e) => { console.log(e.target);
    
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Manhwa Removed', 'removed');
});


