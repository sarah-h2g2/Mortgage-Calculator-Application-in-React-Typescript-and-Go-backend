import { EFieldNames, EFieldTypes, EFieldDisplayText } from "./types";

export const Fields = [
  {
    id: 1,
    name: EFieldNames.PROPERTY_PRICE,
    type: EFieldTypes.INPUT,
    displayText: EFieldDisplayText.PROPERTY_PRICE,
  },
  {
    id: 2,
    name: EFieldNames.DOWN_PAYMENT,
    type: EFieldTypes.INPUT,
    displayText: EFieldDisplayText.DOWN_PAYMENT,
  },
  {
    id: 3,
    name: EFieldNames.ANNUAL_INTEREST_RATE,
    type: EFieldTypes.INPUT,
    displayText: EFieldDisplayText.ANNUAL_INTEREST_RATE,
  },
  {
    id: 4,
    name: EFieldNames.AMORTIZATION_PERIOD,
    type: EFieldTypes.SELECT,
    displayText: EFieldDisplayText.AMORTIZATION_PERIOD,
    options: [
      { value: "", text: "Choose an option" },
      { value: "5", text: "5 years" },
      { value: "10", text: "10 years" },
      { value: "15", text: "15 years" },
      { value: "20", text: "20 years" },
      { value: "25", text: "25 years" },
      { value: "30", text: "30 years" },
    ],
  },
  {
    id: 5,
    name: EFieldNames.PAYMENT_SCHEDULE,
    type: EFieldTypes.SELECT,
    displayText: EFieldDisplayText.PAYMENT_SCHEDULE,
    options: [
      { value: "", text: "Choose an option" },
      { value: "accel-bi-weekly", text: "accelerated bi-weekly" },
      { value: "bi-weekly", text: "bi-weekly" },
      { value: "monthly", text: "monthly" },
    ],
  },
];
