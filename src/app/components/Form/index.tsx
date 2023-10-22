"use client";

import { SelectProps } from "@/app/types";
import { FormControl, InputLabel, Select } from "@mui/material";

export default function SelectComponent({
  id,
  title,
  labelId,
  value,
  label,
  onChange,
  children,
  disabled,
}: SelectProps) {
  return (
    <FormControl fullWidth sx={{ marginBottom: "20px" }}>
      <InputLabel id={id}>{title}</InputLabel>
      <Select
        required
        labelId={labelId}
        value={value}
        label={label}
        onChange={onChange}
        disabled={disabled}
      >
        {children}
      </Select>
    </FormControl>
  );
}
