import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { UsersApi } from '../../services';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
})
export class Logout {
    private router = inject(Router);
    private usersApi = inject(UsersApi);

    protected readonly isLoggedIn = this.usersApi.isLoggedIn;
    protected readonly getUser = this.usersApi.currentUser;

    onFavorites() {
        this.router.navigate(['/song/favorite']);
    }

    onProfile() {
        this.router.navigate(['/user/profile']);
    }

    onLogout() {
        this.usersApi.logout().subscribe({
            next: (response) => {
                response ?
                    this.router.navigate(['/song/catalog']) :
                    this.router.navigate(['/']) ;
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

}
