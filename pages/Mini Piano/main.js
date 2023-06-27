console.log('hello')

const pianoKeys = document.querySelectorAll(".piano-keys .key");

pianoKeys.forEach(key => {
    key.addEventListener("click", () => playTune(key.dataset.key));
})