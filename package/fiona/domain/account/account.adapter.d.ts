import type { Account } from "./account"; // Import the Auth type


interface AccountAdapter {
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<Account>} A Promise containing the list of todos.
     */
    listAccounts(): Promise<Account>,

}

export type { AccountAdapter };
