function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter(book => {
    const [firstTransaction] = book.borrows;
    return firstTransaction && !firstTransaction.returned;
  }).length;
}


function getMostCommonGenres(books) {
  
  const genreCount = books.reduce((acc, book) => {
    const { genre } = book;
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});

  
  const genres = Object.keys(genreCount).map(genre => ({
    name: genre,
    count: genreCount[genre]
  }));

 
  genres.sort((a, b) => b.count - a.count);

 
  return genres.slice(0, 5);
}


function getMostPopularBooks(books) {
  const bookBorrows = [];

  for (let i in books) {
    const book = books[i];
    const bookObj = {
      name: book.title,
      count: book.borrows.length
    };
    bookBorrows.push(bookObj);
  }

  bookBorrows.sort((a, b) => b.count - a.count);

  return bookBorrows.slice(0, 5);
}


function getMostPopularAuthors(books, authors) {
  const authorBorrowCounts = {};

  books.forEach(book => {
    const author = authors.find(author => author.id === book.authorId);

    if (author) {
      const authorName = `${author.name.first} ${author.name.last}`;

      if (authorBorrowCounts[authorName]) {
        authorBorrowCounts[authorName] += book.borrows.length;
      } else {
        authorBorrowCounts[authorName] = book.borrows.length;
      }
    }
  });

  const popularAuthors = Object.keys(authorBorrowCounts).map(authorName => ({
    name: authorName,
    count: authorBorrowCounts[authorName]
  }));

  popularAuthors.sort((a, b) => b.count - a.count);

  return popularAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
