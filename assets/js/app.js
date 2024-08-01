const line1 = document.querySelector('.line1');
const line2 = document.querySelector('.line2');
const line3 = document.querySelector('.line3');
const btnGenerate = document.querySelector('.btn-generate');

let fiveSyllables = [];
let sevenSyllables = [];
let usedFiveSyllabes = [];
let usedSevenSyllables = [];

function pickRandom(arr, usedArr) {
    if (arr.length === 0) {
        arr.push(...usedArr);
        usedArr.length = 0;
    }
    const index = Math.floor(Math.random() * arr.length);
    const chosen = arr[index];
    arr.splice(index, 1);
    usedArr.push(chosen);
    return chosen;
}

function generateHaiku(){
    line1.textContent = pickRandom(fiveSyllables, usedFiveSyllabes);
    line2.textContent = pickRandom(sevenSyllables, usedSevenSyllables);
    line3.textContent = pickRandom(fiveSyllables, usedFiveSyllabes);
}

generateHaiku();

async function getFiveSyllables() {
    try {
        const response = await fetch('./assets/js/haikus.json');
        const data = await response.json();

        for (let i = 0; i < data.phrases.fiveSyllables.length; i++){
            fiveSyllables.push(data.phrases.fiveSyllables[i]);
        }
    }
    catch(error) {
        console.log(error);
    }
}

async function getSevenSyllables() {
    try {
        const response = await fetch('./assets/js/haikus.json');
        const data = await response.json();

        for (let i = 0; i < data.phrases.sevenSyllables.length; i++){
            sevenSyllables.push(data.phrases.sevenSyllables[i]);
        }
    }
    catch(error) {
        console.log(error);
    }
}

btnGenerate.addEventListener('click', generateHaiku);

let intervalId = null;

window.addEventListener('click', (e) => {
    if(e.target.classList.contains("play")) {
       intervalId = setInterval(
            generateHaiku,
            (60 / 9.85) * 1000
        )
    }

    if(e.target.classList.contains("stop")) {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
     }
})

async function initializeHaiku() {
    await getFiveSyllables();
    await getSevenSyllables();
    generateHaiku();
}

initializeHaiku();