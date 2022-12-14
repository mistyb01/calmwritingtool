# calmwritingtool

## steps for implementation

1. TYPING, SHOWING WORDCOUNT, SAVING

   - [x] users can type in an editable div
   - [x] their wordcount is counted (internally)
   - [x] wordcount updates on the UI
   - [x] text is saved in localStorage

2. BASIC GOAL SETTING FOR USERS

   - [x] create a settings popup, which contains all the necessary input elements
   - [x] users can set a custom daily wordcount goal. it's represented as a text first ('100 words written out of 500')
   - [x] wordcount and goal are also stored in localstorage.
   - [ ] settings are saved too

3. STREAKS

   - [x] if user meets goal, the 'streak count' is updated and shown on ui! ('your streak is 1!')
   - [x] streak can only increment once a day. this can be done by storing a separate variable in localStorage, that stores the date the streak was last recorded. if today's date != the streak date, the streak increases.
   - [x] streak is lost if it's been two days since the value was updated.

4. MVP is complete at this point! here are extra features:

   - [ ] user can select between preset themes
   - [ ] user can fine-tune the colors of the theme
   - [ ] fullscreen button
   - [x] user can export their writing as a .txt, or another format
   - [x] typing ticks
   - [ ] 'challenge modes'? like, set a timer and see how many words you can write! modes to help people get started.
   - [ ] make an appealing visual for the streaks
   - [ ] when the wordcount is reached, a cute congratulation of some kind. a fanfare or visual effect.
   - [ ] a cute little mascot cheering on the writer (but not distracting them hopefully..)
   - [ ] embedded dictionary/thesaurus tools
   - [ ] voice-to-text tool
   - [ ] think about ways to make the process of accumulated wordcount or streak more satisfying. for example, the words can be represented as something tiny, but adds up--like drops of water in a glass. the wordcount can be represented as a book! and the book can get taller over time! (a certain number of words = a page)

5. Extra stats to track
   - [ ] total words written
   - [ ] max streak
   - [ ] average words per day
   - [ ] average time it takes to reach goal
   - [ ] average words per minute

## undecided stuff: data persistance...

- should the writing reset daily? if so, localstorage probably isn't the best solution?
- or if the writing persists, it wouldn't affect the daily wordcount value (which should reset daily anyway) but it could become bothersome
- there can be settings so users can decide- either keep the writing saved or clear the text daily (default could be the former)
- ! there can also be a prompt at the beginning of the day-- continue from yesterday's writing or start anew?

## similar apps/inspirations:

- calmlywriter.com is a distraction free and calm text editor. lots of settings to choose from, yet they're tucked away as to not clutter the ui
- 750words.com encourages a daily word count goal and streak! people can login, and their work is saved with their acct.
- writtenkitten.co rewards people with a new kitten picture with every 100 words written

(this isn't really a unique idea, but i still think it's a worthwhile learning experience. just focus on learning, and add whatever little tweaks sound fun!)

## other things:

- i'm not much of a writer; so researching what actually motivates writers would be necessary.
- even so, thinking about what would motivate me, someone VERY intimidated by writing, can still be a driving force.
- accessibility > style. they also don't have to be mutually exclusive. think about fonts that are readable for people with dyslexia, and a large default font-size.

## helpful links

for streak:
https://stackoverflow.com/questions/68281501/how-to-reset-a-variable-to-0-every-24-hours-in-javascript
https://codepen.io/krisgrove/pen/prPdov

palette:
https://lospec.com/palette-list/slso8
