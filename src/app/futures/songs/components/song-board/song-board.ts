import { Component } from '@angular/core';

import { SongItem } from '../../components/song-item/song-item'; //??? Cant import it from index.ts
import { Song } from '../../models';
import { SongsApi } from '../../services';

@Component({
    selector: 'app-song-board',
    imports: [SongItem],
    templateUrl: './song-board.html',
    styleUrl: './song-board.scss'
})
export class SongBoard {
    songs: Song[] = [];

    constructor(private songsApis: SongsApi) {
        this.songs = this.songsApis.getSongs();
    }

}
