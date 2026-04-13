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

    onClick() {
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
