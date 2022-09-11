
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
let totalWordCount = parseInt(localStorage.getItem('totalWordCount')) || 0;

const dailyGoalInput = document.querySelector('#dailygoal');
dailyGoalInput.addEventListener('change', updateDailyGoal);

const settingsHeader = document.querySelector('.settings-header');
settingsHeader.addEventListener('click', toggleSettings);

const soundOption = document.querySelector('#typingSound');
const showWordCountOption = document.querySelector('#showCount');
showWordCountOption.addEventListener('change', toggleWordCount);

const counterWrapper = document.querySelector('.counter-wrapper');

const dailyGoalText = document.querySelector('.dailygoaltext');
//const totalWordCountText = document.querySelector('.totalWords');

let showSettings = false;
let playedOnce = false; // tracks if fanfare played before.

textEditor.innerText = savedText; 
wordCountDiv.innerText = savedWordCount;

if (localStorage.getItem('savedGoal')) {
    dailyGoalText.innerText = '/ ' + savedGoal;
    dailyGoalInput.value = savedGoal;
}

updateStreak();


//// saving stuff with the file system api


document.querySelector('#saveBtn').onclick = async () => {
    const options = {
        types: [
          {
            description: "Text Document",
            accept: {
              "text/plain": [".txt"],
            },
          },
        ],
      };
      
    
    let fileHandle = await window.showSaveFilePicker(options);
    let stream = await fileHandle.createWritable();
    await stream.write(textEditor.innerText);
    await stream.close();
}


//// functions
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
    //localStorage.setItem('totalWordCount', totalWordCount);
    
    if (wordCount >= savedGoal) {
        let today = new Date();
        let prevStreakObject = JSON.parse(localStorage.getItem('streak'));
        // only increase streak if the saved date was yesterday, or if a streak obj doesn't already exist!
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

