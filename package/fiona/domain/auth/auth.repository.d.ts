import type { Login, Auth, Currency, ForgotPassword } from "./auth.d";

interface AuthRepository {
    /**
     * Retrieves a list of todos from the data source.
     * @param {Login} - The unique identifier of the todo.
     * @returns {Promise<Auth>} A Promise containing the list of todos.
     */
    postLogin({ email, password }: Login): Promise<Auth>,

    /**
     * Retrieves a list of todos from the data source.
     * @param {Register} - The unique identifier of the todo.
     * @returns {Promise<Auth>} A Promise containing the list of todos.
     */
    postRegister(data: Register): Promise<Auth>,

    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<Currency>} A Promise containing the list of todos.
     */
    getCurrency(): Promise<Currency>,

    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<Profile>} A Promise containing the list of todos.
     */
    getProfile(): Promise<Profile>,
    
    /**
     * Retrieves a list of todos from the data source.
     * @param {ParamsProfile} - The unique identifier of the todo.
     * @returns {Promise<Profile>} A Promise containing the list of todos.
     */
    updateProfile(id: number, data: ParamsProfile): Promise<Profile>,
        
    /**
     * Retrieves a list of todos from the data source.
     * @param {ForgotPassword} - The unique identifier of the todo.
     * @returns {Promise<{error: boolean, message: string}>} A Promise containing the list of todos.
     */
    recoveryPassword(data: ForgotPassword): Promise<{error: boolean, message: string}>,
        
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} - user id.
     * @param {hash} - unique hash.
     * @param {expires} - expires time.
     * @param {signature} - Signature to valid information.
     * @returns {Promise<{error: boolean, message: string}>} A Promise containing the list of todos.
     */
    getVerifyEmail(id: string, hash: string, expires: string, signature: string): Promise<{error: boolean, message: string}>,

    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<{error: boolean, message: string}>} A Promise containing the list of todos.
     */
    postResendVerify(): Promise<{error: boolean, message: string}>,
}

export type { AuthRepository }