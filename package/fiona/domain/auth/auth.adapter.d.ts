import type { Login, Auth } from "./auth.d"; // Import the Auth type

/**
 * The AuthAdapter interface defines methods for fetching and interacting with Auth data.
 */

interface AuthAdapter {
    /**
     * Retrieves a list of todos from the data source.
     * @param {Login} - The unique identifier of the todo.
     * @returns {Promise<Auth>} A Promise containing the list of todos.
     */
    postLogin({ email, password }: Login): Promise<Auth>,

}

export type { AuthAdapter };
