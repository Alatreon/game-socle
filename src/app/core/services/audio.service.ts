import { Injectable } from '@angular/core';
import { GameService } from './game.service';

export type SoundEffect = 'click' | 'success' | 'error' | 'levelComplete';
export type MusicTrack = 'menu' | 'game';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private sounds: Map<SoundEffect, HTMLAudioElement> = new Map();
  private music: Map<MusicTrack, HTMLAudioElement> = new Map();
  private currentMusic: HTMLAudioElement | null = null;

  constructor(private gameService: GameService) { }

  async init(): Promise<void> {
    // Précharge les effets sonores
    this.preloadSound('click', 'assets/audio/click.mp3');
    this.preloadSound('success', 'assets/audio/success.mp3');
    this.preloadSound('error', 'assets/audio/error.mp3');
    this.preloadSound('levelComplete', 'assets/audio/level-complete.mp3');

    // Précharge les musiques
    this.preloadMusic('menu', 'assets/audio/music-menu.mp3');
    this.preloadMusic('game', 'assets/audio/music-game.mp3');
  }

  private preloadSound(name: SoundEffect, path: string): void {
    const audio = new Audio(path);
    audio.preload = 'auto';
    this.sounds.set(name, audio);
  }

  private preloadMusic(name: MusicTrack, path: string): void {
    const audio = new Audio(path);
    audio.preload = 'auto';
    audio.loop = true;
    this.music.set(name, audio);
  }

  // ===== SOUND EFFECTS =====

  playSound(name: SoundEffect): void {
    const settings = this.gameService.getSettings();

    if (!settings.soundEnabled) {
      return;
    }

    const sound = this.sounds.get(name);

    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  // ===== MUSIC =====

  playMusic(name: MusicTrack): void {
    const settings = this.gameService.getSettings();
    if (!settings.musicEnabled) return;

    // Arrête la musique actuelle
    this.stopMusic();

    const music = this.music.get(name);
    if (music) {
      this.currentMusic = music;
      music.currentTime = 0;
      music.play().catch(() => {
        // Ignorer les erreurs
      });
    }
  }

  stopMusic(): void {
    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
      this.currentMusic = null;
    }
  }

  pauseMusic(): void {
    if (this.currentMusic) {
      this.currentMusic.pause();
    }
  }

  resumeMusic(): void {
    const settings = this.gameService.getSettings();
    if (!settings.musicEnabled) return;

    if (this.currentMusic) {
      this.currentMusic.play().catch(() => { });
    }
  }

  // ===== SETTINGS =====

  onSoundSettingChanged(enabled: boolean): void {
    // Rien à faire, le check se fait dans playSound()
  }

  onMusicSettingChanged(enabled: boolean): void {
    if (!enabled) {
      this.stopMusic();
    }
  }
}