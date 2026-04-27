import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { UsersApi } from '../../../features/users/services';
import { RedirectService } from '../../services';

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(UsersApi);
    const router = inject(Router);

    const redirectService = inject(RedirectService);

    if (authService.isLoggedIn()) {
        return true;
    }

    const redirectUrl = state.url;
    redirectService.setRedirect(redirectUrl);

    return router.navigate(
        ['/auth', 'login'],
        // {   queryParams: { redirect: redirectUrl} }
    );
};