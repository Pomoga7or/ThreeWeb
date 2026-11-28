import { SOUNDS } from '../data/soundConfig';

const MAX_MASTER_GAIN = 0.25;

class SoundEngine {
  constructor() {
    this.yardAudio = null;
    this.fireAudio = null;
    this.voiceAudio = null;
    this.masterVolume = 1;
    this.muted = false;
    this.isPlayingGame = false;
    this.isDialogueOpen = false;
    this.isTyping = false;
  }

  init() {
    if (typeof window === 'undefined' || this.yardAudio) return;

    this.yardAudio = this.createLoopAudio(SOUNDS?.yardAmbience?.src);
    this.fireAudio = this.createLoopAudio(SOUNDS?.fireCrackle?.src);
    this.voiceAudio = this.createLoopAudio(SOUNDS?.voiceMumble?.src);
  }

  createLoopAudio(src) {
    if (!src) return null;
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    audio.addEventListener('error', () => {});
    return audio;
  }

  computeGain(soundKey, contextMultiplier = 1) {
    if (this.muted) return 0;
    const baseVolume = SOUNDS?.[soundKey]?.volume ?? 0.5;
    if (baseVolume <= 0) return 0;

    const norm = Math.min(1, Math.max(0, Number(this.masterVolume) || 0));
    const curved = Math.pow(norm, 1.6);
    return Math.min(1, Math.max(0, curved * MAX_MASTER_GAIN * baseVolume * contextMultiplier));
  }

  syncState({ isPlaying, masterVolume, musicMuted, isDialogueOpen, isTyping }) {
    this.init();

    if (typeof masterVolume === 'number') this.masterVolume = masterVolume;
    if (typeof musicMuted === 'boolean') this.muted = musicMuted;
    if (typeof isPlaying === 'boolean') this.isPlayingGame = isPlaying;
    if (typeof isDialogueOpen === 'boolean') this.isDialogueOpen = isDialogueOpen;
    if (typeof isTyping === 'boolean') this.isTyping = isTyping;

    this.updateLoops();
  }

  safePlay(audio, targetVol) {
    if (!audio) return;
    audio.muted = targetVol === 0;
    audio.volume = targetVol;

    if (!this.isPlayingGame || this.muted || targetVol === 0) {
      audio.pause();
      return;
    }

    if (audio.paused) {
      audio.play().catch(() => {});
    }
  }

  updateLoops() {
    if (!this.yardAudio && !this.fireAudio && !this.voiceAudio) return;

    if (!this.isPlayingGame || this.muted) {
      this.yardAudio?.pause();
      this.fireAudio?.pause();
      this.voiceAudio?.pause();
      return;
    }

    const yardVol = this.computeGain('yardAmbience', this.isDialogueOpen ? 0.75 : 1);
    this.safePlay(this.yardAudio, yardVol);

    const fireVol = this.computeGain('fireCrackle', this.isDialogueOpen ? 1.2 : 1);
    this.safePlay(this.fireAudio, fireVol);

    if (this.isDialogueOpen && this.isTyping) {
      const voiceVol = this.computeGain('voiceMumble', 1);
      this.safePlay(this.voiceAudio, voiceVol);
    } else {
      this.voiceAudio?.pause();
    }
  }

  playOneShot(soundKey, contextMultiplier = 1) {
    const sound = SOUNDS?.[soundKey];
    if (!sound?.src || !this.isPlayingGame || this.muted || typeof window === 'undefined') return;

    const vol = this.computeGain(soundKey, contextMultiplier);
    if (vol <= 0) return;

    const sfx = new Audio(sound.src);
    sfx.volume = vol;
    sfx.addEventListener('error', () => {});
    sfx.play().catch(() => {});
  }

  playUiClick() {
    this.playOneShot('uiClick', 1);
  }

  playLocationSfx(locationId) {
    if (!locationId) {
      this.playUiClick();
      return;
    }

    if (locationId === 'stack') {
      this.playOneShot('tvHum', 1);
    } else if (locationId === 'contacts') {
      this.playOneShot('phoneTone', 1);
    } else if (locationId === 'minigame') {
      this.playOneShot('arcadeBlip', 1);
    } else {
      this.playUiClick();
    }
  }
}

export const soundEngine = new SoundEngine();