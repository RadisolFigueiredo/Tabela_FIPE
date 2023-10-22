import { SyntheticEvent } from "react";

export type DataProps = {
  codigo: string;
  nome: string;
};

export type SelectProps = {
  options: DataProps[];
  label: string;
  disabled?: boolean;
  getOptionLabel: (option: DataProps) => string;
  onChange: (e: SyntheticEvent<Element, Event>, value: DataProps[]) => void;
};
