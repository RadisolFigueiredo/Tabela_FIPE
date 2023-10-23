"use client";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "@/app/page";
import "@testing-library/jest-dom";

const routerPushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: () => {
      routerPushMock;
    },
  }),
}));

describe("Home", () => {
  it("should render form", () => {
    render(<Home />);

    expect(screen.getByLabelText("Marca")).toBeInTheDocument();
    expect(screen.getByLabelText("Modelo")).toBeInTheDocument();
  });

  it("should call navigate result when hits the button", () => {
    render(<Home />);

    const btn = screen.getByText("Consultar preço");

    fireEvent.click(btn);

    expect(routerPushMock).toHaveBeenCalledWith("/result");
  });
});
