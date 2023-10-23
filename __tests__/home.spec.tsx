"use client";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

  it("the button should be disabled if the fields aren't filled", async () => {
    render(<Home />);

    const marca = screen.getByLabelText("Marca");
    const modelo = screen.getByLabelText("Modelo");

    expect(marca).toHaveValue("");
    expect(modelo).toHaveValue("");

    fireEvent.change(marca, { target: { value: "Opção selecionada" } });
    fireEvent.change(modelo, { target: { value: "Opção selecionada" } });

    expect(marca).not.toEqual("");
    expect(modelo).not.toEqual("");

  });
});
