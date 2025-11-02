type TAuthType = "Auth" | "Register";

export interface IProps {
  title: string;
  description: string;
  type: TAuthType;
}
