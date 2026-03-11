import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { asapScheduler } from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterModule],
    templateUrl: './app.html',
    styleUrl: './app.scss',
    standalone: true
})
export class App {
    protected readonly title = signal('raretune');
}
