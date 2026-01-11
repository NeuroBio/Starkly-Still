const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get(QueryParams.BOOK);
const chapterId = urlParams.get(QueryParams.CHAPTER);

const activeBook = Books[bookId];

d3.select(`#book-title`).text(activeBook.title);
d3.select(`#chapter-title`).text(activeBook.chapters[chapterId - 1].title);

fetch(`../assets/chapters/${bookId}/${chapterId}.txt`)
  .then(response => response.text())
  .then(content => {
	d3.select('#chapter-text').text(content);
  })
  .catch(error => console.error('Error fetching file:', error));