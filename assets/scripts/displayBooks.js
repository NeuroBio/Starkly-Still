
const bookList = d3.select('#books');
const activeBook = Books[BookTitles.ALPINE];

Object.values(Books).forEach((book) => {
	const bookEntry = bookList.append('article')
		.attr('class', 'book');
	
	bookEntry.append('img')
		.attr('class', 'small-thumbnail')
		.attr('src', book.thumbnail)
	
	bookEntry.append('h2')
		.text(book.title);
	bookEntry.append('br')
	bookEntry.append('p')
		.attr('class', 'short-blurb')
		.text(book.blurb);
});


d3.select('#title').text(activeBook.title)

d3.select('#thumbnail').attr('src', activeBook.thumbnail)

d3.select('#blurb').text(activeBook.blurb);

