import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { UsersApi } from '../../services';

@Component({
    selector: 'app-profile',
    imports: [],
    templateUrl: './profile.html',
    styleUrl: './profile.scss',
})
export class Profile {
    private router = inject(Router);
    private usersApi = inject(UsersApi);

    protected readonly getUser = this.usersApi.currentUser;
}
