import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-notification',
    imports: [],
    templateUrl: './notification.html',
    styleUrl: './notification.scss',
})
export class Notification {
    @Input() text!: string;
}
