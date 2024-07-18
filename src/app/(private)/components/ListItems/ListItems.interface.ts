export interface ListItems {
  data: {
    id: number;
    title: string;
    value: number;
    limit?: number;
    percentage?: number;
    color?: string;
    father?: string;
  }[];
  title: string;
  variant?: 'default' | 'modal' | 'utilization' | 'movements';
  onClickModal?: (id: number)=>void;
  dataModal?: any[];
  showHistory?: boolean;
}
