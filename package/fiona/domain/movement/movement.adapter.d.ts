import type { Movement, MomeventCreate } from "./movement";


interface MovementAdapter {
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<Movement>} A Promise containing the list of todos.
     */
    getMovementDetail(id: number): Promise<Movement>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    createMovement(data: MomeventCreate): Promise<{message:string, error: boolean}>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    editMovement(id: number, data: MomeventCreate): Promise<{message:string, error: boolean}>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    deleteMovement(id: number): Promise<{message:string, error: boolean}>,

}

export type { MovementAdapter };
