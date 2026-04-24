import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-latest-profile-song-item',
    imports: [],
    templateUrl: './latest-profile-song-item.html',
    styleUrl: './latest-profile-song-item.scss',
})
export class LatestProfileSongItem {
    @Input() index!: number; 
}
