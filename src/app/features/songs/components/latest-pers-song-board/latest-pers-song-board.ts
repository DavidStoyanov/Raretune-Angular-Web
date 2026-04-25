import { Component } from '@angular/core';
import { LatestPersSongCard } from "../latest-pers-song-card/latest-pers-song-card";

@Component({
    selector: 'app-latest-pers-song-board',
    imports: [LatestPersSongCard],
    templateUrl: './latest-pers-song-board.html',
    styleUrl: './latest-pers-song-board.scss',
})
export class LatestPersSongBoard {
    protected likeCount: number = 44;
    protected postCount: number = 5;
    protected likedSongs: number[] = [1,2,3];
    protected postedSongs: number[] = [1,2];
}
