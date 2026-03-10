import { Component, inject, Input } from '@angular/core';

import { Song } from '../../models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-song-item',
    imports: [],
    templateUrl: './song-item.html',
    styleUrl: './song-item.scss',
})
export class SongItem {
    private router = inject(Router);

    @Input("songItem") song!: Song;

    visitDetails(): void {
        const songDetailsUrl = `/song/${this.song.id}`;
        this.router.navigate([songDetailsUrl]);
    }
}
