import type { Account, AccountDetail, AccountCreate, AccountParams } from "./account"; // Import the Auth type

interface AccountRepository {
  /**
   * Retrieves a list of todos from the data source.
   * @returns {Promise<Account>} A Promise containing the list of todos.
   */
  listAccounts(): Promise<Account>;
  /**
   * Retrieves a list of todos from the data source.
   * @param {id} number - The unique identifier of the todo.
   * @returns {Promise<AccountDetail>} A Promise containing the list of todos.
   */
  getAccountDetail(id: number, filters?: AccountParams): Promise<AccountDetail>;
  /**
   * Retrieves a list of todos from the data source.
   * @param {data} AccountCreate - The unique identifier of the todo.
   * @returns {Promise<{message:string}>} A Promise containing the list of todos.
   */
  createAccount(
    data: AccountCreate
  ): Promise<{ message: string; error: boolean }>;
  /**
   * Retrieves a list of todos from the data source.
   * @param {data} AccountCreate - The unique identifier of the todo.
   * @returns {Promise<{message:string}>} A Promise containing the list of todos.
   */
  editAccount(
    id: number,
    data: AccountCreate
  ): Promise<{ message: string; error: boolean }>;
   /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     */
   desactiveAccount(id: number): Promise<{message:string, error: boolean}>,
   /**
    * Retrieves a list of todos from the data source.
    * @param {id} number - The unique identifier of the todo.
    */
   activeAccount(id: number): Promise<{message:string, error: boolean}>,
   /**
    * Retrieves a list of todos from the data source.
    * @param {id} number - The unique identifier of the todo.
    */
   deleteAccount(id: number): Promise<{message:string, error: boolean}>,
}

export type { AccountRepository };
