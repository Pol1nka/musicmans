export interface IPaymentPlan {
  title: string;
  amount: number;
  tokens: number;
}

export interface IProps {
  plan: IPaymentPlan;
}
