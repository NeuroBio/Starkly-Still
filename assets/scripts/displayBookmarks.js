const bookmarks = d3.select('#bookmarks');
Object.values(Books).forEach((book) => {
	let bookmark = localStorage.getItem(book.id);
	console.log(bookmark);
	if (!bookmark) {
		return;
	}
	bookmark = JSON.parse(bookmark);

	const bookTitle = book.title;
	console.log(book.chapters, bookmark)
	const chapterTitle = book.chapters[bookmark.chapterId - 1].title || bookmark.chapterId;
	const pageId = +bookmark.pageId;
	const entry = bookmarks.append('li')
		.attr(`class`, 'link-entry')
	entry.append('a')
		.attr('class', 'link-button')
		.attr('href', `./read.html?${QueryParams.BOOK}=${book.id}&${QueryParams.CHAPTER}=${bookmark.chapterId}&${QueryParams.PAGE}=${pageId}`)
		.text(`${bookTitle} at chapter: ${chapterTitle}, page ${pageId}`);
});