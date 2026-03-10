import { Routes } from '@angular/router';

import { SongBoard, SongContent, SongCreate, SongEdit } from './features/songs/components';

export const routes: Routes = [
    { path: 'song/new', component: SongCreate },
    { path: 'song/catalog', component: SongBoard },
    { path: 'song/:songId', component: SongContent },
    { path: 'song/:songId/edit', component: SongEdit },
];
