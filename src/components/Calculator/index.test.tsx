import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Calculator from ".";
import { HEADING } from "../../utils/constants";
import { EFieldDisplayText } from "../../utils/types";

describe("Calculator", () => {
  test("renders heading", () => {
    render(<Calculator />);
    expect(screen.getByText(`${HEADING}`)).toBeInTheDocument();
  });

  test("renders property price, down payment, annual interest rate, amortization period, and payment schedule fields", () => {
    render(<Calculator />);
    const price = screen.getByLabelText(`${EFieldDisplayText.PROPERTY_PRICE}`);
    const down_payment = screen.getByLabelText(
      `${EFieldDisplayText.DOWN_PAYMENT}`
    );
    const interest_rate = screen.getByLabelText(
      `${EFieldDisplayText.ANNUAL_INTEREST_RATE}`
    );
    const amortization_period = screen.getByLabelText(
      `${EFieldDisplayText.AMORTIZATION_PERIOD}`
    );
    const payment_schedule = screen.getByLabelText(
      `${EFieldDisplayText.PAYMENT_SCHEDULE}`
    );
    expect(price).toBeInTheDocument();
    expect(down_payment).toBeInTheDocument();
    expect(interest_rate).toBeInTheDocument();
    expect(amortization_period).toBeInTheDocument();
    expect(payment_schedule).toBeInTheDocument();
  });

  test("renders calculate mortgage button", () => {
    render(<Calculator />);
    const btn = screen.getByRole("button", {
      name: /Calculate Mortgage/i,
    });
    expect(btn).toBeInTheDocument();
  });

  test("calculate mortgage button click triggers on submit validation", async () => {
    render(<Calculator />);
    const btn = screen.getByRole("button", {
      name: /Calculate Mortgage/i,
    });
    fireEvent.submit(btn);
    await waitFor(() => {
      const price = screen.getByText(`Enter valid value for Property Price`);
      const down_payment = screen.getByText(
        `Enter valid value for Down Payment`
      );
      const interest_rate = screen.getByText(
        `Enter valid value for Annual Interest Rate`
      );
      const amortization_period = screen.getByText(
        `Enter valid value for Amortization Period`
      );
      const payment_schedule = screen.getByText(
        `Enter valid value for Payment Schedule`
      );
      expect(price).toBeInTheDocument();
      expect(down_payment).toBeInTheDocument();
      expect(interest_rate).toBeInTheDocument();
      expect(amortization_period).toBeInTheDocument();
      expect(payment_schedule).toBeInTheDocument();
    });
  });

  test("should show formatted price with $ in front of the value", async () => {
    render(<Calculator />);

    await waitFor(() => {
      const inputNode: HTMLInputElement = screen.getByLabelText(
        `${EFieldDisplayText.PROPERTY_PRICE}`
      );
      fireEvent.change(inputNode, { target: { value: "$45000" } });
      expect(inputNode.value).toBe("$45,000");
    });
  });
});
