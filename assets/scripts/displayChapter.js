const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get(QueryParams.BOOK);
const chapterId = +urlParams.get(QueryParams.CHAPTER);
const pageId = +urlParams.get(QueryParams.PAGE);
const WORD_PER_PAGE = 250;

const activeBook = BookList[bookId];
const activateChapter = activeBook.chapters[chapterId - 1];
const bookmarkButton = d3.select('#bookmark');
const bookmark = JSON.parse(localStorage.getItem(bookId) || '{}')
if (bookmark.chapterId === chapterId && bookmark.pageId === pageId) {
	bookmarkButton.classed('bookmarked', true);
}

buildHeader();
buildChapterLinks();


function buildHeader() {
	d3.select(`#book-title`).text(activeBook.title);
	d3.select(`#chapter-section`).text(activateChapter.section
		? `${activateChapter.section}: `
		: '');
	const title = activateChapter.title
		? `${activateChapter.id} - ${activateChapter.title}`
		: activateChapter.id;
	d3.select(`#chapter-title`).text(title);

	if (activateChapter.subtitle) {
		d3.select('#optional-chapter-data').append('h3')
			.attr('class', 'label')
			.text(activateChapter.subtitle)
	}
}
function buildChapterLinks () {
	const priorChapter = d3.select('#prior-chapter');
	if (chapterId === 1) {
		priorChapter.classed('hide', true);
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
}

function buildReadLink ({ book, chapter, page }) {
	return `./read.html?${
		QueryParams.BOOK}=${book}&${
		QueryParams.CHAPTER}=${chapter}&${
		QueryParams.PAGE}=${page}`;
}

function buildPages (content) {
	const paragraphs = content
		.trim()
		.split(`\n\n`)
		.filter((p) => {
			p = p.replace(`\n`, '');
			return true;
		});
	const pages = [];
	let currentPage = [];
	paragraphs.forEach((p) => {
		currentPage.push(p);
		const wordCount = currentPage.join('\n\n')
		.split(/\s+/).length;
		if (wordCount <= WORD_PER_PAGE) {
			return;
		}

		currentPage.pop();
		pages.push(currentPage);
		currentPage = [p];
	});

	pages.push(currentPage);
	return pages;
}

function addPageLinks (pageLength) {
	const nextPage = d3.select('#next-page');
	if (+pageId === pageLength) {
		nextPage.classed('hide', true);
	} else {
		nextPage.attr(`href`, buildReadLink({
			book: activeBook.id,
			chapter: chapterId,
			page: pageId + 1,
		}));
	}

	const priorPage = d3.select('#prior-page');
	if (+pageId === 1) {
		priorPage.classed('hide', true);
	} else {
		priorPage.attr(`href`, buildReadLink({
			book: activeBook.id,
			chapter: chapterId,
			page: pageId - 1,
		}));
	}

	d3.select('#page-number').text(pageId);
}

function scrollToTop () {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
}

function bookmarkPage () {
	const bookmark = JSON.parse(localStorage.getItem(bookId) || '{}');
	const chapterTitle = activateChapter.title
		? `${activateChapter.title} (${activateChapter.id})`
		: activateChapter.id;
	if (bookmark.chapterId === chapterId && bookmark.pageId === pageId) {
		localStorage.removeItem(bookId);
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
		const pages = buildPages(content);
		
		pages[pageId - 1].forEach((paragraph) => text.append('p').html(paragraph));
		this.addPageLinks(pages.length);
	})
	.catch(error => {
		console.error('Error fetching file:', error);
		// local testing
		const snippet = `When the car stopped, I jolted back from the window.  I must have dozed off.  Squinting, I tried to get a sense of our surroundings.  My breath fogged the glass into an opaque, grey mass against the evening twilight.  I turned my head just enough to glimpse the red light ahead of us.  Glancing down to his seatbelt buckle, “More coffee?”

“We should probably get some real food too.  We’re going to cross the border in 15 minutes, and most of Canada is moose and dead space, isn’t it?”  His fingers tapped out a syncopated rhythm on the steering wheel.  It almost riffed on the turn signal’s clicking but was slightly off.  “I’m hungry anyway.  You’re hungry too, right?”


“Not really.”  I had not eaten since the incident the night before.

“Well, that’s not going to do!  You’re not going to starve on me before we even get there.  What do you want?  I think the sign said there was a McDonalds, Subway, some local diner…”

“I’ll figure something out.”

“Well, I’m sticking with you to make sure you eat.  I can’t do the demo with a skeleton.”  He laughed easily at first, but his tone fell to a mockery of suppressed concern.  “You know, I’m really worried about you.  You’ve seemed stressed lately.”

“It’s the project.”

“Yeah.  I know what you mean.”  The light turned green, and he made a right off the exit ramp.  Before this trip, I had only ridden with him twice.  And I was not exactly focused on the traffic for those occasions.  However, I swear he never made rights on red.  Even when the road was empty like it was on this night.

He also never drove a fraction of a mile over the speed limit.  If he were anyone else, I would have said he was an overly cautious driver.  The reality was he did it to extend the trip those extra seconds.  So he could enforce his stifling presence on me a little bit longer.

Wistfully, he said, “I’m looking forward to being done with this too.”

He pulled into a space at the McDonalds.  No surprise.  We had gotten our coffees there too.  And ate lunch-dinner there yesterday.  I waited for him to get out first.  I had this suspicion that if he were ever in the car alone, he would drive off without me.  It was a silly fear.  He enjoyed keeping me on a tight leash.  That anxiety was one of my mutated ideas.

I think we all carry a lot more baggage than we are aware of.  I imagine it like a toxic waste barrel, buried deep underground for theoretically safe storage.  Rust eats little pin holes into it.  The radioactivity slowly seeps out into everything else, poisoning the world slowly and imperceptibly.  Thoughts and actions morph under that influence.

Most of the time, I can recognize my mutated reactions.  I talk myself out of those sparks of insanity.  But, with him, I never knew if my “insights” were my baggage leaking out or not.  If he was repeating some pattern from those memories, then I had to take the warning seriously.  It was safest to consider every gut feeling valid.

His door slammed closed, so I opened mine and got out.  My door had barely shut before I heard the locks click.  The car beeped to tell Switch to stop pushing the lock button on the key fob.  I frowned.  My black ski jacket that was lying the back seat.  It was chilly, and I had hoped to grab it.

Oh well.  I had my light, denim jacket.  No need to make a fuss about the other one.  Instead, I awkwardly shoved my hands into my pockets to stay warm.  A simple task made difficult by the bandage on my left hand.  I walked around the tan car to join him.  As we walked towards the golden arches, I kept an armlength away.  Safely out of reach.

“I guess you’re more cold-resistant than I am.” He feigned self-embarrassment as he straightened his quilted vest’s collar.  It was brand-new and cream-colored with a faux-fur hood.  Enough flair to look stylish without making him come off as a fashionista.

“Comes with the territory.”  My exhausted, flat tone was unmistakable.

He chuckled as if I had responded in the way I should have: with a dose of cheer, a dash of pretend arrogance, and a smattering of the same playfulness he affected.  He opened the glass door and grandly motioned for me to go first.  Without thinking, I glanced at his tight-cornered smile.  His white teeth barely showed between his carefully parted lips.

I looked down.  I shuffled in ahead of him.  This was not the time to challenge him.

He was re-establishing our normal game conditions.  There was safety in that for me.  Even if did mean that he would be standing directly behind me in line, making the hairs on the back of my neck stand up.  I tried to ignore him and remember what I had ordered at lunch the day before.

I never was fond of fast food.  It is not because it is beneath me; I can be a human garbage disposal when I put my mind to it.   Burgers and fries just never did it for me.  And I knew better than to trust anything else at a burger joint.

I stepped up to the cash register, and a young gal with dirty blonde hair tied back in a ponytail greeted me.  “Hey, welcome to McDonalds!  Can I take your order?”

“Yeah, can I get a wh—big mac with a… large fry and pop…”

He nudged in beside me saying, “Make that two, but I’d like a vanilla shake instead of the coke, please.”  

The cashier asked a few more questions.  He answered them all.  His credit card swiped through the register before I could stop him.  Once the receipt was safety tucked into his wallet, he opted to hang back and wait for the order.  I retreated to the condiments stand.

One click on the rumbling soft drink dispenser to get a half glass of ice.  A second for the muted hum of water to fill it up.  I sloshed my drink around, wishing it was warm enough to justify the ice.  He was still waiting for the order, rocking back and forth on his heels as if lost in thought.  I decided to look around for a place to sit in case we were taking a bona fide break from the road.

At the front booth, sat a grandfather, chatting quietly with his well-behaved grandson and granddaughter.  In the back corner, one of the restaurant employees aggressively wrote in a spiral notepad through her break.  A few tables had been left messy by disrespectful patrons.  Otherwise, nothing of note.

It was like every other McDonalds we had walked into.  It dawned on me that maybe that was why he always pulled in.  The familiarity.  Did that give him a sense of control?  Knowing the foreign turf by its formulaic presentation.  That he would—

“Did you pick a place to sit?”

Startled, I turned.  We would have locked into eye contact if Switch had been looking at me.  I got lucky that time.  He was busy picking out a straw to poke into his shake’s lid and piling too many napkins onto the food tray.  I simultaneously shook my head, shrugged, and pointed weakly at a random, clean table.

He cut past me.  “Come on then!”  Reluctantly, I followed.  When he set the tray down, the table rocked to one side.  He wiggled it back and forth, tsking at the poor craftsmanship.

“We don’t have to sit here.”

“No, I’ve got this.”

He was already picking up most of the napkins and folding them in half.  He stooped down and shoved them under the shortest table leg.  When he tried to rock the table back and forth again, it held steady.  He placed himself in a chair and rotated the tray, so his food was closest to him.

I sat opposite, taking one of the two remaining napkins.  I tried not to wonder if he had followed my gaze earlier and had somehow predicted that I would pick the table that rocked.  How he would have known it rocked was another mystery I did not want answered.

Out of nowhere, he said, “You did a good job today.”

I paused.  All we had done was drive and buy coffee.  He had barely even spoken before we stopped here.  I had done nothing worthy of praise, real or sarcastic.  He patiently unwrapped his burger and picked at his fries.  I caved.  “With what?”

“You didn’t say ‘whopper’ this time.  You almost did, but you didn’t.”  He took a long sip of his shake.  “I would have taken you to Burger King instead, but I haven’t seen any.”

I muttered, “It doesn’t make a difference.”

“It most certainly does!”

I had nothing to say to that.  I hoped that meant we could eat in silence.

He picked up a new conversation.  “I don’t mean to pry, but why did you order a coke if you wanted ice water?  You’ve done it twice.  You can just ask for water.”

I saw little strategic value for him in the truth, so I admitted, “I don’t want to be the guy who just orders water at a restaurant.  Even if it’s fast food.”

“But you ordered the rest of a meal.”

“It’s the principle of the thing.”  That seemed to throw him.  He filled the silence with a neutral “ah” before grabbing his burger.  I fidgeted with the rim of my cup.  “You didn’t have to pay for me.”  I resisted the urge to tack on a softening statement like, “I’m not complaining though.”

“I thought that, <i>maybe</i>, if I bought your dinner, it would make you feel guilty enough to eat.  Was I right?”

A stupid question since my food was untouched.  I had only unfolded the napkin in front of me and then wrapped my hands protectively around my water.  I regretted adding the ice to it.  My fingers were cold now.  The condensation on the plastic-y paper was seeping into the gauze on my hand, irritating the cut.  I should have asked to get my ski jacket earlier.

His fingers tapped as he waited for me to respond.

I licked my lips and finally met his eyes.  Quietly, “Are you going to pretend that last night never happened?”

His pupils dilated.  “What happened last night?”

“Okay.”  I started to look down, but his hand shot out, grabbing my wrist.

“You should eat.”

His loose grip was paralyzing.  “I c-can’t do that until you let go.”

He made a show of contemplating my words.  Slowly, he released me.  His hand retracted to the middle of the table.  Far enough away to give me space.  Close enough to make the continued threat obvious.

I took the foil-paper lump containing my burger and unwrapped it.  He sipped at his shake calmly, but I felt those blackhole, blue eyes scrutinizing every crinkle.  I took one bite, chewing and swallowing mechanically.

He hummed in approval and pulled his hand back to resume eating.  Between mouthfuls, “You’re going to thank me later.  Going all day without food is bad for you.”

“Isn’t the water diet supposed to be some weird cleansing thing?” There was no repressing my bitterness.  I had not tasted any of the food I was inserting into my mouth.

He grabbed a fry from my untouched fry cup and waved it around as he explained, “It’s the <i>water</i> diet, not the <i>coffee</i> diet.”  His offhand was still tapping out that same rhythm from the car.  I least I think it was the same.  “Also, once we reach the hotel, I call first dibs on the bathroom if you’re planning to lock yourself in there all night again.  I wanted to shower this morning, but you made that impossible.  I intend to shower tonight to make up for it.”

I froze mid swallow and choked, sputtering burger bits onto the table.  The coughing fit that followed left me wheezing.  The little granddaughter at the other table must have thought it was funny.  I heard her giggle before her grandfather shushed her.  I took a big gulp of water. 

I had just found my breath when Switch said, “And don’t stop eating.”  I barely heard him over the throbbing pain in my skull.  It screamed for external validation that this was not normal.  His nonchalance was bullshit.  After what had happened last night, after what I had almost done—!

Clenching my left hand hurt.

One deep breath.  I relaxed my fists.  I picked up the burger.  I took another bite.

I kept telling myself that I had to save my energy for the real fights.  Turning every interaction into a contest of wills would guarantee his victory, because he never turned off.  He never stopped.  I was a visitor in his domain, and survival demanded compliance until an escape presented itself.  I had to keep going until I reached it.




		`;

		const text = d3.select('#chapter-text');
		const pages = buildPages(snippet);
		pages[pageId - 1].forEach((paragraph) => text.append('p').html(paragraph));
		this.addPageLinks(pages.length);
	});
