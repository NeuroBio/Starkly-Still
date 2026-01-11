const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get(QueryParams.BOOK);
const chapterId = +urlParams.get(QueryParams.CHAPTER);

const activeBook = Books[bookId];
const activateChapter = activeBook.chapters[chapterId - 1];

d3.select(`#book-title`).text(activeBook.title);
d3.select(`#chapter-section`).text(activateChapter.section);
const title = activateChapter.title
	? `${activateChapter.id} - ${activateChapter.title}`
	: activateChapter.id;
d3.select(`#chapter-title`).text(title);

if (activateChapter.subtitle) {
	d3.select('#optional-chapter-data').append('h3')
		.attr('class', 'label')
		.text(activateChapter.subtitle)
}



const priorChapter = d3.select('#prior-chapter');
if (chapterId === 1) {
	priorChapter.remove();
} else {
	priorChapter.attr(`href`, `./read.html?${QueryParams.BOOK}=${activeBook.id}&${QueryParams.CHAPTER}=${chapterId - 1}`);
}

const nextChapter = d3.select('#next-chapter');
if (+chapterId === activeBook.chapters.length) {
	nextChapter.remove();
} else {
	nextChapter.attr(`href`, `./read.html?${QueryParams.BOOK}=${activeBook.id}&${QueryParams.CHAPTER}=${chapterId + 1}`)
}

function scrollToTop () {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
}


fetch(`../assets/chapters/${bookId}/${chapterId}.txt`)
	.then(response => response.text())
	.then(content => {
		const text = d3.select('#chapter-text');
		const paragraphs = content.split(`\n\n`);
		paragraphs.forEach((paragraph) => {
			text.append('p').html(paragraph);
		});
	})
	.catch(error => console.error('Error fetching file:', error));