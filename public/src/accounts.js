function findAccountById(accounts, id) {
  return accounts.find(accounts => accounts.id === id);
}

function sortAccountsByLastName(accounts) {
 return accounts.sort((nameA, nameB) => nameA.name.last.toLowerCase() > nameB.name.last.toLowerCase() ? 1 : - 1);
}

function getTotalNumberOfBorrows(account, books) {
const accountId = account.id;
let totalBorrows = 0;

books.forEach(book => {
  const borrows = book.borrows;
  borrows.forEach(borrow => {
    if (borrow.id === accountId) {
      totalBorrows++;
    }
  });
});

return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
const accountId = account.id;
const checkedOutBooks = [];

books.forEach(book => {
  const borrows = book.borrows;
  const isBookCheckedOut = borrows.some(borrow => borrow.id === accountId && !borrow.returned);

  if (isBookCheckedOut) {
    const author = authors.find(author => author.id === book.authorId);
    const bookWithAuthor = { ...book, author };
    checkedOutBooks.push(bookWithAuthor);
  }
});

return checkedOutBooks;
}


module.exports = {
findAccountById,
sortAccountsByLastName,
getTotalNumberOfBorrows,
getBooksPossessedByAccount,
};