const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get(QueryParams.BOOK);
const chapterId = +urlParams.get(QueryParams.CHAPTER);
const pageId = +urlParams.get(QueryParams.PAGE);
const WORD_PER_PAGE = 250;

const activeBook = Books[bookId];
const activateChapter = activeBook.chapters[chapterId - 1];
const bookmarkButton = d3.select('#bookmark');
const bookmark = JSON.parse(localStorage.getItem(bookId) || '{}')
if (bookmark.chapterId === chapterId) {
	console.log('entered');
	bookmarkButton.classed('bookmarked', true);
}

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
	priorChapter.attr(`href`, buildReadLink({
		book: activeBook.id,
		chapter: chapterId - 1,
		page: 1,
	}));;
}

const nextChapter = d3.select('#next-chapter');
if (+chapterId === activeBook.chapters.length) {
	nextChapter.remove();
} else {
	nextChapter.attr(`href`, buildReadLink({
		book: activeBook.id,
		chapter: chapterId + 1,
		page: 1,
	}));
}


function buildReadLink ({ book, chapter, page }) {
	return `./read.html?${
		QueryParams.BOOK}=${book}&${
		QueryParams.CHAPTER}=${chapter}&${
		QueryParams.PAGE}=${page}`;
}

function buildPages (content) {
	const paragraphs = content.split(`\n\n`);
	const pages = [];
	let currentPage = [];
	paragraphs.forEach((p) => {
		currentPage.push(p);
		const wordCount = currentPage.join('\n\n')
		.split(/\s+/).length;
		if (wordCount <= WORD_PER_PAGE) {
			return;
		}

		currentPage.shift();
		pages.push(currentPage);
		currentPage = [];
	});

	pages.push(currentPage);
	return pages;
}

function addPageLinks (pageLength) {
	console.log({ pageLength, pageId })
	const nextPage = d3.select('#next-page');
	if (+pageId === pageLength) {
		nextPage.remove();
	} else {
		nextPage.attr(`href`, buildReadLink({
			book: activeBook.id,
			chapter: chapterId,
			page: pageId + 1,
		}));
	}

	const priorPage = d3.select('#prior-page');
	if (+pageId === 1) {
		priorPage.remove();
	} else {
		priorPage.attr(`href`, buildReadLink({
			book: activeBook.id,
			chapter: chapterId,
			page: pageId - 1,
		}));
	}
}

function scrollToTop () {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
}

function bookMark () {
	const bookmark = JSON.parse(localStorage.getItem(bookId) || '{}');
	const chapterTitle = activateChapter.title
		? `${activateChapter.title} (${activateChapter.id})`
		: activateChapter.id;
	if (bookmark.chapterId === chapterId && bookmark.pageId === pageId) {
		localStorage.clear(bookId);
		bookmarkButton.classed('bookmarked', false);
		const actionText = `Removed bookmark for ${activeBook.title} at chapter: ${chapterTitle}, page ${pageId}.`;
		console.log(actionText);
		window.alert(actionText);
	} else {
		localStorage.setItem(bookId, JSON.stringify({ chapterId, pageId }));
		bookmarkButton.classed('bookmarked', true);
		const actionText = `Bookmarked ${activeBook.title} at chapter: ${chapterTitle}, page ${pageId}.`;
		console.log(actionText);
		window.alert(actionText);
	}
}


