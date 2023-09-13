import type { Heritage, HeritageDetail, HeritageCreate } from "./heritage"; 


interface HeritageRepository {
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<Heritage>} A Promise containing the list of todos.
     */
    listHeritages(): Promise<Heritage>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {year} number - The unique identifier of the todo.
     * @returns {Promise<Heritage>} A Promise containing the list of todos.
     */
    getListPerYearDetail(year: number): Promise<HeritageDetail>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<Heritage>} A Promise containing the list of todos.
     */
    getHeritageDetail(id: number): Promise<HeritageCreate>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    createHeritage(data: HeritageCreate): Promise<{message:string, error: boolean}>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    editHeritage(id: number, data: HeritageCreate): Promise<{message:string, error: boolean}>,

}

export type { HeritageRepository };
