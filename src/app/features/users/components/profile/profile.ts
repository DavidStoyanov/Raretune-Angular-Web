import { Component, inject } from '@angular/core';

import { UsersApi } from '../../services';
import { LatestProfileSong } from '../../../songs/components';

@Component({
    selector: 'app-profile',
    imports: [LatestProfileSong],
    templateUrl: './profile.html',
    styleUrl: './profile.scss',
})
export class Profile {
    private usersApi = inject(UsersApi);

    protected readonly getUser = this.usersApi.currentUser;

    protected likeCount: number = 44;
    protected postCount: number = 5;
    protected likedSongs: number[] = [1,2,3];
    protected postedSongs: number[] = [1,2];
}
