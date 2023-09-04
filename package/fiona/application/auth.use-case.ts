import type { AuthAdapter } from '../domain/auth/auth.adapter';
import type { Login } from "../domain/auth/auth.d";
import type { AuthRepository } from '../domain/auth/auth.repository';

class AuthUseCase implements AuthRepository {
    private authAdapter: AuthAdapter;

    constructor(_authAdapter: AuthAdapter) {
        this.authAdapter = _authAdapter
    }

    postLogin = ({ email, password }: Login) => {
        return this.authAdapter.postLogin({ email, password });
    }
}

export { AuthUseCase }