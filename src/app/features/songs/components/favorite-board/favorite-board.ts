import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { SongsApi } from '../../services';
import { Song } from '../../models';
import { FavoriteItem } from '../favorite-item/favorite-item';

@Component({
    selector: 'app-favorite-board',
    imports: [FavoriteItem, CommonModule],
    templateUrl: './favorite-board.html',
    styleUrl: './favorite-board.scss',
})
export class FavoriteBoard implements OnInit {
    private songsApi = inject(SongsApi);

    private favoritesSubject = new BehaviorSubject<Song[]>([]);

    favorites$ = this.favoritesSubject.asObservable();
    isEmpty$!: Observable<boolean>;

    dislike(songId: string) {
        this.songsApi.dislike(songId).subscribe({
            next: () => {
                const current = this.favoritesSubject.value;
                const updated = current.filter(song => song.id !== songId);
                this.favoritesSubject.next(updated);
            },
            error: (err) => { console.log(err) },
        })
    }

    ngOnInit(): void {
        this.songsApi.getFavoriteSongs().subscribe(favs => {
            this.favoritesSubject.next(favs);
        });

        this.isEmpty$ = this.favorites$.pipe(
            //tap(favs => console.log('Favorites count:', favs.length)),
            map(favs => favs.length === 0)
        );
    }
}
