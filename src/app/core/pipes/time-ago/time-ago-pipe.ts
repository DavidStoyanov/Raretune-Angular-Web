import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
    transform(value: string | Date): string {
        if (!value) return '';

        const date = new Date(value);
        const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

        const intervals: Record<string, number> = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };

        for (const [unit, sec] of Object.entries(intervals)) {
            const count = Math.floor(seconds / sec);
            if (count > 0) {
                return count === 1
                    ? `${count} ${unit} ago`
                    : `${count} ${unit}s ago`;
            }
        }

        return 'just now';
    }
}
