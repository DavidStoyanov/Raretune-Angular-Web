import { Component, Input } from '@angular/core';
import { LatestPersSongCardItem } from "../latest-pers-song-card-item/latest-pers-song-card-item";

@Component({
    selector: 'app-latest-pers-song-card',
    imports: [LatestPersSongCardItem],
    templateUrl: './latest-pers-song-card.html',
    styleUrl: './latest-pers-song-card.scss',
})
export class LatestPersSongCard {
    @Input() criteria!: string; 
    @Input() count: number = 10;
    @Input() songs: number[] = [1,2,3];

    protected getTitle(): string {
        switch (this.criteria) {
            case 'likes': return "Favorite songs:";
            case 'posts': return "Posted songs:";
            default: return "please contact support if you see this";
        }
    }
}
