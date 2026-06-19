const urlParams = new URLSearchParams(window.location.search);
const seriesId = urlParams.get(QueryParams.SERIES);

const noContext = SeriesList[seriesId].noContext || [];
const frame = d3.select('.frame');

noContext.forEach((snippet) => addNoContext(snippet));

function addNoContext (snippet) {
	const article = frame.append('article');
	snippet.forEach((line) => article.append('p').text(line));

}