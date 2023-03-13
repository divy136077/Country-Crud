export interface GridOption {
    allrecords: boolean;
    page?: number;
    pagesize?: number;
    limit?: number;
    search?: string;
    sortDir: string;
    sortField: string,
    filters?: any;
    locale?: any;
    searchfields?: string[];
}
