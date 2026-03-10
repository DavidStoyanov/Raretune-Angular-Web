import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SongsApi } from '../../services';
import { Song } from '../../models';

@Component({
    selector: 'app-song-content',
    imports: [],
    templateUrl: './song-content.html',
    styleUrl: './song-content.scss',
})
export class SongContent implements OnInit {
    private route = inject(ActivatedRoute);
    private songsApi = inject(SongsApi);

    song: Song | null = null;

    constructor() { }

    ngOnInit(): void {
        const songId = this.route.snapshot.paramMap.get('songId');
        if (songId === null) return;

        this.songsApi.getOne(songId).subscribe({
            next: (song) => { this.song = song },
            error: (err) => { console.log(err) },
        });
    }
}



