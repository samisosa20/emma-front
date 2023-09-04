import type { Login, Auth } from "./auth.d";

interface AuthRepository {
    postLogin({ email, password }: Login): Promise<Auth>,
}

export type { AuthRepository }