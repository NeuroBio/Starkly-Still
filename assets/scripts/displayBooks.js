
const bookList = d3.select('#books');

Object.values(Books).forEach((book) => {
	const bookEntry = bookList.append('article')
		.on('click', () => setActiveBook(book))
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

setActiveBook(Books[BookTitles.ALPINE]);



function setActiveBook (activeBook) {
	d3.select('#title').text(activeBook.title)
	d3.select('#thumbnail').attr('src', activeBook.thumbnail)
	d3.select(`#type`).text(activeBook.type);
	d3.select(`#word-count`).text(activeBook.wordCount);
	d3.select(`#genres`).text(activeBook.genres.join(', '));
	d3.select('#blurb').text(activeBook.blurb);
}

