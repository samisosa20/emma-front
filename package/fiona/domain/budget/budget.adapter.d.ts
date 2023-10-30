import type { Budget, BudgetYear, BudgetReport, BudgetParams, BudgetList } from "./budget";


interface BudgetAdapter {
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<BudgetYear>} A Promise containing the list of todos.
     */
    listYearBudget(): Promise<BudgetYear>,
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<BudgetList>} A Promise containing the list of todos.
     */
    listBudget(params: {year: number, badge_id: number}): Promise<BudgetList>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {year} number - The unique identifier of the todo.
     * @param {badge_id} number - The unique identifier of the todo.
     * @returns {Promise<BudgetReport>} A Promise containing the list of todos.
     */
    getReporttPerYear({year: number, badge_id: number}): Promise<BudgetReport>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<Budget>} A Promise containing the list of todos.
     */
    getBudgetDetail(id: number): Promise<Budget>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    createBudget(data: BudgetParams): Promise<{message:string, error: boolean}>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    editBudget(id: number, data: BudgetParams): Promise<{message:string, error: boolean}>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    deleteBudget(id: number): Promise<{message:string, error: boolean}>,

}

export type { BudgetAdapter };
