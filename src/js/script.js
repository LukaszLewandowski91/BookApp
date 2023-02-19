/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  ('use strict');

  const select = {
    templateOf: {
      menuBook: '#template-book',
    },
    containerOf: {
      listBooks: '.books-list',
      filters: '.filters',
      image: '.book__image',
    },
    book: {
      clicable: 'book__header',
    },
  };

  const templates = {
    ListBook: Handlebars.compile(
      document.querySelector(select.templateOf.menuBook).innerHTML
    ),
  };

  const classNames = {
    favoriteBook: 'favorite',
    filterBooks: 'hidden',
  };

  class BookList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.favoriteBooks = [];
      thisBooksList.filtersValue = [];
      thisBooksList.initData();
      thisBooksList.determineRatingBgc();
      thisBooksList.render();
      thisBooksList.getElements();
      thisBooksList.initActions();
    }

    initData() {
      this.data = dataSource.books;
    }
    render() {
      const thisBooksList = this;
      for (const book of dataSource.books) {
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        console.log(book);
        const generateHTML = templates.ListBook(book);
        const generateDOM = utils.createDOMFromHTML(generateHTML);
        const menuContainer = document.querySelector(
          select.containerOf.listBooks
        );
        menuContainer.appendChild(generateDOM);
      }
    }
    getElements() {
      const thisBooksList = this;

      thisBooksList.bookList = document.querySelector(
        select.containerOf.listBooks
      );
      thisBooksList.filtersOption = document.querySelector(
        select.containerOf.filters
      );
    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.bookList.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const clickedBook = event.target;
        if (clickedBook.offsetParent.classList.contains('book__image')) {
          const bookId = clickedBook.offsetParent.getAttribute('data-id');
          if (!thisBooksList.favoriteBooks.includes(bookId)) {
            clickedBook.offsetParent.classList.add(classNames.favoriteBook);
            thisBooksList.favoriteBooks.push(bookId);
          } else {
            clickedBook.offsetParent.classList.remove(classNames.favoriteBook);
            const Index = thisBooksList.favoriteBooks.indexOf(bookId);
            thisBooksList.favoriteBooks.splice(Index, 1);
          }
        }

        thisBooksList.filtersOption.addEventListener('click', function (event) {
          const clickedCheck = event.target;
          if (
            clickedCheck.getAttribute('name') == 'filter' &&
            clickedCheck.getAttribute('type') == 'checkbox'
          ) {
            console.log(clickedCheck.getAttribute('value'));
            if (clickedCheck.checked) {
              thisBooksList.filtersValue.push(
                clickedCheck.getAttribute('value')
              );
            } else {
              const index = thisBooksList.filtersValue.indexOf(
                clickedCheck.getAttribute('value')
              );
              thisBooksList.filtersValue.splice(index, 1);
            }
          }
          thisBooksList.filterBooks();
        });
      });
    }
    filterBooks() {
      const thisBooksList = this;
      for (let book of dataSource.books) {
        let shouldBeHidden = false;
        thisBooksList.bookImage = document.querySelector(
          select.containerOf.image + '[data-id="' + book.id + '"]'
        );
        for (let filter of thisBooksList.filtersValue) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          thisBooksList.bookImage.classList.add(classNames.filterBooks);
        } else {
          thisBooksList.bookImage.classList.remove(classNames.filterBooks);
        }
      }
    }
    determineRatingBgc(rating) {
      const thisBooksList = this;
      thisBooksList.ratingBgc = '';
      if (rating < 6) {
        thisBooksList.ratingBgc =
          'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        thisBooksList.ratingBgc =
          'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        thisBooksList.ratingBgc =
          'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        thisBooksList.ratingBgc =
          'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return thisBooksList.ratingBgc;
    }
  }

  new BookList();
}
