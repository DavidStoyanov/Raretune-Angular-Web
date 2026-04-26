import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LatestPersSongCardItem } from "../latest-pers-song-card-item/latest-pers-song-card-item";
import { Song } from '../../models';

@Component({
    selector: 'app-latest-pers-song-card',
    imports: [LatestPersSongCardItem, CommonModule],
    templateUrl: './latest-pers-song-card.html',
    styleUrl: './latest-pers-song-card.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LatestPersSongCard {
    @Input() criteria!: string; 
    @Input() count: number = 0;
    @Input() songs!: Song[];

    protected getTitle(): string {
        switch (this.criteria) {
            case 'likes': return "Favorite songs:";
            case 'posts': return "Posted songs:";
            default: return "please contact support if you see this";
            //todo: error msg emitter ^
        }
    }
}
