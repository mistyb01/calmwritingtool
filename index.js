const textEditor = document.querySelector('.text');
const wordCountDiv = document.querySelector('.wordcount');

const savedText = localStorage.getItem('savedText') || '';
const savedWordCount = localStorage.getItem('savedWordCount') || 0;

textEditor.innerText = savedText; 
wordCountDiv.innerText = savedWordCount + " words";


function getWordCount(string) {
    //let array = string.trim().split(" ");
    let word_count = string.trim().split(/\s+/);
    console.log(word_count);

    //dumb edgecase
    if (word_count.length === 1 && word_count[0] === '') {
        return 0;
    }
    return word_count.length;
}

function updateWordCount(e) {
    const wordCount = getWordCount(e.target.innerText);
    console.log(e.target.innerText);

    wordCountDiv.innerText = wordCount + " words";
    localStorage.setItem('savedWordCount', wordCount);
}

function saveText(e) {
    const text = e.target.innerText;
    localStorage.setItem('savedText', text);
}


textEditor.addEventListener('input', updateWordCount);
textEditor.addEventListener('input', saveText);

