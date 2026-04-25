import { Component, inject } from '@angular/core';

import { UsersApi } from '../../services';
import { LatestPersSongBoard } from '../../../songs/components';

@Component({
    selector: 'app-profile',
    imports: [LatestPersSongBoard],
    templateUrl: './profile.html',
    styleUrl: './profile.scss',
})
export class Profile {
    private usersApi = inject(UsersApi);

    protected readonly getUser = this.usersApi.currentUser;
}
