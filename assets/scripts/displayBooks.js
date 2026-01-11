
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
	bookEntry.append('p')
		.attr('class', 'short-blurb')
		.text(book.blurb);
});

setActiveBook(Books[BookId.ALPINE]);



function setActiveBook (activeBook) {
	d3.select('#title').text(activeBook.title)
	d3.select('#thumbnail').attr('src', activeBook.thumbnail)
	d3.select(`#type`).text(activeBook.type);
	d3.select(`#word-count`).text(activeBook.wordCount);
	d3.select(`#genres`).text(activeBook.genres.join(', '));
	d3.select('#blurb').text(activeBook.blurb);

	const chapters = d3.select('#chapters');
	chapters.html(null);

	let activeSection;
	let activeSectionName;
	let madeFirst = false;
	activeBook.chapters.forEach((chapter) => {
		if (chapter.section !== activeSectionName || !madeFirst) {
			activeSectionName = chapter.section;
			if (activeSectionName) {
				chapters.append('h3').text(activeSectionName);
			}
			activeSection = chapters.append('ul');
			madeFirst = true;
		}
		
		const title = chapter.title
			? `${chapter.id} - ${chapter.title}`
			: chapter.id;
		
		const link = activeSection.append('li').append('a')
			.attr('class', 'link-button')
			.attr('href', `./read.html?${QueryParams.BOOK}=${activeBook.id}&${QueryParams.CHAPTER}=${chapter.id}`);
		
		link.append('span').text(title);

		if (chapter.subtitle) {
			link.append('br')
			link.append('span')
				.attr('class', 'label')
				.text(chapter.subtitle);

		}
	});
}

