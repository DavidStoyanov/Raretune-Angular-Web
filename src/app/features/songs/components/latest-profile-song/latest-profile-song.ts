import { Component, Input } from '@angular/core';

import { LatestProfileSongItem } from '../latest-profile-song-item/latest-profile-song-item';

@Component({
    selector: 'app-latest-profile-song',
    imports: [LatestProfileSongItem],
    templateUrl: './latest-profile-song.html',
    styleUrl: './latest-profile-song.scss',
})
export class LatestProfileSong {
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



