import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class RedirectService {
    private redirectUrl: string | null = null;

    setRedirect(url: string | null) {
        this.redirectUrl = url;
    }

    getRedirect(): string | null {
        return this.redirectUrl;
    }

    clear() {
        this.redirectUrl = null;
    }
}
