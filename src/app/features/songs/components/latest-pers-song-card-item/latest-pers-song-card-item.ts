import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';

import { Song } from '../../models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-latest-pers-song-card-item',
    imports: [],
    templateUrl: './latest-pers-song-card-item.html',
    styleUrl: './latest-pers-song-card-item.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LatestPersSongCardItem {
    private router = inject(Router);
    @Input("songItem") song!: Song;

    visitDetails() {
        this.router.navigateByUrl(`/song/${this.song.id}`);
    }
}
