/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  ('use strict');

  const select = {
    templateOf: {
      menuBook: '#template-book',
    },
    containerOf: {
      listBooks: '.books-list',
    },
  };
  const templates = {
    ListBook: Handlebars.compile(
      document.querySelector(select.templateOf.menuBook).innerHTML
    ),
  };

  function render() {
    const thisApp = this;
    thisApp.data = dataSource;

    for (const book of thisApp.data.books) {
      const generateHTML = templates.ListBook(book);
      const generateDOM = utils.createDOMFromHTML(generateHTML);
      const menuContainer = document.querySelector(
        select.containerOf.listBooks
      );
      menuContainer.appendChild(generateDOM);
    }
  }
}

render();
