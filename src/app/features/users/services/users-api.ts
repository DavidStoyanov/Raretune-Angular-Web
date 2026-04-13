import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { User, UserLoginDto, UserRegisterDto } from '../models';

@Injectable({
    providedIn: 'root',
})
export class UsersApi {
    private apiUrl = 'http://localhost:3000/users'
    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor(private httpClient: HttpClient) {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            const user: User = JSON.parse(savedUser);
            this.setLoggedUser(user);
        }
    }


    login(userLoginDto: UserLoginDto): Observable<User|null> {
        return this.httpClient.post<User>(`${this.apiUrl}/login`, userLoginDto, {
            withCredentials: true
        }).pipe(
            tap(user => this.setSession(user)),
            catchError(error => of(null))
        );
    }

    register(registerDto: UserRegisterDto): Observable<User|null> {
        return this.httpClient.post<User>(`${this.apiUrl}/register`, registerDto, {
            withCredentials: true
        }).pipe(
            tap(user => this.setSession(user)),
            catchError(error => of(null))
        );
    }

    logout(): Observable<boolean> {
        return this.httpClient.post<void>(`${this.apiUrl}/logout`, {}, {
            withCredentials: true,
            observe: 'response'
        }).pipe(
            tap((response) => { if(response.status === 204) this.invalidateSession() } ),
            map(response => response.status === 204),
            catchError(() => of(false))
        );
    }

    get currentUserId(): string | null {
        return this._currentUser()?.id || null;
    }

    private setLoggedUser(user: User): void {
        this._currentUser.set(user);
        this._isLoggedIn.set(true);
    }

    private setSession(user: User): void {
        this.setLoggedUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    private invalidateSession(): void {
        this._currentUser.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('currentUser');
    }
}
