import type { InvestmentAdapter } from '../domain/investment/investment.adapter';
import type { InvestmentRepository } from '../domain/investment/investment.repository';
import type { InvestmentParams } from '../domain/investment/investment';

class InvestmentUseCase implements InvestmentRepository {
    private authAdapter: InvestmentAdapter;

    constructor(_authAdapter: InvestmentAdapter) {
        this.authAdapter = _authAdapter
    }

    listInvestments = () => {
        return this.authAdapter.listInvestments();
    }
    getInvestmentDetail = (id: number) => {
        return this.authAdapter.getInvestmentDetail(id);
    }
    createInvestment = (data: InvestmentParams) => {
        return this.authAdapter.createInvestment(data);
    }
    editInvestment = (id: number, data: InvestmentParams) => {
        return this.authAdapter.editInvestment(id, data);
    }
    deleteInvestment = (id: number) => {
        return this.authAdapter.deleteInvestment(id);
    }
}

export { InvestmentUseCase }