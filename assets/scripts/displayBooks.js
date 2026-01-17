
const bookList = d3.select('#books');

SeriesList.forEach((series) => {
	const book = series.books[0];
	const bookEntry = bookList.append('article')
		.on('click', () => setActiveBook(book, series))
		.attr('class', 'book');
	
	bookEntry.append('img')
		.attr('class', 'small-thumbnail')
		.attr('src', book.thumbnail)
	
	bookEntry.append('h2')
		.text(series.title);
	bookEntry.append('p')
		.attr('class', 'short-blurb')
		.text(book.blurb);
});

d3.select('#copyright').text(`© 2021 - ${new Date().getFullYear()} Stray. All Rights Reserved`);

setActiveBook(BookList[BookId.ALPINE], SeriesList[0]);


function setActiveBook (activeBook, activeSeries) {
	d3.select('#title').text(activeBook.title)
	d3.select('#thumbnail').attr('src', activeBook.thumbnail)
	d3.select(`#type`).text(activeBook.type);
	d3.select(`#word-count`).text(activeBook.wordCount);
	d3.select(`#genres`).text(activeBook.genres.join(', '));
	d3.select('#blurb').text(activeBook.blurb);
	d3.select('#misc').text(activeBook.misc);
	d3.select('#first-published').text(activeBook.firstPublished);
	d3.select('#draft-completed').text(activeBook.completedFirstDraft);
	d3.select('#last-edited').text(activeBook.lastEdited);

	setOtherBooks(activeBook, activeSeries);
	setChapters(activeBook);
}

function setOtherBooks(activeBook, activeSeries) {
	const otherBooksContainer = d3.select('#other-books').html('');
	if (activeSeries.books.length > 1) {
		otherBooksContainer.append('h3').text('Other Books');
		const otherBooks = otherBooksContainer.append('ul');

		otherBooks.attr('class', '');
		activeSeries.books.forEach((book) => {
			if (book.id === activeBook.id) {
				return;
			}
			otherBooks.append('li')
				.attr('class', 'link-entry link-button')
				.on('click', () => setActiveBook(book, activeSeries))
				.text(book.title);
		});
	} else {
		otherBooksContainer.attr('class', 'hide');
	}
}

function setChapters (activeBook) {
	const chapters = d3.select('#chapters');
	chapters.html(null);

	let activeSection;
	let activeSectionName;
	let madeFirst = false;
	const { chapterId: bookmark, pageId } = JSON.parse(localStorage.getItem(activeBook.id) || '{}');
	activeBook.chapters.forEach((chapter) => {
		if (chapter.section !== activeSectionName || !madeFirst) {
			activeSectionName = chapter.section;
			if (activeSectionName) {
				chapters.append('h3').text(activeSectionName);
			}
			activeSection = chapters.append('ul');
			madeFirst = true;
		}
		
		let title = chapter.title
			? `${chapter.id} - ${chapter.title}`
			: chapter.id;
	
		if (bookmark === chapter.id) {
			title = `(★) ${title}`;
		}
		
		const page = bookmark === chapter.id
			? pageId || 1
			: 1;
		const entry = activeSection.append('li')
			.attr('class', 'link-entry');
		const link = entry.append('a')
			.attr('class', 'link-button')
			.attr('href', `./read.html?${QueryParams.BOOK}=${activeBook.id}&${QueryParams.CHAPTER}=${chapter.id}&${QueryParams.PAGE}=${page}`);
		
		link.append('span').text(title);

		if (chapter.subtitle) {
			link.append('br')
			link.append('span')
				.attr('class', 'label')
				.text(chapter.subtitle);

		}
	});
}

