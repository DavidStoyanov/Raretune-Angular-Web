import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-music-player',
    imports: [CommonModule],
    templateUrl: './music-player.html',
    styleUrl: './music-player.scss',
})
export class MusicPlayer {
    @Input("url") songUrl!: string;
    @ViewChild('audio', { static: true }) audioRef!: ElementRef<HTMLAudioElement>;

    isPlaying = false;
    isRepeat = false;
    currentTime = 0;
    duration = 0;
    volume = 1;

    ngAfterViewInit() {
        const audio = this.audioRef.nativeElement;

        audio.addEventListener('loadedmetadata', () => {
            this.duration = audio.duration;
        });

        audio.addEventListener('timeupdate', () => {
            this.currentTime = audio.currentTime;
        });

        audio.addEventListener('ended', () => {
            if (this.isRepeat) {
                audio.currentTime = 0;
                audio.play();
            } else {
                this.isPlaying = false;
            }
        });
    }

    togglePlay() {
        const audio = this.audioRef.nativeElement;

        if (this.isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }

        this.isPlaying = !this.isPlaying;
    }

    stop() {
        const audio = this.audioRef.nativeElement;
        audio.pause();
        audio.currentTime = 0;
        this.isPlaying = false;
    }

    toggleRepeat() {
        this.isRepeat = !this.isRepeat;
    }

    onSeek(event: Event) {
        const value = Number((event.target as HTMLInputElement).value);
        this.audioRef.nativeElement.currentTime = value;
    }

    onVolume(event: Event) {
        const value = Number((event.target as HTMLInputElement).value);
        this.volume = value;
        this.audioRef.nativeElement.volume = value;
    }

    formatTime(sec: number): string {
        if (!sec) return '0:00';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }
}
