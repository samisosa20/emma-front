import type { AccountAdapter } from '../domain/account/account.adapter';
import type { AccountRepository } from '../domain/account/account.repository';
import type { AccountCreate } from '../domain/account/account.d';

class AccountUseCase implements AccountRepository {
    private authAdapter: AccountAdapter;

    constructor(_authAdapter: AccountAdapter) {
        this.authAdapter = _authAdapter
    }

    listAccounts = () => {
        return this.authAdapter.listAccounts();
    }
    getAccountDetail = (id: number) => {
        return this.authAdapter.getAccountDetail(id);
    }
    createAccount = (data: AccountCreate) => {
        return this.authAdapter.createAccount(data);
    }
}

export { AccountUseCase }