fetch(`../assets/chapters/${bookId}/${chapterId}.txt`)
	.then(response => response.text())
	.then(content => {
		const text = d3.select('#chapter-text');
		const paragraphs = buildPages(content);
		paragraphs.forEach((paragraph) => text.append('p').html(paragraph));
		this.addPageLinks(pages.length);
	})
	.catch(error => {
		console.error('Error fetching file:', error);
		// local testing
		const snippet = `My attention was squarely set on the evergreen trees whizzing by the passenger side window.  They were fitting for the season.  However, early holiday spirit was not what kept me focused on the view.  It was part of a defense mechanism.

		Watching the snow and forest blend into white noise dulled my senses.  That numbness was a safe space where I could almost forget myself.  My circumstances.  Almost.  Switch was driving the car.  That awful dread I always felt in his presence kept me from falling into blissful oblivion.

		It still feels like I am being dramatic.  When I was alone, it was easy to think I was overreacting to him.  But there was no fooling myself when we were breathing the same air.  Or his smoke.

		I spared a glance at the central cup holder.  His fresh carton of Crossroads cigarettes sat there unopened.  We had been on the road heading northwest for twelve hours today and six the day before.  In all that time, this supposed pack-a-day smoker had not taken a single goddamn hit.  Not even during the five-minute stops every few hours to piss out coffee before chugging more down.  It was like he had forgotten they were there.

		That gave him too much benefit of the doubt though.  Everything he did was calculated.  From the clothes he wore to those well-timed smiles that never quite reached his eyes.  Even that banter about trying to quit the cancer sticks.  It was a ploy so ladies would think he was a lost soul they could save.  No one saw in him what I had felt since the beginning: that well-practiced fakeness.

		We met on my first day at the job.  It was his fourth.  We were supposed to start at the same time.  The plane that should have brought me to my new life down south got grounded by an ice storm.  One of those nasty ones that periodically swept down from Canada, crippling the northeast.

		Shit like that was why I wanted to move south.  No more power outages in freezing weather.  No more falling on ice.  And—the big one—no more driving to work in six inches of unplowed snow.  Anyway, he was a local and finished training before I got into town.  Amazing the difference three days can make.

		In that time, he turned everyone into his best friend.  He knew Clara’s favorite Starbucks Frapachi-machiat-whatever-the-fuck.  He knew the names and ages of Dave’s four kids.  He knew the scientific names of Janice’s plants and had convinced her that he too was an aspiring botanist.  I bet he had already hooked up with Ryan.  Switch was the guy who figured out how to effortlessly unclog that infernal, 15-year-old dinosaur of a printer that smelled like burnt rubber and flaking paint.

		And then I walk in.  The dour, lanky northerner who talked too fast.  The secretary did not understand who I was or what I wanted.  The longer that awkward exchange went on, the more I felt the eyes of my future coworkers on me.

		Look, I got testier with her than I should have.  But anybody would get annoyed in my position!  I also know people only believe that excuse when they know you.  Not on first impression.  I learned that the hard way back in college.

		So.  I took a long breath.  I introduced myself slowly in a level tone for the fifth time.  Finally, she understood why I was there.  She handed over a key card to access the building on nights and weekends.  She rattled off a few basic office courtesy rules.  A heavy stack of forms thumped onto her desk.  Business as usual.

		As she made to stand to show me where my cubicle was, Switch hurried over.  A natural blonde in top-of-the-line business casual.  He looked more like a clothing model than an office peon.  I panicked when I saw him, afraid I had walked in underdressed in my clean, but worn, button up and faded slacks.

		A quick glance around the office calmed me.  No one else was wearing brand-new digs with perfectly ironed creases.  Switch gave his signature, sparkling-white smile as he said, “Bea, let me show him to his spot.  You’re busy, and I’ve been fixing to meet the other newbie.”

		The secretary chuckled “your funeral” as she sat back down.

		Eye contact has never been my strong suit.  My gaze fell to his thick, metal watchband as I took his outstretched hand.  I mimicked the “proper” handshake my how-to-interview-for-idiots class had taught me.  And then I noticed something.

		Since I have a few inches on most guys, they usually give me rough handshakes.  A silent threat, warning, “Don’t think your height means you can mess with me.”  He gave the more amicable grip I usually received from guys my height or women.  He introduced himself as, “Timothy McGanon, but we’re not so formal here.  Just Tim is fine.”

		I mumbled back something stupid like, “Nice to meet you ‘just Tim.’”

		He laughed the right amount at the right volume.  Taking the forms from Bea’s desk, he wrapped an arm around my shoulders.  Tugged me forward.  That motion pulled me off balance, sending me stumbling into the main office.

		One by one, he pointed out our coworkers.  He provided a name and quick facts about each person.  Smiles lit up every face as he talked about them.  I cannot for the life of me remember anything he said.

		I desperately tried to tie just the names to the faces.  They were fading into a jumbled blur by the fourth introduction.  By the eighth, I would have had more luck telling apart the identical, manilla-carpeted cubicles than naming my coworkers.  His name was out of my head too.  There had to be clever way to make him say it again.

		I jolted back to reality when we stopped at an empty desk.  “This is you, and that” — he pointed to the desk directly behind us — “is me.  We’re not exactly desk mates, but I’m in talking distance if you need any help.”  His voice sounded melodic when he spoke.

		Everything about his aura radiated open warmth and congeniality.  Even the smoke smell on his clothes was welcoming.  I was relieved there was someone like him in the office.  I always do better when someone else exudes that kind of friendliness.  It offsets my dull presence.  I think it makes me come off as less boring and more mysterious.  People seem to like the contrast anyway.  So, I thought he would be my new foil.  I liked that possibility.

		It was easy to smile when I forced myself to look him in the eye to thank him for showing me around.  I was even ready to spew out small-talk bullshit to ease myself into full acquaintance with him.  I got as far as the word “thanks.”

		I want to call it primal instinct.  But if it were that simple, everyone would see him for what he was.   See that his icy blue eyes were wrong.  Both distant and uncomfortably present.  The intense, unblinking, unwavering stare of a predator passively watching the herd.  Not yet hunting but seeking weakness.  Scrutinizing its camouflage through its reflection in its prey’s eyes.  That sensation touched on some deep, fragmented memory I hope I never recover.

		“Do you want me to show you where the fridge is?”  His lilting tone contradicted his glassy eyes.  “We wouldn’t want your lunch to spoil.”  He pointed at the brown paper bag crumpled in my fist.

		I chided myself.  <i>This is person with an intense stare.  Nothing more.  The warning bells are first day nerves.</i>  Only an idiot would write off the office people-pleaser.  I just needed a second to regain my composure.  To forget what I thought I had seen.

		I hesitated too long.  He felt the chill in our rhythm.

		Somehow, that godawful stare intensified.  The left side of his lip quivered.  A motion that let me break eye contact and talk at the floor.  “No, that’s okay.  It doesn’t need to be cold.  I want to start on the security clearance forms.”

		“Security clearance?  So, you’re going to be designing Alpine too?”

		I mumbled, “Software side, yeah.”

		“Great!  We’ll have plenty of time to get to know each other then.”  He gave a thumbs up and another quick smile—too quick—before he headed back to his desk.

		I turned to my chair shaken.  What in the hell had just happened?  It was like I was the main character in an old sci fi movie.  I had seen through the body-snatching alien’s cover.  I mean, I knew that was crazy.  Aliens are not real.  Or, at worst, they are micro-dust critters living in other galaxies.  They will never find their way here.

		Thankfully, at least I <i>think</i> thankfully, my gut ignored my brain’s babbling rationalizations.  <i>Danger.  Warning.  Imposter.</i>

		He had placed the paperwork on my desk’s right side.  I slid it to the center, pushing a keyboard aside to make space.  Soothing, predictable, unnecessary bureaucracy.  That was precisely what I needed to drown myself in now.

		I reached out to where I expected my pen mug to be.  It was not there.  Of course not.  New job, dumbass.  It was not going to come with a junky, dark-stained mug.  One with a snarky quote about managers and meetings.  One that got cracked from being too well-loved.

		And maybe I dropped the poor thing on that dingey garage machine shop’s concrete floor.  The mug had stayed in one piece but would never hold fluid again.  That memory from the old job is still so vivid.  Whining circular table saws spewing piney dust.  Smoldering heat as blow torches sealed together metal joints.  The endless, stinging splinters that turned us into walking pin cushions.

		“Looks like you could use this.”

		I flinched.

		He dropped a ball point pen onto my forms.  “It’s at the end of its ink life, so don’t worry about using it up or giving it back.”

		I murmured a thanks without turning my head.  He waited, daring me to look up at him.  I refused to bite.  When he left my peripheral vision, I started breathing again.  Tiny, frantic, pants in time with my racing pulse, threatening a heart attack.

		My hands shook as I picked up the pen.  It made jagged, wobbly spirals as ink started flowing.  It scrawled inconsistent letters in the boxes.  I have never taken so long to print my name.  To complete a simple form.

		The whole time, I had to stop myself from writing the only thought in my head: “He knows I know.”
		`;

		const pages = buildPages(snippet);
		const text = d3.select('#chapter-text');
		const activeParagraphs = pages[pageId - 1];
		activeParagraphs.forEach((paragraph) => text.append('p').html(paragraph));
		this.addPageLinks(pages.length);
	});
