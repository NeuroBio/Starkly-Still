const bookmarks = d3.select('#bookmarks');
let addedBookmark = false;

Object.values(BookList).forEach((book) => {
	let bookmark = localStorage.getItem(book.id);
	if (!bookmark) {
		return;
	}
	bookmark = JSON.parse(bookmark);

	const bookTitle = book.title;
	const chapterTitle = book.chapters[bookmark.chapterId - 1].title || bookmark.chapterId;
	const pageId = +bookmark.pageId;
	const entry = bookmarks.append('li')
		.attr(`class`, 'link-entry')
	entry.append('a')
		.attr('class', 'link-button')
		.attr('href', `./${book.id}.html?${QueryParams.CHAPTER}=${bookmark.chapterId}&${QueryParams.PAGE}=${pageId}`)
		.text(`${bookTitle} at chapter: ${chapterTitle}, page ${pageId}`);
	addedBookmark = true;
});

if (!addedBookmark) {
	bookmarks.append('li').text('No bookmarks found.');
} else {
	d3.select('#clear-storage')
		.append('button')
		.text('Clear Storage')
		.on('click', () => clearStorage())
}

function clearStorage () {
	localStorage.clear();
	bookmarks.html('');
	bookmarks.append('li').text('No bookmarks found.');
	d3.select('#clear-storage').remove();
}