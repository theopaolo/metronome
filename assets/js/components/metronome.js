// metronome.js
import { SoundGenerator } from './soundGenerator.js';

export class Metronome {
    constructor(bpm, soundOptions = {}) {
        this.bpm = bpm;
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.soundGenerator = new SoundGenerator(this.audioContext, soundOptions);
        this.intervalId = null;
    }

    startSound() {
        this.audioContext.resume().then(() => {
            this.soundGenerator.playSound(); // play initial sound pour confirmer que ça marche
            this.intervalId = setInterval(
                this.soundGenerator.playSound.bind(this.soundGenerator),
                (60 / this.bpm) * 1000 // convertir BPM à milliseconds
            );
        });
    }

    stopSound() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}