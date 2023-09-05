import type { Account, AccountDetail } from './account'; // Import the Auth type

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
  getAccountDetail(id: number): Promise<AccountDetail>;
}

export type { AccountRepository };
