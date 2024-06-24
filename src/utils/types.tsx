export enum EFieldNames {
  PROPERTY_PRICE = "price",
  DOWN_PAYMENT = "down_payment",
  ANNUAL_INTEREST_RATE = "annual_interest_rate",
  AMORTIZATION_PERIOD = "amortization_period",
  PAYMENT_SCHEDULE = "payment_schedule",
}

export enum EFieldDisplayText {
  PROPERTY_PRICE = "Property Price",
  DOWN_PAYMENT = "Down Payment",
  ANNUAL_INTEREST_RATE = "Annual Interest Rate",
  AMORTIZATION_PERIOD = "Amortization Period",
  PAYMENT_SCHEDULE = "Payment Schedule",
}

export enum EFieldTypes {
  SELECT = "select",
  INPUT = "input",
}

export enum EStatus {
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
  SUBMITTED = "submitted",
}

export type Status =
  | EStatus.ERROR
  | EStatus.PENDING
  | EStatus.SUCCESS
  | EStatus.SUBMITTED;

export interface IOption {
  value: string;
  text: string;
}

export interface ICalculatorProps {
  status: string;
  key: number;
  name: string;
  displayText: string;
  type: string;
  options?: IOption[];
}

export interface IObjectKeys {
  [key: string]: number | undefined | string;
}

export interface ICalculatePayload extends IObjectKeys {
  price: number;
  down_payment: number;
  annual_interest_rate: number;
  amortization_period: number;
  payment_schedule: string;
}

export interface IFormStatus {
  status: EStatus;
  error: string | undefined;
  response: string | undefined;
}
