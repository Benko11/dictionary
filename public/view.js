const wordItem = document.getElementById('word-item');
const wordMeaning = document.getElementById('word-meaning');
const wordSentence = document.getElementById('word-sentence');
const wordAll = document.getElementById('word-all');
const URL = 'https://bluom-dictionary.herokuapp.com/';

init();

function init() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (!params.hasOwnProperty('id')) {
        console.error('invalid ID');
        return;
    }

    const { id } = params;
    fetch(`${URL}/words/${id}`)
        .then((res) => res.json())
        .then(renderWord);
}

function renderWord(word) {
    const wordItemClone = wordItem.content.cloneNode(true);
    wordItemClone.querySelector('h1').textContent = word.name;

    for (let meaning of word.meanings) {
        const index = word.meanings.indexOf(meaning) + 1;
        const wordMeaningClone = wordMeaning.content.cloneNode(true);
        wordMeaningClone.querySelector('.order').textContent = index;
        wordMeaningClone.querySelector('.meaning').textContent =
            meaning.meaning;

        for (let sentence of meaning.sentences) {
            const wordSentenceClone = wordSentence.content.cloneNode(true);
            wordSentenceClone.querySelector('p').textContent = sentence;
            wordMeaningClone
                .querySelector('.sentences')
                .appendChild(wordSentenceClone);
        }

        wordItemClone.querySelector('.meanings').appendChild(wordMeaningClone);
    }

    wordAll.appendChild(wordItemClone);
}
