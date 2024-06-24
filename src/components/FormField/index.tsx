import React from "react";
import {
  EStatus,
  EFieldNames,
  EFieldTypes,
  ICalculatorProps,
} from "../../utils/types";
import {
  isFieldError,
  getFormattedPrice,
  getNumericValue,
  formatErrorMessage,
  getFloatValue,
  getFormattedInterest,
} from "../../utils/validation";

import "./index.css";

function FormField({
  status,
  name,
  type,
  displayText,
  options = [],
}: ICalculatorProps): JSX.Element {
  const [value, setValue] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const isError = isFieldError(value, type);
  const showErrorMessage = (touched || status === EStatus.SUBMITTED) && isError;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (
      name === EFieldNames.PAYMENT_SCHEDULE ||
      name === EFieldNames.AMORTIZATION_PERIOD
    ) {
      setValue(value);
    } else {
      const formattedValue =
        name === EFieldNames.ANNUAL_INTEREST_RATE
          ? getFloatValue(value)
          : getNumericValue(value);
      if (
        name === EFieldNames.PROPERTY_PRICE ||
        name === EFieldNames.DOWN_PAYMENT
      ) {
        setValue(getFormattedPrice(formattedValue));
      } else if (name === EFieldNames.ANNUAL_INTEREST_RATE) {
        setValue(getFormattedInterest(formattedValue));
      } else {
        setValue(formattedValue);
      }
    }
  };

  return (
    <>
      <label>
        {type === EFieldTypes.INPUT ? (
          <>
            {displayText}{" "}
            <input
              name={name}
              onChange={handleChange}
              value={value}
              onBlur={() => setTouched(true)}
              required
              maxLength={50}
            />
          </>
        ) : (
          type === EFieldTypes.SELECT && (
            <>
              {displayText}{" "}
              <select
                name={name}
                onChange={handleChange}
                value={value}
                onBlur={() => setTouched(true)}
                required
              >
                {options.map(({ value, text }) => (
                  <option key={value} value={value}>
                    {text}
                  </option>
                ))}
              </select>
            </>
          )
        )}
        {showErrorMessage ? (
          <span role="alert" id={`${name}-error`} className="error">
            {formatErrorMessage(displayText)}
          </span>
        ) : null}
      </label>
    </>
  );
}

export default FormField;
