import type { BudgetAdapter } from '../domain/budget/budget.adapter';
import type { BudgetRepository } from '../domain/budget/budget.repository';
import type { BudgetParams } from '../domain/budget/budget';

class BudgetUseCase implements BudgetRepository {
    private authAdapter: BudgetAdapter;

    constructor(_authAdapter: BudgetAdapter) {
        this.authAdapter = _authAdapter
    }

    listYearBudget = () => {
        return this.authAdapter.listYearBudget();
    }
    listBudget = (params: {year: number, badge_id: number}) => {
        return this.authAdapter.listBudget(params);
    }
    getReporttPerYear = (params: {year: number, badge_id: number}) => {
        return this.authAdapter.getReporttPerYear(params);
    }
    getBudgetDetail = (id: number) => {
        return this.authAdapter.getBudgetDetail(id);
    }
    createBudget = (data: BudgetParams) => {
        return this.authAdapter.createBudget(data);
    }
    editBudget = (id: number, data: BudgetParams) => {
        return this.authAdapter.editBudget(id, data);
    }
    deleteBudget = (id: number) => {
        return this.authAdapter.deleteBudget(id);
    }
}

export { BudgetUseCase }