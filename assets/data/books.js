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
	PAGE: 'page',
});

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
			{
				title: 'Meeting',
				section: 'Gambit 1'
			},
			{
				title: 'Echoes',
				section: 'Gambit 1'
			},
			{
				title: 'Crossroads',
				section: 'Gambit 1'
			},
			{
				title: 'Dissonance',
				section: 'Gambit 1'
			},
			{
				title: 'Escalation',
				section: 'Gambit 1'
			},
			{
				title: 'Knot',
				section: 'Gambit 1'
			},
			{
				title: 'Ghosts',
				section: 'Gambit 1'
			},
			{
				title: 'Blossom',
				section: 'Gambit 2'
			},
			{
				title: 'Thriller',
				section: 'Gambit 2'
			},
			{
				title: 'Fugue',
				section: 'Gambit 2'
			},
			{
				title: 'Hinterland',
				section: 'Gambit 2'
			},
			{
				title: 'Ebb',
				section: 'Gambit 2'
			},
			{
				title: 'Parasite',
				section: 'Gambit 2'
			},
			{
				title: 'Atomic',
				section: 'Gambit 2'
			},
			{
				title: 'Rising',
				section: 'Gambit 2'
			},
			{
				title: 'Reprise',
				section: 'Gambit 2'
			},
			{
				title: 'Spiral',
				section: 'Gambit 2'
			},
			{
				title: 'Origin',
				section: 'Gambit 2'
			},
			{
				title: 'Breaks',
				section: 'Gambit 3'
			},
			{
				title: 'Flow',
				section: 'Gambit 3'
			},
			{
				title: 'Eyes',
				section: 'Gambit 3'
			},
			{
				title: 'Switch',
				section: 'Gambit 3'
			},
			{
				title: 'Resistor',
				section: 'Gambit 3'
			},
			{
				title: 'Accretion',
				section: 'Gambit 3'
			},
			{
				title: 'Fuse',
				section: 'Gambit 3'
			},
			{
				title: 'Riptide',
				section: 'Gambit 3'
			},
			{
				title: 'Alpine',
				section: 'Gambit 3'
			},
			{
				title: 'Null Gambit',
				section: 'Epilogue'
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
			There's no place in vampire hierarchy for failed prince Torani.
			Raised to start the next nest, now his only purpose is to predict the final rank of rising grubs.
			As he struggles to find his role in a society bound by instinct, electro-chemical manipulation, and fear of failing the queen, he steps further out of line.
			Courting one of the knights?  Unacceptable.  Claiming a rising royal as his own? Treasonous.
			But as the decaying nest caves in on itself, he'll do anything to keep his chosen family safe.
			Even it means allying himself with the princess that rejected him.
		`,
		misc: `
			A two-volume story.  Set at the end of the roaring 20s in Colorado Springs.
			Built on my take on Vampires, inspired by social insects, and Necromancers, inspired by....
			how to make being a necromancer as unfun as possible. 
			Volume I focuses almost entirely on the vampires.
			Volume II refocuses on what the necromancers do with the vampires once they meet.
		`,
		wordCount: `~91K`,
		type: BookType.NOVEL,
		genres: [Genre.DYSTOPIAN, Genre.SUPERNATURAL],
		chapters: _buildChapters([
			{
				section: 'Bone - Prologue',
				subtitle: 'Irvington, Nebraska, 1909',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1926',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'South to Route 24, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'Route 24, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'Route 24, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'Route 24, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'Southwest to Colorado Springs\' Outskirts, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'Elsmere, Colorado, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'Elsmere, Colorado, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'The Nest, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'Black Forest, Colorado 1927',
			},
			{
				section: 'Blood',
				subtitle: 'Black Forest, Colorado 1927',
			},
			{
				section: 'Blood',
				subtitle: 'Colorado Springs, Colorado, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'Colorado Springs, Colorado, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'Colorado Springs, Colorado, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'Colorado Springs, Colorado, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'Manitou Springs, Colorado, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'Manitou Springs, Colorado, 1927',
			},
			{
				section: 'Blood',
				subtitle: 'Old Colorado City, Colorado, 1927',
			},
		]),
		firstPublished: '2022',
		completedFirstDraft: '2024',
		lastEdited: '2024',
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
			{
				title: 'Assemblage I',
			},
			{
				title: 'Do I Lock It?',
			},
			{
				title: 'Wall Flowers',
			},
			{
				title: 'Imperfection',
			},
			{
				title: 'Outer Crust',
			},
			{
				title: 'Hunting',
			},
			{
				title: 'Tenure',
			},
			{
				title: 'Denise',
			},
			{
				title: 'Assemblage II',
			},
			{
				title: 'The Tantrum',
			},
			{
				title: 'Unearthed',
			},
			{
				title: 'Undertow',
			},
			{
				title: 'Inoperable',
			},
			{
				title: 'Genetics',
			},
			{
				title: 'Assemblage III',
			},
			{
				title: 'Unfounded',
			},
		]),
		firstPublished: '2022',
		completedFirstDraft: 'pending',
		lastEdited: '2025',
		thumbnail: '../assets/thumbnails/crenulation.jpg',

	}),
}