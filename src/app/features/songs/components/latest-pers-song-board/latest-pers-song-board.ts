import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LatestPersSongCard } from "../latest-pers-song-card/latest-pers-song-card";
import { SongsApi } from '../../services';
import { Criteria } from '../../../../core/models';
import { Song } from '../../models';

@Component({
    selector: 'app-latest-pers-song-board',
    imports: [LatestPersSongCard],
    templateUrl: './latest-pers-song-board.html',
    styleUrl: './latest-pers-song-board.scss',
})
export class LatestPersSongBoard implements OnInit {
    private router = inject(Router);
    
    private songsApi = inject(SongsApi);

    likeCount: number = 0;
    postCount: number = 0;
    likedSongs!: Song[];
    postedSongs!: Song[];

    ngOnInit(): void {
        this.songsApi.getCountForSongs(Criteria.Liked).subscribe(x => this.likeCount = x );
        this.songsApi.getCountForSongs(Criteria.Posted).subscribe(x => this.postCount = x);
        this.songsApi.getLatestThreeSongs(Criteria.Liked).subscribe(x => this.likedSongs = x);
        this.songsApi.getLatestThreeSongs(Criteria.Posted).subscribe(x => this.postedSongs = x);
    }
}
