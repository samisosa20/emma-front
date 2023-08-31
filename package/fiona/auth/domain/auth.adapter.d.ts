import type { Login } from "./auth.d"; // Import the Auth type
import { AuthModel } from "./auth.d";
/**
 * The AuthAdapter interface defines methods for fetching and interacting with Auth data.
 */

interface AuthAdapter {
    /**
     * Retrieves a list of todos from the data source.
     * @param {Login} - The unique identifier of the todo.
     * @returns {Promise<AuthModel>} A Promise containing the list of todos.
     */
    postLogin({ email, password }: Login): Promise<AuthModel>,

}

export type { AuthAdapter };
