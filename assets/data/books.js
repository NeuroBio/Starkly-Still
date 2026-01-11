const BookTitles = {
	ALPINE: 'Alpine',
	BONE_BLOOD_1: 'Bone and Blood (Volume 1)',
	CRENULATION: 'Crenulation',
};

const BookType = {
	NOVEL: 'Novel',
	NOVELLA: 'Novella',
	ANTHOLOGY: 'Short Story Anthology',
	SHORT_STORY: 'Short Story',
};

const Genre = {
	HORROR: 'Horror',
	DYSTOPIAN: 'Dystopian',
	PSYCHOLOGICAL_THRILLER: 'Psychological Thriller',
	SUPER_NATURAL: 'Super Natural',
}

class Book {
	constructor (params) {
		this.title = params.title;
		this.blurb = params.blurb;
		
		this.wordCount = params.wordCount;
		this.type = params.type;
		this.genres = params.genres;

		this.thumbnail = params.thumbnail;
	}
}

const Books = {
	[BookTitles.ALPINE]: new Book({
		title: BookTitles.ALPINE,
		blurb: `
			Awkward software developer John meets his new coworker, Tim,
			your typical, plugged-in socialite, with a perfect smile, all the right clothes, and a psychopath's dead-eyed stare.
			Tim's ever-escalating mind games and gaslighting gambits seek to isolate and control John.
			Security becomes unobtainable. Objective truth, a warped opinion.
			Even John's survival is in question, as Tim throws them both into a life-threatening trap.
			This is not a story about happy endings or triumph.
			It is about coping with the everyday horror around us, which can only be defeated by outlasting it.
		`,
		wordCount: 0,
		type: BookType.NOVEL,
		genres: [Genre.PSYCHOLOGICAL_THRILLER],
	}),
	[BookTitles.BONE_BLOOD_1]: new Book({
		title: BookTitles.BONE_BLOOD_1,
		blurb: `
			There's no place in vampire hierarchy for failed prince Torani.
			Raised to start the next nest, now his only purpose is to predict the final rank of rising grubs.
			As he struggles to find his role in a society bound by instinct, electro-chemical manipulation, and fear of failing the queen, he steps further out of line.
			Courting one of the knights?  Unacceptable.  Claiming a rising royal as his own? Treasonous.
			But as the decaying nest caves in on itself, he'll do anything to keep his chosen family safe.
			Even it means allying himself with the princess that rejected him.
		`,
		wordCount: 0,
		type: BookType.NOVEL,
		genres: [Genre.DYSTOPIAN, Genre.SUPER_NATURAL],
	}),
	[BookTitles.CRENULATION]: new Book({
		title: BookTitles.CRENULATION,
		blurb: `
			A sentient book that collects memories.
			A town on the corner between realities.
			A box that can erase anyone.
			This horror anthology dives into dark corners of unreality with a series of stand-alone stories.
			However:
			"[...] each entry alone does understand its own elegance.
			They only realize their sense of purpose when properly curated, ordered, and sewed to a spine that unifies them together."
		`,
		wordCount: 0,
		type: BookType.ANTHOLOGY,
		genres: [Genre.HORROR, Genre.SUPER_NATURAL],

	}),
}