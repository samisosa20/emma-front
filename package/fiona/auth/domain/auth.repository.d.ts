import type { Login } from "./auth.d";
import { AuthModel } from "./auth.d";

interface AuthRepository {
    postLogin({ email, password }: Login): Promise<AuthModel>,
}

export type { AuthRepository }