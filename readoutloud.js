import phonemize from "phonemizer";

class PhraseCycler {
    constructor({
        phrase,
        displayEl,
        buttonEl,
        intervalMs = 10000,
    }) {
        this.words = phrase.split(" ");
        this.index = 0;

        this.displayEl = displayEl;
        this.buttonEl = buttonEl;
        this.intervalMs = intervalMs;

        this.timer = null;

        this.render();
        this.startTimer();

        this.buttonEl.addEventListener("click", () => {
            this.advance();
            this.resetTimer();
        });
    }

    render() {
        this.displayEl.innerHTML = "";
        for (let i = 0; i < this.words.length; i++) {
            if (i === this.index) {
                this.displayEl.innerHTML += `<span> <strong>${this.words[i]}</strong> </span>`;
                continue;
            }
            this.displayEl.innerHTML += `<span> ${this.words[i]} </span>`;
        }
    }

    advance() {
        this.index = (this.index + 1) % this.words.length;
        this.render();
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.advance();
        }, this.intervalMs);
    }

    resetTimer() {
        clearInterval(this.timer);
        this.startTimer();
    }
}

// usage
new PhraseCycler({
    phrase: "Good pilots always check their instruments",
    displayEl: document.getElementById("word"),
    buttonEl: document.getElementById("next"),
    intervalMs: 10000,
});

const output = phonemize("hello world");

document.getElementById("out").textContent = JSON.stringify(
    output,
    null,
    2
);
