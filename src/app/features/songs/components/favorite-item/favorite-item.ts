import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { TimeAgoPipe, TruncatePipe } from '../../../../core/pipes';
import { FavSong } from '../../models';

@Component({
    selector: 'app-favorite-item',
    imports: [RouterLink, TruncatePipe, TimeAgoPipe],
    templateUrl: './favorite-item.html',
    styleUrl: './favorite-item.scss',
})
export class FavoriteItem {
    @Input("favItem") song!: FavSong;
    @Output("dislike") remove = new EventEmitter<string>();

    removeFavorite() {
        this.remove.emit(this.song.id);
    }
}
