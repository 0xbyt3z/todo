import { OidcService } from './oidc/oidc.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    readonly oidcService: OidcService;
    readonly authService: AuthService;
    constructor(oidcService: OidcService, authService: AuthService);
    simpleGet(): string;
    getjwks(req: any): import("rxjs").Observable<any>;
}
