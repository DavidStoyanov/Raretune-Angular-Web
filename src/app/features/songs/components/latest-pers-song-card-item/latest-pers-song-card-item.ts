import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';

import { TruncatePipe } from '../../../../core/pipes';
import { Song } from '../../models';

@Component({
    selector: 'app-latest-pers-song-card-item',
    imports: [TruncatePipe],
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
