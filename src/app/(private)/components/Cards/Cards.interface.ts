import { symbol } from "zod";

export interface CardsProps {
  title: string;
  data: {
    code: string;
    amount: number;
    variation?: number;
    symbol: string;
    flag?: string;
    title?: string;
    text?: string;
  }[];
}
