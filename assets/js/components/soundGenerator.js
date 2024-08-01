// soundGenerator.js
export class SoundGenerator {
    constructor(audioContext, options = {}) {
        this.audioContext = audioContext;
        this.oscillators = options.oscillators || [
            { frequency: 220, waveType: 'sine' },
            { frequency: 330, waveType: 'sine' }
        ];
        this.filterFrequency = options.filterFrequency || 300;
        this.filterQ = options.filterQ || 15;
        this.delayTime = options.delayTime || 0.5;
        this.feedbackGain = options.feedbackGain || 0.6;
        this.gainValue = options.gain || 0.5;
    }

    playSound() {
        const gainNode = this.audioContext.createGain();
        const biquadFilter = this.audioContext.createBiquadFilter();
        const delay = this.audioContext.createDelay();
        const feedback = this.audioContext.createGain();

        // Set gain value ( le volume )
        gainNode.gain.value = this.gainValue;

        // Biquad filter settings for resonance
        biquadFilter.type = 'bandpass';
        biquadFilter.frequency.value = this.filterFrequency;
        biquadFilter.Q.value = this.filterQ;

        // Delay settings for echo
        delay.delayTime.value = this.delayTime;
        feedback.gain.value = this.feedbackGain;

        // Connect filter and gain nodes
        biquadFilter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        gainNode.connect(delay);
        delay.connect(feedback);
        feedback.connect(gainNode); // Create feedback loop for echo effect

        // Create and connect oscillators
        this.oscillators.forEach(oscConfig => {
            const oscillator = this.audioContext.createOscillator();
            oscillator.frequency.value = oscConfig.frequency;
            oscillator.type = oscConfig.waveType;

            oscillator.connect(biquadFilter);
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 1); // play sound for 1 second
        });
    }
}