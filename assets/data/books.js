const BookId = Object.freeze({
	ALPINE: 'alpine',
	BONE_BLOOD_1: 'bone-and-blood-v1',
	BONE_BLOOD_2: 'bone-and-blood-v2',
	CRENULATION: 'crenulation',
});

const SeriesTitle = Object.freeze({
	ALPINE: 'Alpine',
	BONE_BLOOD: 'Bone and Blood',
	CRENULATION: 'Crenulation',
});

const BookTitle = Object.freeze({
	ALPINE: 'Alpine',
	BONE_BLOOD_1: 'Bone and Blood (Vol. 1)',
	BONE_BLOOD_2: 'Bone and Blood (Vol. 2)',
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
	PAGE: 'page',
});

class Series {
	constructor (params) {
		this.books = params.books;
		this.title = params.title
	}
}
class Book {
	constructor (params) {
		this.id = params.id
		this.title = params.title;
		this.blurb = params.blurb;
		this.misc = params.misc;
		this.firstPublished = params.firstPublished;
		this.completedFirstDraft = params.completedFirstDraft;
		this.lastEdited = params.lastEdited;
		
		this.wordCount = params.wordCount;
		this.type = params.type;
		this.genres = params.genres;
		this.chapters = params.chapters;

		this.thumbnail = params.thumbnail;
	}
}

function _buildChapters (chapters) {
	return chapters.map((chapter, index) => new Chapter({
		...chapter,
		id: index + 1,
	}))
}
class Chapter {
	constructor (params) {
		this.id = params.id;
		this.title = params.title;
		this.section = params.section;
		this.subtitle = params.subtitle;
		this.wordCount = params.wordCount;
	}
}

