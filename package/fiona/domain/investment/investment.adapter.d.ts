import type { Investment, InvestmentDetail, InvestmentParams, Appretiation, AppretiationParams } from "./investment";


interface InvestmentAdapter {
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<Investment>} A Promise containing the list of todos.
     */
    listInvestments(): Promise<Investment>,

    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<InvestmentDetail>} A Promise containing the list of todos.
     */
    getInvestmentDetail(id: number): Promise<InvestmentDetail>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    createInvestment(data: InvestmentParams): Promise<{message:string, error: boolean}>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    editInvestment(id: number, data: InvestmentParams): Promise<{message:string, error: boolean}>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    deleteInvestment(id: number): Promise<{message:string, error: boolean}>,

     /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<Appretiation>} A Promise containing the list of todos.
     */
     listAppretiations(): Promise<Appretiation>,
     /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    createAppretiation(data: AppretiationParams): Promise<{message:string, error: boolean}>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    editAppretiation(id: number, data: AppretiationParams): Promise<{message:string, error: boolean}>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    deleteAppretiation(id: number): Promise<{message:string, error: boolean}>,
}

export type { InvestmentAdapter };
