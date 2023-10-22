import { SelectChangeEvent } from "@mui/material";

export type DataProps = {
  data: [
    {
      codigo: number;
      nome: string;
    }
  ];
};

export type SelectProps = {
  id: string;
  title: string;
  labelId: string;
  value: string;
  label: string;
  disabled?: boolean;
  onChange: (e: SelectChangeEvent) => void;
  children: React.ReactNode;
};
