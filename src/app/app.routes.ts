import { Routes } from '@angular/router';

import { SongBoard, SongContent, SongCreate, SongEdit } from './features/songs/components';
import { Login, Register, Profile } from './features/users/components';
import { About, Faq, Home } from './pages';
import { AuthGuard, GuestGuard } from './core/guards';
import { NotFound } from './shared/components';

export const routes: Routes = [
    {
        path: 'auth/login',
        loadComponent: () => import('./features/users/components/login/login').then((c) => c.Login),
        canActivate: [GuestGuard],
        data: { title: 'Login'},
    },
    {
        path: 'auth/register',
        loadComponent: () => import('./features/users/components/register/register').then((c) => c.Register),
        canActivate: [GuestGuard],
        data: { title: 'Register'},
    },
    {
        path: 'user/profile',
        loadComponent: () => import('./features/users/components/profile/profile').then((c) => c.Profile),
        canActivate: [AuthGuard],
        data: { title: 'Profile'},
    },

    
    {
        path: 'song/catalog',
        component: SongBoard,
        data: { title: 'Catalog'},
    },
    {
        path: 'song/new',
        loadComponent: () => import('./features/songs/components/song-create/song-create').then((c) => c.SongCreate),
        canActivate: [AuthGuard],
        data: { title: 'New Song'},
    },
    {
        path: 'song/:songId',
        component: SongContent,
        data: { title: 'Content'},
    },
    {
        path: 'song/:songId/edit',
        loadComponent: () => import('./features/songs/components/song-edit/song-edit').then((c) => c.SongEdit),
        canActivate: [AuthGuard],
        data: { title: 'Edit Song'},
    },


    {
        path: '',
        component: Home,
        data: { title: 'Home'},
    },
    {
        path: 'about',
        component: About,
        data: { title: 'Register'},
    },
    {
        path: 'faq',
        component: Faq,
        data: { title: 'FAQ\'s'},
    },

    { 
        path: '**',
        component: NotFound,
        data: { title: 'Not Found'},
    },
];
