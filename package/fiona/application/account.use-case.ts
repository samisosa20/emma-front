import type { AccountAdapter } from '../domain/account/account.adapter';
import type { AccountRepository } from '../domain/account/account.repository';
import type { AccountCreate, AccountParams } from '../domain/account/account.d';

class AccountUseCase implements AccountRepository {
    private authAdapter: AccountAdapter;

    constructor(_authAdapter: AccountAdapter) {
        this.authAdapter = _authAdapter
    }

    listAccounts = () => {
        return this.authAdapter.listAccounts();
    }
    getAccountDetail = (id: number, filters?: AccountParams) => {
        return this.authAdapter.getAccountDetail(id, filters);
    }
    createAccount = (data: AccountCreate) => {
        return this.authAdapter.createAccount(data);
    }
    editAccount = (id: number, data: AccountCreate) => {
        return this.authAdapter.editAccount(id, data);
    }
    desactiveAccount = (id: number) => {
        return this.authAdapter.desactiveAccount(id);
    }
    activeAccount = (id: number) => {
        return this.authAdapter.activeAccount(id);
    }
    deleteAccount = (id: number) => {
        return this.authAdapter.deleteAccount(id);
    }
}

export { AccountUseCase }