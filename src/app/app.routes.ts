import { Routes } from '@angular/router';

import { SongBoard, SongContent, SongCreate, SongEdit } from './features/songs/components';
import { Login, Register, Profile } from './features/users/components';
import { About, Faq } from './pages';

export const routes: Routes = [
    { path: 'auth/login', component: Login },
    { path: 'auth/register', component: Register },
    { path: 'user/profile', component: Profile },
    { path: 'song/new', component: SongCreate },
    { path: 'song/catalog', component: SongBoard },
    { path: 'song/:songId', component: SongContent },
    { path: 'song/:songId/edit', component: SongEdit },
    { path: 'about', component: About },
    { path: 'faq', component: Faq },
];
