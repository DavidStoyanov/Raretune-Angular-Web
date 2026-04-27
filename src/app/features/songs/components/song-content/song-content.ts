import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SongsApi } from '../../services';
import { Song } from '../../models';
import { UsersApi } from '../../../users/services';
import { MusicPlayer } from '../music-player/music-player';

@Component({
    selector: 'app-song-content',
    imports: [CommonModule, RouterLink, MusicPlayer],
    templateUrl: './song-content.html',
    styleUrl: './song-content.scss',
})
export class SongContent implements OnInit, AfterViewInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private songsApi = inject(SongsApi);
    private usersApi = inject(UsersApi);
    
    protected readonly isLoggedIn = this.usersApi.isLoggedIn;
    protected readonly getUser = this.usersApi.currentUser;
    
    private songId!: string;
    song: Song | null = null;
    isContentLoaded: boolean = false;
    isLiked: boolean = false;

    constructor() { }
    
    likeAction() {
        this.isLiked = !this.isLiked;
        switch(this.isLiked) {
            case true: this.likeSong(); return;
            case false: this.dislikeSong(); return;
            default: return;
        }
    }

    editSong() {
        this.router.navigateByUrl(`/song/${this.songId}/edit`);
    }

    deleteSong() {
        this.songsApi.delete(this.songId).subscribe({
            next: () => {
                this.router.navigateByUrl(`/song/catalog`);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    private likeSong() {
        this.songsApi.like(this.songId).subscribe({
            next: () => this.isLiked = true,
            error: (err) => { console.log(err); },
        }); 
    }

    private dislikeSong() {
        this.songsApi.dislike(this.songId).subscribe({
            next: () => this.isLiked = false,
            error: (err) => { console.log(err); },
        }); 
    }

    private setLikeState() {
        this.isLiked = this.song?.likedBy
            ?.includes(this.getUser()?.id as string) as boolean;
    }

    getSongUrl(): string {
        return (this.song?.songUrl) as string;
    }

    isOwner(): boolean {
        return this.song?.posterId === this.getUser()?.id
    } 

    ngOnInit(): void {
        this.songId = this.route.snapshot.paramMap.get('songId') as string;

        this.songsApi.getOne(this.songId).subscribe({
            next: (song) => {
                this.song = song;
                this.setLikeState();
                this.isContentLoaded = true;
            },
            error: (err) => { 
                console.log(err);
                this.router.navigateByUrl('/song/catalog');
            },
        });
    }

    ngAfterViewInit(): void {
        //throw new Error('Method not implemented.');
    }
}



