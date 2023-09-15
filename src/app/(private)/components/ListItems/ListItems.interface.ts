export interface ListItems {
  data: {
    title: string;
    value: number;
    limit?: number;
    percentage?: number;
  }[];
  title: string;
  variant?: 'default' | 'modal' | 'utilization' | 'movements'
}
