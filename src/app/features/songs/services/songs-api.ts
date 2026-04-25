import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { CreateSongDto, EditSongDto, Song } from '../models';
import { Criteria } from '../../../core/models';

@Injectable({
    providedIn: 'root',
})
export class SongsApi {
    private apiUrl = 'http://localhost:3000/songs';

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<Song[]> {
        return this.httpClient.get<Song[]>(this.apiUrl);
    }

    getOne(songId: string): Observable<Song> {
        return this.httpClient.get<Song>(`${this.apiUrl}/${songId}`);
    }

    create(newSong: CreateSongDto): Observable<Song> {
        return this.httpClient.post<Song>(`${this.apiUrl}`, newSong, { withCredentials: true });
    }

    update(song: EditSongDto, songId: string): Observable<Song> {
        return this.httpClient.put<Song>(`${this.apiUrl}/${songId}`, song, { withCredentials: true });
    }

    delete(songId: string): Observable<boolean> {
        return this.httpClient.delete<boolean>(`${this.apiUrl}/${songId}`, { withCredentials: true });
    }

    like(songId: string): Observable<void> {
        return this.httpClient.post<void>(`${this.apiUrl}/${songId}/like`, {}, { withCredentials: true });
    }

    dislike(songId: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/${songId}/like`,{ withCredentials: true });
    }
    
    getCountForSongs(criteria: Criteria): Observable<number> {
        return this.httpClient.get<number>(`${this.apiUrl}/count?criteria=${criteria}`, { withCredentials: true });
    }

    getLatestThreeSongs(criteria: Criteria): Observable<Song[]> {
        return this.httpClient.get<Song[]>(`${this.apiUrl}/three?criteria=${criteria}`, { withCredentials: true });
    }
    
}

/* 

{
    id: '1',
    name: 'song1',
    description: 'Nice song',
    creator: 'Me',
    date: '1993-03',
    origin: 'Australia'
},
{
    id: '2',
    name: 'song2',
    description: 'Song made with guitar',
    creator: 'BestMusician',
    date: '1993-04',
    origin: 'Australia, Sidney'
},


*/