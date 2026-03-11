import { Component, Input } from '@angular/core';

import { Song } from '../../models';

@Component({
    selector: 'app-song-item',
    imports: [],
    templateUrl: './song-item.html',
    styleUrl: './song-item.scss',
})
export class SongItem {
    @Input("songItem") song!: Song;
}
