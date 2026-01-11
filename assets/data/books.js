const BookId = Object.freeze({
	ALPINE: 'alpine',
	BONE_BLOOD_1: 'bone-and-blood-v1',
	CRENULATION: 'crenulation',
});

const BookTitle = Object.freeze({
	ALPINE: 'Alpine',
	BONE_BLOOD_1: 'Bone and Blood (Vol. 1)',
	CRENULATION: 'Crenulation',
});

const BookType = Object.freeze({
	NOVEL: 'Novel',
	NOVELLA: 'Novella',
	ANTHOLOGY: 'Short Story Anthology',
	SHORT_STORY: 'Short Story',
});

const Genre = Object.freeze({
	HORROR: 'Horror',
	DYSTOPIAN: 'Dystopian',
	PSYCHOLOGICAL_THRILLER: 'Psychological Thriller',
	SUPERNATURAL: 'Supernatural',
});

const QueryParams = Object.freeze({
	CHAPTER: 'chapter',
	BOOK: 'book',
});

class Book {
	constructor (params) {
		this.id = params.id
		this.title = params.title;
		this.blurb = params.blurb;
		
		this.wordCount = params.wordCount;
		this.type = params.type;
		this.genres = params.genres;
		this.chapters = params.chapters;

		this.thumbnail = params.thumbnail;
	}
}

function _buildChapters (chapterTitles) {
	return chapterTitles.map((title, index) => new Chapter({
		title,
		id: index + 1,
	}))
}
class Chapter {
	constructor (params) {
		this.id = params.id;
		this.title = params.title;
	}
}

const Books = {
	[BookId.ALPINE]: new Book({
		title: BookTitle.ALPINE,
		id: BookId.ALPINE,
		blurb: `
			Awkward software developer John meets his new coworker, Tim,
			your typical, plugged-in socialite, with a perfect smile, all the right clothes, and a psychopath's dead-eyed stare.
			Tim's ever-escalating mind games and gaslighting gambits seek to isolate and control John.
			Security becomes unobtainable. Objective truth, a warped opinion.
			Even John's survival is in question, as Tim throws them both into a life-threatening trap.
			This is not a story about happy endings or triumph.
			It is about coping with the everyday horror around us, which can only be defeated by outlasting it.
		`,
		wordCount: `~80K`,
		type: BookType.NOVEL,
		genres: [Genre.PSYCHOLOGICAL_THRILLER],
		chapters: _buildChapters([
			'Gambit 1 - Meeting',
			'Gambit 1 - Echoes',
			'Gambit 1 - Crossroads',
			'Gambit 1 - Dissonance',
			'Gambit 1 - Escalation',
			'Gambit 1 - Knot',
			'Gambit 1 - Ghosts',
			'Gambit 2 - Blossom',
			'Gambit 2 - Thriller',
			'Gambit 2 - Fugue',
			'Gambit 2 - Hinterland',
			'Gambit 2 - Ebb',
			'Gambit 2 - Parasite',
			'Gambit 2 - Atomic',
			'Gambit 2 - Rising',
			'Gambit 2 - Reprise',
			'Gambit 2 - Spiral',
			'Gambit 2 - Origin',
			'Gambit 3 - Breaks',
			'Gambit 3 - Flow',
			'Gambit 3 - Eyes',
			'Gambit 3 - Switch',
			'Gambit 3 - Resistor',
			'Gambit 3 - Accretion',
			'Gambit 3 - Fuse',
			'Gambit 3 - Riptide',
			'Gambit 3 - Alpine',
			'Null Gambit',
		]),
		thumbnail: '../assets/thumbnails/alpine.jpg',
	}),
	[BookId.BONE_BLOOD_1]: new Book({
		title: BookTitle.BONE_BLOOD_1,
		id: BookId.BONE_BLOOD_1,
		blurb: `
			There's no place in vampire hierarchy for failed prince Torani.
			Raised to start the next nest, now his only purpose is to predict the final rank of rising grubs.
			As he struggles to find his role in a society bound by instinct, electro-chemical manipulation, and fear of failing the queen, he steps further out of line.
			Courting one of the knights?  Unacceptable.  Claiming a rising royal as his own? Treasonous.
			But as the decaying nest caves in on itself, he'll do anything to keep his chosen family safe.
			Even it means allying himself with the princess that rejected him.
		`,
		wordCount: `~91K`,
		type: BookType.NOVEL,
		genres: [Genre.DYSTOPIAN, Genre.SUPERNATURAL],
		chapters: _buildChapters([
			'Irvington, Nebraska, 1909',
			'The Nest, 1926',
			'The Nest, 1926',
			'The Nest, 1926',
			'The Nest, 1926',
			'The Nest, 1926',
			'The Nest, 1926',
			'The Nest, 1926',
			'The Nest, 1926',
			'The Nest, 1926',
			'The Nest, 1926',
			'The Nest, 1926',
			'The Nest, 1927',
			'The Nest, 1927',
			'The Nest, 1927',
			'The Nest, 1927',
			'The Nest, 1927',
			'South to Route 24, 1927',
			'Route 24, 1927',
			'Route 24, 1927',
			'Route 24, 1927',
			'The Nest, 1927',
			'The Nest, 1927',
			'The Nest, 1927',
			'Southwest to Colorado Springs\' Outskirts, 1927',
			'Elsmere, Colorado, 1927',
			'Elsmere, Colorado, 1927',
			'The Nest, 1927',
			'The Nest, 1927',
			'The Nest, 1927',
			'The Nest, 1927',
			'The Nest, 1927',
			'The Nest, 1927',
			'Black Forest, Colorado 1927',
			'Black Forest, Colorado 1927',
			'Colorado Springs, Colorado, 1927',
			'Colorado Springs, Colorado, 1927',
			'Colorado Springs, Colorado, 1927',
			'Colorado Springs, Colorado, 1927',
			'Manitou Springs, Colorado, 1927',
			'Manitou Springs, Colorado, 1927',
			'Old Colorado City, Colorado, 1927',
		]),
		thumbnail: '../assets/thumbnails/bone-and-blood.jpg',
	}),
	[BookId.CRENULATION]: new Book({
		title: BookTitle.CRENULATION,
		id: BookId.CRENULATION,
		blurb: `
			A sentient book that collects memories.
			A town on the corner between realities.
			A box that can erase anyone.
			This horror anthology dives into dark corners of unreality with a series of stand-alone stories.
			However:
			"[...] each entry alone does understand its own elegance.
			They only realize their sense of purpose when properly curated, ordered, and sewed to a spine that unifies them together."
		`,
		wordCount: 'WIP',
		type: BookType.ANTHOLOGY,
		genres: [Genre.HORROR, Genre.SUPERNATURAL],
		chapters: _buildChapters([
			'Assemblage I',
			'Do I Lock It?',
			'Wall Flowers',
			'Imperfection',
			'Outer Crust',
			'Hunting',
			'Tenure',
			'Denise',
			'Assemblage II',
			'The Tantrum',
			'Unearthed',
			'Undertow',
			'Inoperable',
			'Genetics',
			'Assemblage III',
			'Unfounded',
		]),
		thumbnail: '../assets/thumbnails/crenulation.jpg',

	}),
}