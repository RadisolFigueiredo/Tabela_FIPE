import { Box, Button, Chip } from "@mui/material";
import styled from "styled-components";

export const Container = styled(Box)`
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
  padding-right: 60px;
`;

export const Btn = styled(Button)`
  text-transform: none;
  font-size: 18px;
  color: #444444;
  cursor: pointer;
`;

export const BoxResult = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 55%;
  height: 30%;
  background-color: #dcf5f2;
  box-shadow: 24px;
  padding: 10px;
`;

export const BoxAlign = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
  background-color: #dcf5f2;
  height: 100%;
`;

export const ChipValue = styled(Chip)`
  background: #00a38c;
  color: #ffffff;
  margin: 15px 0;
  font-size: 20px;
`;
