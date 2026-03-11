import { Component } from '@angular/core';

import { Song } from '../../models';
import { SongsApi } from '../../services';

@Component({
    selector: 'app-new-song',
    imports: [],
    templateUrl: './new-song.html',
    styleUrl: './new-song.scss',
})
export class NewSong {
    songsApis: SongsApi;

    constructor(private songsApi: SongsApi) {
        this.songsApis = songsApi;
    }

    addSong() {
        this.songsApi.addSong({
            name: 'random song',
            description: 'random desc'
        } as Song)
    }
}
