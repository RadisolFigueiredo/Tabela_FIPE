"use client";
import { DataProps, SelectProps } from "@/app/types";
import { Autocomplete, TextField } from "@mui/material";

export default function SelectComponent({
  onChange,
  options,
  label,
  getOptionLabel,
}: SelectProps) {
  return (
    <Autocomplete<DataProps, true>
      openText="Abrir"
      closeText="Fechar"
      disablePortal
      noOptionsText="Sem opções"
      loadingText="Carregando..."
      options={options}
      sx={{ marginBottom: "20px" }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      getOptionLabel={getOptionLabel}
      onChange={onChange}
      clearIcon
    />
  );
}
