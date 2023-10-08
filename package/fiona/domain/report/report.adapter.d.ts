import type { Report, ReportParams, ReportMovement } from "./report"; // Import the Auth type


interface ReportAdapter {
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<Report>} A Promise containing the list of todos.
     */
    getReport(params: ReportParams): Promise<Report>,
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<ReportMovement>} A Promise containing the list of todos.
     */
    getReportGroup(params: ReportParams): Promise<ReportMovement>,
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<ReportMovement>} A Promise containing the list of todos.
     */
    getReportCategory(params: ReportParams): Promise<ReportMovement>,

}

export type { ReportAdapter };
