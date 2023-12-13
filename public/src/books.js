function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}


function partitionBooksByBorrowedStatus(books) {
  const checkedOutBooks = books.filter(book => !book.borrows[0].returned);
  const returnedBooks = books.filter(book => book.borrows[0].returned);

  return [checkedOutBooks, returnedBooks];
}


function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}
function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map(borrow => {
    const account = findAccountById(accounts, borrow.id);
    return { ...borrow, ...account };
  });

  return borrowers.slice(0, 10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};