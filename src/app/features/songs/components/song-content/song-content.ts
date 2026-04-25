import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SongsApi } from '../../services';
import { Song } from '../../models';
import { UsersApi } from '../../../users/services';

@Component({
    selector: 'app-song-content',
    imports: [CommonModule],
    templateUrl: './song-content.html',
    styleUrl: './song-content.scss',
})
export class SongContent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private songsApi = inject(SongsApi);
    private usersApi = inject(UsersApi);
    
    protected readonly isLoggedIn = this.usersApi.isLoggedIn;
    protected readonly getUser = this.usersApi.currentUser;
    
    private songId!: string;
    song: Song | null = null;

    constructor() { }

    likeSong() {
        this.songsApi.like(this.songId).subscribe(); //todo: on next() switch button ot dislike
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

    ngOnInit(): void {
        this.songId = this.route.snapshot.paramMap.get('songId') as string;

        this.songsApi.getOne(this.songId).subscribe({
            next: (song) => { this.song = song },
            error: (err) => { 
                console.log(err);
                this.router.navigateByUrl('/song/catalog');
            },
        });
    }
}



