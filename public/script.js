const URL = 'https://bluom-dictionary.herokuapp.com/';

const wordsEl = document.querySelector('.words');
const wordItem = document.getElementById('word-item');

fetch(`${URL}/words`)
    .then((res) => res.json())
    .then(renderWords);

function renderWords(words) {
    for (let word of words) {
        const clone = wordItem.content.cloneNode(true);
        clone
            .querySelector('a')
            .setAttribute('href', `/view.html?id=${word._id}`);
        clone.querySelector('h2').textContent = word.name;
        wordsEl.appendChild(clone);
    }
}
