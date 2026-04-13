import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { Logout } from './features/users/components';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterModule, Logout],
    templateUrl: './app.html',
    styleUrl: './app.scss',
    standalone: true
})
export class App {
    protected readonly title = signal('raretune');
}
