import type { AuthAdapter } from '../domain/auth/auth.adapter';
import type { Login, ParamsProfile, Register, ForgotPassword } from "../domain/auth/auth.d";
import type { AuthRepository } from '../domain/auth/auth.repository';

class AuthUseCase implements AuthRepository {
    private authAdapter: AuthAdapter;

    constructor(_authAdapter: AuthAdapter) {
        this.authAdapter = _authAdapter
    }

    postLogin = ({ email, password }: Login) => {
        return this.authAdapter.postLogin({ email, password });
    }
    postRegister = (data: Register) => {
        return this.authAdapter.postRegister(data);
    }
    getCurrency = () => {
        return this.authAdapter.getCurrency();
    }
    getProfile = () => {
        return this.authAdapter.getProfile();
    }
    updateProfile = (id: number, data: ParamsProfile) => {
        return this.authAdapter.updateProfile(id, data);
    }
    recoveryPassword = (data: ForgotPassword) => {
        return this.authAdapter.recoveryPassword(data);
    }
    destroyProfile = () => {
        return this.authAdapter.destroyProfile();
    }
}

export { AuthUseCase }