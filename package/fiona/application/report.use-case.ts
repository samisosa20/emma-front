import type { ReportAdapter } from '../domain/report/report.adapter';
import type { ReportRepository } from '../domain/report/report.repository';
import type { ReportParams } from '../domain/report/report';

class ReportUseCase implements ReportRepository {
    private authAdapter: ReportAdapter;

    constructor(_authAdapter: ReportAdapter) {
        this.authAdapter = _authAdapter
    }

    getReport = (params: ReportParams) => {
        return this.authAdapter.getReport(params);
    }
    getReportGroup = (params: ReportParams) => {
        return this.authAdapter.getReportGroup(params);
    }
    getReportCategory = (params: ReportParams) => {
        return this.authAdapter.getReportCategory(params);
    }
}

export { ReportUseCase }