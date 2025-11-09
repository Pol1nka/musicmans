export interface IUserData {
  login: string;
  tokens: number;
  uuid: string;
}

export interface IUserPayment {
  amount: number;
  created_at: string;
  description: string;
  id: string;
  payment_status: string;
}
