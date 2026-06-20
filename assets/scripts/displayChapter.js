const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get(QueryParams.BOOK);
const chapterId = +urlParams.get(QueryParams.CHAPTER);
const pageId = +urlParams.get(QueryParams.PAGE);
const WORD_PER_PAGE = 250;

const activeBook = BookList[bookId];
const activateChapter = activeBook.chapters[chapterId - 1];
const bookmarkButton = d3.select('#bookmark');
const bookmark = JSON.parse(localStorage.getItem(bookId) || '{}')
if (bookmark.chapterId === chapterId && bookmark.pageId === pageId) {
	bookmarkButton.classed('bookmarked', true);
}

buildHeader();
buildChapterLinks();
setBackParams();


function buildHeader() {
	d3.select(`#book-title`).text(activeBook.title);
	d3.select(`#chapter-section`).text(activateChapter.section
		? `${activateChapter.section}: `
		: '');
	const title = activateChapter.title
		? `${activateChapter.id} - ${activateChapter.title}`
		: activateChapter.id;
	d3.select(`#chapter-title`).text(title);

	if (activateChapter.subtitle) {
		d3.select('#optional-chapter-data').append('h3')
			.attr('class', 'label')
			.text(activateChapter.subtitle)
	}
}
function buildChapterLinks () {
	const priorChapter = d3.select('#prior-chapter');
	if (chapterId === 1) {
		priorChapter.classed('hide', true);
	} else {
		priorChapter.attr(`href`, buildReadLink({
			book: activeBook.id,
			chapter: chapterId - 1,
			page: 1,
		}));;
	}

	const nextChapter = d3.select('#next-chapter');
	if (+chapterId === activeBook.chapters.length) {
		nextChapter.remove();
	} else {
		nextChapter.attr(`href`, buildReadLink({
			book: activeBook.id,
			chapter: chapterId + 1,
			page: 1,
		}));
	}
}

function buildReadLink ({ book, chapter, page }) {
	return `./${book}.html?${
		QueryParams.CHAPTER}=${chapter}&${
		QueryParams.PAGE}=${page}`;
}

function buildPages (content) {
	const paragraphs = content
		.trim()
		.split(`\n\n`)
		.filter((p) => {
			p = p.replace(`\n`, '');
			return true;
		});
	const pages = [];
	let currentPage = [];
	paragraphs.forEach((p) => {
		if (/\s?---\s?/.test(p)) {
			p = '<hr>';
		}
		currentPage.push(p);
		const wordCount = currentPage.join('\n\n')
		.split(/\s+/).length;
		if (wordCount <= WORD_PER_PAGE) {
			return;
		}

		currentPage.pop();
		pages.push(currentPage);
		currentPage = [p];
	});

	pages.push(currentPage);
	return pages;
}

function addPageLinks (pageLength) {
	const nextPage = d3.select('#next-page');
	if (+pageId === pageLength) {
		nextPage.classed('hide', true);
	} else {
		nextPage.attr(`href`, buildReadLink({
			book: activeBook.id,
			chapter: chapterId,
			page: pageId + 1,
		}));
	}

	const priorPage = d3.select('#prior-page');
	if (+pageId === 1) {
		priorPage.classed('hide', true);
	} else {
		priorPage.attr(`href`, buildReadLink({
			book: activeBook.id,
			chapter: chapterId,
			page: pageId - 1,
		}));
	}

	d3.select('#page-number').text(pageId);
}

function scrollToTop () {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
}

function bookmarkPage () {
	const bookmark = JSON.parse(localStorage.getItem(bookId) || '{}');
	const chapterTitle = activateChapter.title
		? `${activateChapter.title} (${activateChapter.id})`
		: activateChapter.id;
	if (bookmark.chapterId === chapterId && bookmark.pageId === pageId) {
		localStorage.removeItem(bookId);
		bookmarkButton.classed('bookmarked', false);
		const actionText = `Removed bookmark for ${activeBook.title} at chapter: ${chapterTitle}, page ${pageId}.`;
		window.alert(actionText);
	} else {
		localStorage.setItem(bookId, JSON.stringify({ chapterId, pageId }));
		bookmarkButton.classed('bookmarked', true);
		const actionText = `Bookmarked ${activeBook.title} at chapter: ${chapterTitle}, page ${pageId}.`;
		window.alert(actionText);
	}
}

function setBackParams () {
	d3.select('#back').attr('href', `./landing.html?${QueryParams.BOOK}=${bookId}`);
}

let content;
Promise.resolve()
	.then(() => activateChapter.isImage
			? { text: () => (''), ok: true }
			: fetch(`../assets/chapters/${bookId}/${chapterId}.txt`))
	.then((response) => {
		if (!response.ok) {
			throw new Error(`Text not found.`);
		}
		return response.text();
	})
	.then((text) => content = text)
	.catch(error => {
		console.error('Error fetching file:', error);
		content = `Data not found`;
	}).finally(() => {
		const text = d3.select('#chapter-text');
		const pages = buildPages(content);
		pages[pageId - 1].forEach((paragraph) => text.append('p').html(paragraph));
		this.addPageLinks(pages.length);
		if (activateChapter.isImage) {
			const image = d3.select('#chapter-image-slot')
				.append('img')
				.attr('id', 'chapter-image')
				.attr('src', `../assets/misc-images/${activateChapter.image}`);
		}

	});