const BookList = {
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
		wordCount: ``,
		type: BookType.NOVEL,
		genres: [Genre.PSYCHOLOGICAL_THRILLER],
		chapters: _buildChapters([
			{
				title: 'Meeting',
				section: 'Gambit 1',
				wordCount: 1749,
			},
			{
				title: 'Echoes',
				section: 'Gambit 1',
				wordCount: 2156,
			},
			{
				title: 'Crossroads',
				section: 'Gambit 1',
				wordCount: 2521,
			},
			{
				title: 'Dissonance',
				section: 'Gambit 1',
				wordCount: 2242,
			},
			{
				title: 'Escalation',
				section: 'Gambit 1',
				wordCount: 1843,
			},
			{
				title: 'Knot',
				section: 'Gambit 1',
				wordCount: 1976,
			},
			{
				title: 'Ghosts',
				section: 'Gambit 1',
				wordCount: 1102,
			},
			{
				title: 'Blossom',
				section: 'Gambit 2',
				wordCount: 3783,
			},
			{
				title: 'Thriller',
				section: 'Gambit 2',
				wordCount: 1745,
			},
			{
				title: 'Fugue',
				section: 'Gambit 2',
				wordCount: 2514,
			},
			{
				title: 'Hinterland',
				section: 'Gambit 2',
				wordCount: 2184,
			},
			{
				title: 'Ebb',
				section: 'Gambit 2',
				wordCount: 3267,
			},
			{
				title: 'Parasite',
				section: 'Gambit 2',
				wordCount: 2618,
			},
			{
				title: 'Atomic',
				section: 'Gambit 2',
				wordCount: 3198,
			},
			{
				title: 'Rising',
				section: 'Gambit 2',
				wordCount: 2488,
			},
			{
				title: 'Reprise',
				section: 'Gambit 2',
				wordCount: 3224,
			},
			{
				title: 'Spiral',
				section: 'Gambit 2',
				wordCount: 1983,
			},
			{
				title: 'Origin',
				section: 'Gambit 2',
				wordCount: 5349,
			},
			{
				title: 'Breaks',
				section: 'Gambit 3',
				wordCount: 2401,
			},
			{
				title: 'Flow',
				section: 'Gambit 3',
				wordCount: 3082,
			},
			{
				title: 'Eyes',
				section: 'Gambit 3',
				wordCount: 2836,
			},
			{
				title: 'Switch',
				section: 'Gambit 3',
				wordCount: 2666,
			},
			{
				title: 'Resistor',
				section: 'Gambit 3',
				wordCount: 4476,
			},
			{
				title: 'Accretion',
				section: 'Gambit 3',
				wordCount: 2253,
			},
			{
				title: 'Fuse',
				section: 'Gambit 3',
				wordCount: 4783,
			},
			{
				title: 'Riptide',
				section: 'Gambit 3',
				wordCount: 2117,
			},
			{
				title: 'Alpine',
				section: 'Gambit 3',
				wordCount: 4271,
			},
			{
				title: 'Null Gambit',
				section: 'Epilogue',
				wordCount: 3295,
			},
		]),
		firstPublished: '2021',
		completedFirstDraft: '2022',
		lastEdited: '2026',
		thumbnail: '../assets/thumbnails/alpine.jpg',
	}),
	[BookId.BONE_BLOOD_1]: new Book({
		title: BookTitle.BONE_BLOOD_1,
		id: BookId.BONE_BLOOD_1,
		blurb: `
			Torani’s a failure.  A vampire biologically denied the rank he was raised for.  Now, his only value to the nest is predicting the final rank of rising grubs.  In a hierarchy bound by instinct, electro-chemical manipulation, and Queen’s Will, Torani needs to prove he’s more than another hungry mouth.

			But it’s hard to stay in line when there’s no rules for your fake rank.

			He never made prince, so surely he can court a knight.  If his half-formed prince instincts demand a family, he can claim and raise a rising royal too.  Unforgivable transgressions only allowed because the old regime is caving in.  This is his chance to escape and build his chosen family’s dream nest.  Or, he’ll discover his dream is its own suffocating hierarchy.
		`,
		misc: `
			A two-volume story.  Set at the end of the roaring 20s in Colorado Springs.
			Built on my take on Vampires, inspired by social insects, and Necromancers, inspired by....
			how to make being a necromancer as unfun as possible. 
		`,
		wordCount: `~91K`,
		type: BookType.NOVEL,
		genres: [Genre.DYSTOPIAN, Genre.SUPERNATURAL],
		chapters: _buildChapters([
			{
				section: 'Bone - Prologue',
				subtitle: 'Irvington, Nebraska, 1909',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'South to Route 24, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'Route 24, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'Route 24, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'Route 24, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'Southwest to Colorado Springs\' Outskirts, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'Elsmere, Colorado, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'Elsmere, Colorado, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'Black Forest, Colorado 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'Black Forest, Colorado 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'Colorado Springs, Colorado, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'Colorado Springs, Colorado, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'Colorado Springs, Colorado, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'Colorado Springs, Colorado, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'Manitou Springs, Colorado, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'Manitou Springs, Colorado, 1927',
				wordCount: 0,
			},
			{
				section: 'Blood',
				subtitle: 'Old Colorado City, Colorado, 1927',
				wordCount: 0,
			},
		]),
		firstPublished: '2022',
		completedFirstDraft: '2024',
		lastEdited: '2024',
		thumbnail: '../assets/thumbnails/bone-and-blood.jpg',
	}),
	[BookId.BONE_BLOOD_2]: new Book({
		title: BookTitle.BONE_BLOOD_2,
		id: BookId.BONE_BLOOD_2,
		blurb: `
			Kidnapping someone is generally not the best way to meet people, but Rhodes is in a tight spot as his cycle draws to a close.
			Do vampires even count as “people?”
			Probably not.
			But he has one hell of a multi-task ahead of him, trying to get Errek bonded to him while dealing with the hunters after both of them.
			Never mind explaining what he’s done to the other necromancers.
			Meanwhile, Errek has to come to terms with his continued ascent without his mentor and under Rhodes’ thumb.
			There is no choice but to make this work.
			To somehow get Rhodes to serve his needs and resolve his unfinished business with the nest.
			And to start a new one.
		`,
		misc: `
			A two-volume story.  Set at the end of the roaring 20s in Colorado Springs.
			Built on my take on Vampires, inspired by social insects, and Necromancers, inspired by....
			how to make being a necromancer as unfun as possible.
		`,
		wordCount: `WIP`,
		type: BookType.NOVEL,
		genres: [Genre.DYSTOPIAN, Genre.SUPERNATURAL],
		chapters: [],
		firstPublished: 'Pending',
		completedFirstDraft: 'Pending',
		lastEdited: 'Pending',
		thumbnail: '',
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
			"A lone entry loses its elegance.
			They only realize their meaning when properly curated, ordered, and sewn to a spine that unifies them together."
		`,
		wordCount: '',
		type: BookType.ANTHOLOGY,
		genres: [Genre.HORROR, Genre.SUPERNATURAL],
		chapters: _buildChapters([
			{
				title: 'Assemblage I',
				wordCount: 450,
			},
			{
				title: 'Do I Lock It?',
				wordCount: 1288,
			},
			{
				title: 'Wall Flowers',
				wordCount: 7051,
			},
			{
				title: 'Imperfection',
				wordCount: 1049,
			},
			{
				title: 'Outer Crust',
				wordCount: 2172,
			},
			{
				title: 'Hunting',
				wordCount: 4501,
			},
			{
				title: 'Tenure',
				wordCount: 1352,
			},
			{
				title: 'Denise',
				wordCount: 8044,
			},
			{
				title: 'Assemblage II',
				wordCount: 518,
			},
			{
				title: 'Tantrum',
				wordCount: 2302,
			},
			{
				title: 'Unearthed',
				wordCount: 5148,
			},
			{
				title: 'Undertow',
				wordCount: 8355,
			},
			{
				title: 'Inoperable',
				wordCount: 4845,
			},
			{
				title: 'Genetics',
				wordCount: 1845,
			},
			{
				title: 'Assemblage III',
				wordCount: 609,
			},
			{
				title: 'Unfounded',
				wordCount: 4803,
			},
		]),
		firstPublished: '2022',
		completedFirstDraft: 'Pending',
		lastEdited: '2026',
		thumbnail: '../assets/thumbnails/crenulation.jpg',

	}),
};

const SeriesList = [
	new Series({
		title: SeriesTitle.ALPINE,
		books: [BookList[BookId.ALPINE]],
	}),
	new Series({
		title: SeriesTitle.BONE_BLOOD,
		books: [
			BookList[BookId.BONE_BLOOD_1],
			BookList[BookId.BONE_BLOOD_2],
		],
	}),
	new Series({
		title: SeriesTitle.CRENULATION,
		books: [BookList[BookId.CRENULATION]],
	}),
];
