import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { SongLike } from "../models";

@Injectable({
    providedIn: 'root',
})
export class SongLikesApi {
    private apiUrl = 'http://localhost:3000/songs';

    constructor(private httpClient: HttpClient) {}

    getAll(songs: string[]): Observable<SongLike[]> {
        return this.httpClient.post<SongLike[]>(`${this.apiUrl}/songlikes`, songs, { withCredentials: true });
    }
}