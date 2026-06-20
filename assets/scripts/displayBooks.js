
const urlParams = new URLSearchParams(window.location.search);
const bookList = d3.select('#books');
const currentBookId = urlParams.get(QueryParams.BOOK) || SeriesList[SeriesTitle.ALPINE].books[0].id;
const currentBook = BookList[currentBookId];

let init = false;

 Object.values(SeriesList).forEach((series) => {
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

setActiveBook(currentBook, SeriesList[currentBook.series]);


function setActiveBook (activeBook, activeSeries) {
	const chapterWordCountRaw = activeBook.chapters.reduce((sum, chapter) => {
		sum += (chapter.wordCount || 0)
		return sum;
	}, 0);
	const chapterWordCount = `${Math.round(chapterWordCountRaw / 1000)}K`;

	d3.select('#title').text(activeBook.title)
	d3.select('#thumbnail').attr('src', activeBook.thumbnail)
	d3.select(`#type`).text(activeBook.type);
	d3.select(`#word-count`).text(activeBook.wordCount || chapterWordCount);
	d3.select(`#genres`).text(activeBook.genres.join(', '));
	d3.select('#blurb').text(activeBook.blurb);
	d3.select('#misc').text(activeBook.misc);
	d3.select('#first-published').text(activeBook.firstPublished);
	d3.select('#draft-completed').text(activeBook.completedFirstDraft);
	d3.select('#last-edited').text(activeBook.lastEdited);

	setNoContext(activeSeries);
	setOtherBooks(activeBook, activeSeries);
	setChapters(activeBook);
	setQueryParams(activeBook, activeSeries);
}

function setNoContext (activeSeries) {
	const noContext = d3.select('#no-context');
	if (activeSeries.hasNoContext) {
		noContext
			.attr('class', 'link-footer-button')
			.attr('href', `./no-context.html?${QueryParams.SERIES}=${activeSeries.title}`);
		return;
	}

	noContext
		.attr('class', 'hide-no-context')
		.attr('href', ``);
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
	let addedChapter = false;
	chapters.html(null);

	let activeSection;
	let activeSectionName;
	let madeFirst = false;
	const { chapterId: bookmark, pageId } = JSON.parse(localStorage.getItem(activeBook.id) || '{}');
	activeBook.chapters.forEach((chapter) => {
		addedChapter = true;
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
			title = `★ ${title}`;
		}
		
		const page = bookmark === chapter.id
			? pageId || 1
			: 1;
		const entry = activeSection.append('li')
			.attr('class', 'link-entry');
		const link = entry.append('a')
			.attr('class', 'link-button')
			.attr('href', `./${activeBook.id}.html?${QueryParams.CHAPTER}=${chapter.id}&${QueryParams.PAGE}=${page}`);
		
		const mainTitle = link.append('div').attr('class', 'main-title');
		mainTitle.append('span').text(title);
		if (chapter.wordCount) {
			mainTitle.append('span')
				.text(`${chapter.wordCount} words`)
				.attr('class', 'label');
		}

		if (chapter.subtitle) {
			link.append('span')
				.attr('class', 'label')
				.text(chapter.subtitle);

		}
	});

	if (!addedChapter) {
		chapters.append('p').text('Pending');
	}
}

function setQueryParams (activeBook, activeSeries) {

	if (!init) {
		init = true;
		return;
	}

	const url = new URL(window.location.href);
	url.searchParams.set(QueryParams.BOOK, activeBook.id);
	window.history.pushState(null, '', url);
}

