import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { SongsApi, SongLikesApi } from '../../services';
import { FavSong, SongLike } from '../../models';
import { FavoriteItem } from '../favorite-item/favorite-item';

@Component({
    selector: 'app-favorite-board',
    imports: [FavoriteItem, CommonModule],
    templateUrl: './favorite-board.html',
    styleUrl: './favorite-board.scss',
})
export class FavoriteBoard implements OnInit {
    private songsApi = inject(SongsApi);
    private songLikesApi = inject(SongLikesApi);

    private favoritesSubject = new BehaviorSubject<FavSong[]>([]);

    favorites$ = this.favoritesSubject.asObservable();
    isEmpty$!: Observable<boolean>;
    likeDateMap!: Map<string,string>;

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
        this.songsApi.getFavoriteSongs().subscribe((favs: FavSong[]) => {

            this.songLikesApi.getAll(favs.map(f => f.id)).subscribe((songLikes: SongLike[]) => {
                this.likeDateMap = new Map(
                    songLikes.map(like => [like.songId, like.likedAt])
                );

                const favResult: FavSong[] = favs.map(fav => ({
                    ...fav,
                    likedAt: this.likeDateMap.get(fav.id) || null
                })) as FavSong[];

                this.favoritesSubject.next(favResult);
            })
        });

        this.isEmpty$ = this.favorites$.pipe(
            //tap(favs => console.log('Favorites count:', favs.length)),
            map(favs => favs.length === 0)
        );
    }
}
