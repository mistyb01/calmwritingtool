const textEditor = document.querySelector('.text');
const wordCountDiv = document.querySelector('.wordcount');

const savedText = localStorage.getItem('savedText') || '';
const savedWordCount = localStorage.getItem('savedWordCount') || 0;
let savedGoal = parseInt(localStorage.getItem('savedGoal')) || 0;

const dailyGoalInput = document.querySelector('#dailygoal');

const settingsBtn = document.querySelector('#settingsBtn');
const soundOption = document.querySelector('#typingSound');
const showWordCountOption = document.querySelector('#showCount');

const counterWrapper = document.querySelector('.counter-wrapper');



dailyGoalInput.addEventListener('change', updateDailyGoal);

const dailyGoalText = document.querySelector('.dailygoaltext');
if (localStorage.getItem('savedGoal')) {
    dailyGoalText.innerText = '/ ' + savedGoal;
    dailyGoalInput.value = savedGoal;
}

textEditor.innerText = savedText; 
wordCountDiv.innerText = savedWordCount;

let showSettings = false;

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
    console.log("goal", savedGoal);
    console.log("count",wordCount);
    if (wordCount === savedGoal) {
        if (!soundOption.checked) return;
        var fanfare = new Audio('sounds/eb_fanfare.wav');
        fanfare.play();
    }
}

function saveText(e) {
    const text = e.target.innerText;
    localStorage.setItem('savedText', text);
}

settingsBtn.addEventListener('click', toggleSettings);

function toggleSettings() {
    const settingsDiv = document.querySelector('.settings');
    showSettings = !showSettings;
    showSettings ? settingsDiv.style.display = 'block' : settingsDiv.style.display = 'none'; 
}

function updateDailyGoal(e) {
    savedGoal = parseInt(e.target.value);
    localStorage.setItem('savedGoal', savedGoal);
    dailyGoalText.innerText = "/ " + savedGoal;
}

textEditor.addEventListener('input', updateWordCount);
textEditor.addEventListener('input', saveText);
textEditor.addEventListener('input', playSound);

function playSound() {
    if (!soundOption.checked) return;
    var tick = new Audio('sounds/text.wav');
    tick.play();
}

showWordCountOption.addEventListener('change', toggleWordCount);

function toggleWordCount() {
    showWordCountOption.checked === true ? counterWrapper.style.display = 'block' : counterWrapper.style.display = 'none';
}

