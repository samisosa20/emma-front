import type { Login, Auth, Currency } from "./auth.d";

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
}

export type { AuthRepository }