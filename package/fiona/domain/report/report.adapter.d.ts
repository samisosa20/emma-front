import type { Report, ReportParams } from "./report"; // Import the Auth type


interface ReportAdapter {
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<Report>} A Promise containing the list of todos.
     */
    getReport(params: ReportParams): Promise<Report>,

}

export type { ReportAdapter };
