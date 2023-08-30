export interface ListItems {
  data: {
    title: string;
    value: number;
    limit?: number;
  }[];
  title: string;
  variant?: 'default' | 'modal' | 'utilization' | 'movements'
}
