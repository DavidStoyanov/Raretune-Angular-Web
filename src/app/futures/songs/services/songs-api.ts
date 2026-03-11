import { Injectable } from '@angular/core';

import { Song } from '../models';

@Injectable({
    providedIn: 'root',
})
export class SongsApi {
    songs: Song[] = [];

    constructor() {
        this.feedSongs();
    }

    feedSongs() {
        this.songs.push(
            {
                name: 'song1',
                description: 'Nice song',
                creator: 'Me',
                date: '1993-03',
                origin: 'Australia'
            },
            {
                name: 'song2',
                description: 'Song made with guitar',
                creator: 'BestMusician',
                date: '1993-04',
                origin: 'Australia, Sidney'
            },
        )
    }

    getSongs(): Song[] {
        return this.songs;
    }

    addSong(song: Song): void {
        this.songs.push(song);
    }
}
