// Voice Navigation Service
class VoiceNavigationService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.enabled = localStorage.getItem('voiceNavigation') === 'true';
    this.voice = null;
    this.initVoice();
  }

  initVoice() {
    if (!this.synthesis) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Wait for voices to load
    const setVoice = () => {
      const voices = this.synthesis.getVoices();
      // Prefer English voices
      this.voice = voices.find(v => v.lang.startsWith('en')) || voices[0];
    };

    if (this.synthesis.getVoices().length) {
      setVoice();
    } else {
      this.synthesis.onvoiceschanged = setVoice;
    }
  }

  isEnabled() {
    return this.enabled && this.synthesis;
  }

  enable() {
    this.enabled = true;
    localStorage.setItem('voiceNavigation', 'true');
  }

  disable() {
    this.enabled = false;
    localStorage.setItem('voiceNavigation', 'false');
    this.synthesis.cancel(); // Stop any ongoing speech
  }

  speak(text, options = {}) {
    if (!this.isEnabled()) return;

    // Cancel any ongoing speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.voice;
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    this.synthesis.speak(utterance);
  }

  announceDirection(instruction, distance) {
    if (!this.isEnabled()) return;

    let announcement = '';
    
    if (distance < 50) {
      announcement = `Now ${instruction}`;
    } else if (distance < 200) {
      announcement = `In ${Math.round(distance)} meters, ${instruction}`;
    } else if (distance < 1000) {
      announcement = `In ${Math.round(distance / 100) * 100} meters, ${instruction}`;
    } else {
      announcement = `In ${(distance / 1000).toFixed(1)} kilometers, ${instruction}`;
    }

    this.speak(announcement);
  }

  announceAnomaly(anomalyType, distance) {
    if (!this.isEnabled()) return;

    let announcement = '';
    const distanceText = distance < 1000 
      ? `${Math.round(distance)} meters` 
      : `${(distance / 1000).toFixed(1)} kilometers`;

    switch (anomalyType.toLowerCase()) {
      case 'pothole':
        announcement = `Warning! Pothole ahead in ${distanceText}. Drive carefully.`;
        break;
      case 'speed bump':
        announcement = `Speed bump ahead in ${distanceText}. Slow down.`;
        break;
      case 'cracked surface':
        announcement = `Road surface damaged ahead in ${distanceText}. Reduce speed.`;
        break;
      case 'smooth road':
        announcement = `Good news! Smooth road ahead for ${distanceText}.`;
        break;
      default:
        announcement = `Road anomaly ahead in ${distanceText}. Drive with caution.`;
    }

    this.speak(announcement);
  }

  announceJourneyStart(origin, destination) {
    if (!this.isEnabled()) return;
    this.speak(`Starting journey from ${origin} to ${destination}. Drive safely.`);
  }

  announceJourneyComplete(duration) {
    if (!this.isEnabled()) return;
    const minutes = Math.round(duration);
    this.speak(`You have arrived at your destination. Journey time: ${minutes} minutes. Thank you for using Smart Route.`);
  }

  announceEmergency() {
    if (!this.isEnabled()) return;
    this.speak('Emergency SOS activated. Notifying nearby users and authorities.', {
      rate: 1.1,
      volume: 1,
    });
  }

  announceWeatherWarning(condition) {
    if (!this.isEnabled()) return;
    this.speak(`Weather alert: ${condition}. Drive with extra caution.`);
  }

  test() {
    this.speak('Voice navigation is now active. You will receive turn-by-turn directions and road anomaly warnings.');
  }
}

// Create singleton instance
const voiceNavigation = new VoiceNavigationService();

export default voiceNavigation;
