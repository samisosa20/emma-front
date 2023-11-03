import type { Message, PredictionParams, TestProjectParams, TestProject } from "./tool"; // Import the Auth type


interface ToolAdapter {
    /**
     * Retrieves a list of todos from the data source.
     * @param {params} PredictionParams - The unique identifier of the todo.
     * @returns {Promise<Message>} A Promise containing the list of todos.
     */
    getCanIDo(params: PredictionParams): Promise<Message>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {params} TestProjectParams - The unique identifier of the todo.
     * @returns {Promise<TestProject>} A Promise containing the list of todos.
     */
    getTestProject(params: TestProjectParams): Promise<TestProject>,


}

export type { ToolAdapter };
