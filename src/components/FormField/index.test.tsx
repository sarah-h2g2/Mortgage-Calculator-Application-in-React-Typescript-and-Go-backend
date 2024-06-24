import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  EStatus,
  EFieldNames,
  EFieldTypes,
  ICalculatorProps,
} from "../../utils/types";
import { Fields } from "../../utils/sharedData";
import { EFieldDisplayText } from "../../utils/types";
import FormField from ".";

describe("FormField", () => {
  const renderFormField = ({
    key,
    status,
    name,
    type,
    displayText,
    options,
  }: ICalculatorProps) =>
    render(
      <FormField
        key={key}
        status={status}
        name={name}
        type={type}
        displayText={displayText}
        options={options}
      />
    );

  test("renders field price", () => {
    renderFormField({
      key: 1,
      status: EStatus.PENDING,
      name: EFieldNames.PROPERTY_PRICE,
      type: EFieldTypes.INPUT,
      displayText: Fields[0].displayText,
      options: [],
    });
    const inputNode = screen.getByLabelText(
      `${EFieldDisplayText.PROPERTY_PRICE}`
    );
    expect(inputNode).toBeInTheDocument();
  });

  test("renders field down payment", () => {
    renderFormField({
      key: 1,
      status: EStatus.PENDING,
      name: EFieldNames.DOWN_PAYMENT,
      type: EFieldTypes.INPUT,
      displayText: Fields[1].displayText,
      options: [],
    });
    const inputNode = screen.getByLabelText(
      `${EFieldDisplayText.DOWN_PAYMENT}`
    );
    expect(inputNode).toBeInTheDocument();
  });

  test("renders field annual interest rate", () => {
    renderFormField({
      key: 1,
      status: EStatus.PENDING,
      name: EFieldNames.ANNUAL_INTEREST_RATE,
      type: EFieldTypes.INPUT,
      displayText: Fields[2].displayText,
      options: [],
    });
    const inputNode = screen.getByLabelText(
      `${EFieldDisplayText.ANNUAL_INTEREST_RATE}`
    );
    expect(inputNode).toBeInTheDocument();
  });

  test("renders field amortization period", () => {
    renderFormField({
      key: 1,
      status: EStatus.PENDING,
      name: EFieldNames.AMORTIZATION_PERIOD,
      type: EFieldTypes.SELECT,
      displayText: Fields[3].displayText,
      options: [],
    });
    const inputNode = screen.getByLabelText(
      `${EFieldDisplayText.AMORTIZATION_PERIOD}`
    );
    expect(inputNode).toBeInTheDocument();
  });

  test("renders field payment schedule", () => {
    renderFormField({
      key: 1,
      status: EStatus.PENDING,
      name: EFieldNames.PAYMENT_SCHEDULE,
      type: EFieldTypes.SELECT,
      displayText: Fields[4].displayText,
      options: Fields[3].options,
    });
    const inputNode = screen.getByLabelText(
      `${EFieldDisplayText.PAYMENT_SCHEDULE}`
    );
    expect(inputNode).toBeInTheDocument();
  });

  test("amortization period field has correct default option", () => {
    renderFormField({
      key: 1,
      status: EStatus.PENDING,
      name: EFieldNames.AMORTIZATION_PERIOD,
      type: EFieldTypes.SELECT,
      displayText: Fields[3].displayText,
      options: Fields[3].options,
    });
    const option: HTMLOptionElement = screen.getByRole("option", {
      name: `Choose an option`,
    });
    expect(option.selected).toBe(true);
    expect(screen.getAllByRole("option").length).toBe(7);
  });

  test("payment schedule field has correct default option", () => {
    renderFormField({
      key: 1,
      status: EStatus.PENDING,
      name: EFieldNames.PAYMENT_SCHEDULE,
      type: EFieldTypes.SELECT,
      displayText: Fields[4].displayText,
      options: Fields[4].options,
    });

    const option: HTMLOptionElement = screen.getByRole("option", {
      name: `Choose an option`,
    });
    expect(option.selected).toBe(true);
    expect(screen.getAllByRole("option").length).toBe(4);
  });

  it("should allow user to change amortization period", async () => {
    renderFormField({
      key: 1,
      status: EStatus.PENDING,
      name: EFieldNames.AMORTIZATION_PERIOD,
      type: EFieldTypes.SELECT,
      displayText: Fields[3].displayText,
      options: Fields[3].options,
    });
    await waitFor(() => {
      userEvent.selectOptions(
        screen.getByRole("combobox"),
        screen.getByRole("option", { name: "10 years" })
      );
    });

    const option: HTMLOptionElement = screen.getByRole("option", {
      name: "10 years",
    });

    expect(option.selected).toBe(true);
  });

  it("should allow user to change payment schedule", async () => {
    renderFormField({
      key: 1,
      status: EStatus.PENDING,
      name: EFieldNames.PAYMENT_SCHEDULE,
      type: EFieldTypes.SELECT,
      displayText: Fields[4].displayText,
      options: Fields[4].options,
    });
    await waitFor(() => {
      userEvent.selectOptions(
        screen.getByRole("combobox"),
        screen.getByRole("option", { name: "accelerated bi-weekly" })
      );
    });

    const option: HTMLOptionElement = screen.getByRole("option", {
      name: "accelerated bi-weekly",
    });

    expect(option.selected).toBe(true);
  });
});
