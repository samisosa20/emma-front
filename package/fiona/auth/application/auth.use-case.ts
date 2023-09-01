import type { AuthAdapter } from '../domain/auth.adapter';
import type { Login } from "../domain/auth.d";
import type { AuthRepository } from '../domain/auth.repository';

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