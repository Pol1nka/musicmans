import type { IUserPayment } from "@/stores/user/types.ts";

export interface IProps {
  title: string;
  description?: string;
  mainInfoContent?: string;
}

export interface IPaymentRowProps {
  payment: IUserPayment;
}
