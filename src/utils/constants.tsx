export const END_POINT = `http://localhost:8080/calculate`;

export const SELECT_FIELDS = ["amortization_period", "payment_schedule"];

export const HEADING = `Mortgage Calculator`;

export const BUTTON_TEXT = `Calculate Mortgage`;

export const PAYMENT_SCHEDULE: { [key: string]: string } = {
  "accel-bi-weekly": "Accelerated Bi-weekly",
  "bi-weekly": "Bi-weekly",
  monthly: "Monthly",
};
