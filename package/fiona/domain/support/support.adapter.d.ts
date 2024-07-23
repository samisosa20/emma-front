import type { Message, SupportParamsSchema } from "./support"; // Import the Auth type


interface SupportAdapter {
    /**
     * Retrieves a list of todos from the data source.
     * @param {params} SupportParamsSchema - The unique identifier of the todo.
     * @returns {Promise<Message>} A Promise containing the list of todos.
     */
    postSupport(params: SupportParamsSchema): Promise<Message>,

}

export type { SupportAdapter };
