import React from "react";
import axios, { AxiosError } from "axios";
import {
  EStatus,
  ICalculatePayload,
  EFieldNames,
  IFormStatus,
} from "../../utils/types";
import { END_POINT, HEADING, BUTTON_TEXT } from "../../utils/constants";
import { Fields } from "../../utils/sharedData";
import {
  getFieldType,
  getNumericValue,
  getFloatValue,
  formatResult,
} from "../../utils/validation";
import FormField from "../FormField";
import { isFieldError } from "../../utils/validation";
import "./index.css";

function Calculator(): JSX.Element {
  const [formStatus, setFormStatus] = React.useState<IFormStatus>({
    status: EStatus.PENDING,
    error: "",
    response: "",
  });
  const [disabled, setDisabled] = React.useState(false);
  const showErrorMessage =
    formStatus.status === EStatus.ERROR && !!formStatus.error;
  const showSuccess = formStatus.status === EStatus.SUCCESS;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ status: EStatus.SUBMITTED, error: "", response: "" });
    const formFieldData = new FormData(e.currentTarget);
    const formFieldEntries = Object.fromEntries(formFieldData.entries());
    const isFormInValid = Object.entries(formFieldEntries).some((entry) => {
      const name = entry[0] as string;
      const value = entry[1] as string;
      return isFieldError(value, getFieldType(name));
    });

    if (!isFormInValid) {
      setDisabled(true);
      const payload: Partial<ICalculatePayload> = {};

      Object.entries(formFieldEntries).map((entry) => {
        const name = entry[0] as string;
        const value = entry[1] as string;
        payload[name as keyof ICalculatePayload] =
          name === EFieldNames.PAYMENT_SCHEDULE
            ? value
            : name === EFieldNames.ANNUAL_INTEREST_RATE
            ? Number(getFloatValue(value))
            : Number(getNumericValue(value));
      });
      try {
        const response = await axios.post(END_POINT, payload);
        const { payment, payment_schedule } = response.data;
        if (response.status === 200) {
          const result = formatResult(payment, payment_schedule);
          setFormStatus({
            status: EStatus.SUCCESS,
            error: "",
            response: result,
          });
        }
      } catch (e) {
        const err = e as AxiosError;
        const errorMessage = err.request.response;
        setFormStatus({
          status: EStatus.ERROR,
          error: errorMessage,
          response: "",
        });
      } finally {
        setDisabled(false);
      }
    }
  };

  return (
    <div className="column">
      <h1>{HEADING}</h1>
      <div className="submission-msg">
      {showErrorMessage && (
        <span role="alert" className="error-msg" id="form-submission-error">
          {formStatus.error}
        </span>
      )}
      {showSuccess && (
        <span className="success-msg" id="form-submission-success">
          {formStatus.response}
        </span>
      )}
      </div>
      <form noValidate onSubmit={handleSubmit}>
        <fieldset>
          {Fields.map(({ id, name, type, options = [], displayText }) => {
            return (
              <FormField
                key={id}
                name={name}
                type={type}
                options={options}
                displayText={displayText}
                status={formStatus.status}
              />
            );
          })}
          <div className="center">
            <button disabled={disabled} type="submit">
              {BUTTON_TEXT}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Calculator;
