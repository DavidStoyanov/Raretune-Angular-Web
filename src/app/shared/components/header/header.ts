import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { Logout } from '../../../features/users/components';
import { UsersApi } from '../../../features/users/services';

@Component({
    selector: 'app-header',
    imports: [Logout, RouterModule],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {
    private router = inject(Router);
    private usersApi = inject(UsersApi);

    protected readonly isLoggedIn = this.usersApi.isLoggedIn;
    protected readonly getUser = this.usersApi.currentUser;

    onLogin() {
        this.router.navigateByUrl('/auth/login');
    }
    
    onRegister() {
        this.router.navigateByUrl('/auth/register');
    }
}
