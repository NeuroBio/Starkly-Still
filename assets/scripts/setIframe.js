const fragments = window.location.pathname.split('.')[0].split('/');
const bookId = fragments[fragments.length -1];
const currentParams = window.location.search || `?${QueryParams.CHAPTER}=1&${QueryParams.PAGE}=1`;

d3.select('body')
	.append('iframe')
	.attr('title', 'Reading Interface')
	.attr('src', `../pages/read.html${currentParams}&${QueryParams.BOOK}=${bookId}`);       
