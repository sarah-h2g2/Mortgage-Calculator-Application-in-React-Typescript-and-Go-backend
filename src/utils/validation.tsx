import { EFieldTypes } from "../utils/types";
import { SELECT_FIELDS, PAYMENT_SCHEDULE } from "../utils/constants";

export const isEmptyField = (value: string) => value.trim().length === 0;

export const isFieldError = (value: string, type: string) => {
  const digitRegExp = new RegExp(/^\d*\.?\d*$/);
  const isEmpty = isEmptyField(value);
  if (
    isEmpty ||
    (type === EFieldTypes.INPUT && !digitRegExp.test(getNumericValue(value)))
  )
    return true;
  return false;
};

export const formatErrorMessage = (name: string) =>
  `Enter valid value for ${name}`;

export const getFormattedPrice = (value: string) =>
  `$${value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  export const formatResult = (payment: string, paymentSchedule: string) =>
  `Your mortgage payment is $${payment} on ${PAYMENT_SCHEDULE[paymentSchedule]} schedule`;  

export const getFormattedInterest = (value: string) => `${value}%`;

export const getNumericValue = (value: string) => value.replace(/\D/g, "");

export const getFloatValue = (value: string) => value.replace(/[^.0-9]/g, "");

export const getFieldType = (name: string) =>
  SELECT_FIELDS.includes(name) ? EFieldTypes.SELECT : EFieldTypes.INPUT;
