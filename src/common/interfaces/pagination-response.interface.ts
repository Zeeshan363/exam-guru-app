export interface PaginationResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    meta: {
      total: number;
      page: number;
      lastPage: number;
      limit: number;
    };
  }