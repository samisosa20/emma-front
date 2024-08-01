export interface ListItems {
  data: {
    id: number;
    title: string;
    value: number;
    limit?: number;
    percentage?: number;
    color?: string;
    father?: string;
    variation?: number;
  }[];
  title: string;
  tooltip?: boolean;
  tooltipVariant?: 'group';
  variant?: 'default' | 'modal' | 'utilization' | 'movements';
  onClickModal?: (id: number)=>void;
  dataModal?: any[];
  showHistory?: boolean;
  currency?: {
    id: number;
  }
}
