import { Observable } from 'rxjs';
import { Component } from '@angular/core';

import { SongItem } from '../song-item/song-item'; //??? Cant import it from index.ts
import { Song } from '../../models';
import { SongsApi } from '../../services';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-song-board',
    imports: [CommonModule, SongItem],
    templateUrl: './song-board.html',
    styleUrl: './song-board.scss'
})
export class SongBoard {
    songs$: Observable<Song[]>;

    constructor(private songsApi: SongsApi) {
        this.songs$ = this.songsApi.getAll();
    }

}
