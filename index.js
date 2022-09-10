//// query selectors 
const textEditor = document.querySelector('.text');
textEditor.addEventListener('input', updateWordCount);
textEditor.addEventListener('input', saveText);
textEditor.addEventListener('input', playSound);

const wordCountDiv = document.querySelector('.wordcount');

const savedText = localStorage.getItem('savedText') || '';
const savedWordCount = localStorage.getItem('savedWordCount') || 0;

let savedGoal = parseInt(localStorage.getItem('savedGoal')) || 0;
let prevStreakData = JSON.parse(localStorage.getItem('streak')) || '';
let streakCount = prevStreakData.count || 0;

const dailyGoalInput = document.querySelector('#dailygoal');
dailyGoalInput.addEventListener('change', updateDailyGoal);

const settingsHeader = document.querySelector('.settings-header');
settingsHeader.addEventListener('click', toggleSettings);

const soundOption = document.querySelector('#typingSound');
const showWordCountOption = document.querySelector('#showCount');
showWordCountOption.addEventListener('change', toggleWordCount);

const counterWrapper = document.querySelector('.counter-wrapper');

const dailyGoalText = document.querySelector('.dailygoaltext');

let showSettings = false;
let playedOnce = false; // tracks if fanfare played before.

textEditor.innerText = savedText; 
wordCountDiv.innerText = savedWordCount;

if (localStorage.getItem('savedGoal')) {
    dailyGoalText.innerText = '/ ' + savedGoal;
    dailyGoalInput.value = savedGoal;
}

updateStreak();

//// functions!

// function checkIfTwoDaysPasswd(someDate) {
//     const today = new Date();

//     const 
//     return someDate.getDate() == today.getDate() &&
//     someDate.getMonth() == today.getMonth() &&
//     someDate.getFullYear() == today.getFullYear()
// }



function getWordCount(string) {
    //let array = string.trim().split(" ");
    let word_count = string.trim().split(/\s+/);
    //dumb edgecase
    if (word_count.length === 1 && word_count[0] === '') {
        return 0;
    }
    return word_count.length;
}

function updateWordCount(e) {
    const wordCount = getWordCount(e.target.innerText);
    wordCountDiv.innerText = wordCount;
    localStorage.setItem('savedWordCount', wordCount);

    if (wordCount >= savedGoal) {
        // only increase streak if the saved date was yesterday!
        let today = new Date();
        let prevStreakObject = JSON.parse(localStorage.getItem('streak'));
        if (!prevStreakObject || prevStreakObject.date + 1 === today) {
            console.log("streak increased!")
            streakCount++; 
            let newStreakObject = {
                count: streakCount,
                date: new Date()
            }
            localStorage.setItem('streak', JSON.stringify(newStreakObject));
        }

        if (!soundOption.checked) return;
        if (!playedOnce) {
            var fanfare = new Audio('sounds/eb_fanfare.wav');
            fanfare.play();
            playedOnce = true;

        }
    }
}

function saveText(e) {
    const text = e.target.innerText;
    localStorage.setItem('savedText', text);
}


function toggleSettings() {
    const settingsDiv = document.querySelector('.settings-wrapper');
    settingsDiv.classList.toggle('on');
}

function updateDailyGoal(e) {
    savedGoal = parseInt(e.target.value);
    localStorage.setItem('savedGoal', savedGoal);
    dailyGoalText.innerText = "/ " + savedGoal;
}

function updateStreak() {
    const streakText = document.querySelector('.streakText');
    streakText.innerText = "streak: " + streakCount;
}

function playSound() {
    if (!soundOption.checked) return;
    var tick = new Audio('sounds/text.wav');
    tick.play();
}


function toggleWordCount() {
    showWordCountOption.checked === true ? counterWrapper.style.display = 'block' : counterWrapper.style.display = 'none';
}

