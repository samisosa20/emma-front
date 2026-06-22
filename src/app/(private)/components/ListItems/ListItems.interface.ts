export interface ListItems {
  data: {
    amount: number;
    categoryId: string;
    category: string;
    icon: string;
    color: string;
    participation: number;
    father?: any;
    title?: any;
    value?: any;
    symbol?: any;
    flag?: any;
    percentage?: any;
    limit?: any;
  }[];
  title: string;
  tooltip?: boolean;
  tooltipVariant?: "group";
  variant?: "default" | "modal" | "utilization" | "movements";
  onClickModal?: (id: string) => void;
  dataModal?: any[];
  showHistory?: boolean;
  currency?: {
    id: number;
  };
}
