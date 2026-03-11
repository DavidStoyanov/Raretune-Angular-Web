import { Routes } from '@angular/router';

import { NewSong, SongBoard } from './futures/songs/components';

export const routes: Routes = [
    { path: 'song/new', component: NewSong },
    { path: 'song/catalog', component: SongBoard },
];
