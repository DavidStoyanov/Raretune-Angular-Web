import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SongsApi } from '../../services';
import { Song } from '../../models';
import { SongItem } from '../song-item/song-item'; //??? Cant import it from index.ts

@Component({
    selector: 'app-song-board',
    imports: [CommonModule, RouterLink, SongItem],
    templateUrl: './song-board.html',
    styleUrl: './song-board.scss'
})
export class SongBoard implements OnInit {
    songs$: Observable<Song[]>;

    isCollectionEmpty$!: Observable<boolean>;

    constructor(private songsApi: SongsApi) {
        this.songs$ = this.songsApi.getAll();
    }

    ngOnInit(): void {
        this.isCollectionEmpty$ = this.songs$.pipe(
            map(songs => songs.length === 0)
        );
    }
}
