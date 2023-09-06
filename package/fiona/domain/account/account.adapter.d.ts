import type { Account, AccountDetail, AccountCreate } from "./account"; // Import the Auth type


interface AccountAdapter {
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<Account>} A Promise containing the list of todos.
     */
    listAccounts(): Promise<Account>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<Account>} A Promise containing the list of todos.
     */
    getAccountDetail(id: number): Promise<AccountDetail>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    createAccount(data: AccountCreate): Promise<{message:string, error: boolean}>,

}

export type { AccountAdapter };
