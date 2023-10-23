"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { Box, SelectChangeEvent, Typography } from "@mui/material";
import { api } from "./services/api";
import VehicleContext from "./context/vehicleDetail";
import { useRouter } from "next/navigation";
import CardComponent from "./components/Card";
import SelectComponent from "./components/Form";
import { DataProps } from "./types";
import * as S from "./styles";

export default function Home() {
  const router = useRouter();

  const [brandOptions, setbrandOptions] = useState<DataProps[]>([]);
  const [modelOptions, setModelOptions] = useState<DataProps[]>([]);
  const [yearOptions, setyearOptions] = useState<DataProps[]>([]);
  const [isBrandSelected, setIsBrandSelected] = useState(false);

  const {
    vehicleBrand,
    setVehicleBrand,
    vehicleModel,
    setVehicleModel,
    vehicleYear,
    setVehicleYear,
    resetFields,
  } = useContext(VehicleContext);

  const handleBrandOptions = async () => {
    resetFields();

    try {
      const data = await api.get(`carros/marcas`);
      setbrandOptions(data.data);
    } catch (err) {
      console.log("ERR BRAND =>", err);
    }
  };

  const modelSelected = useCallback(
    async (event: SelectChangeEvent, newValue: DataProps) => {
      if (isBrandSelected) {
        resetFields();
        setIsBrandSelected(false);
      }
      setIsBrandSelected(true);
      setVehicleBrand(newValue.codigo);
      try {
        const data = await api.get(`carros/marcas/${newValue.codigo}/modelos`);
        setModelOptions(data.data.modelos);
      } catch (err) {
        console.log("ERR MODEL =>", err);
      }
    },
    [setVehicleBrand, resetFields, isBrandSelected]
  );

  const yearSelected = useCallback(
    async (event: SelectChangeEvent, newValue: DataProps) => {
      setVehicleModel(newValue.codigo);
      try {
        const data = await api.get(
          `carros/marcas/${vehicleBrand}/modelos/${newValue.codigo}/anos`
        );
        setyearOptions(data.data);
      } catch (err) {
        console.log("ERR YEAR =>", err);
      }
    },
    [vehicleBrand, setVehicleModel]
  );

  const handleResult = () => {
    router.push("/result");
  };

  useEffect(() => {
    handleBrandOptions();
  }, []);

  return (
    <S.Container>
      <Box>
        <Typography
          variant="h4"
          fontWeight={600}
          align="center"
          color="#444444"
          mb={1}
          fontFamily="Roboto, sans-serif"
        >
          Tabela Fipe
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="#444444"
          fontFamily="Roboto, sans-serif"
        >
          Consulte o valor de um veículo de forma gratuita
        </Typography>
        <S.BoxCard>
          <CardComponent>
            <SelectComponent
              options={brandOptions}
              getOptionLabel={(option: any) => option.nome}
              label="Marca"
              onChange={(event: any, newValue: any) =>
                modelSelected(event, newValue)
              }
            />
            <SelectComponent
              options={modelOptions}
              getOptionLabel={(option: any) => option.nome}
              label="Modelo"
              disabled={!vehicleBrand}
              onChange={(event: any, newValue: any) =>
                yearSelected(event, newValue)
              }
            />
            {vehicleBrand && vehicleModel && (
              <SelectComponent
                options={yearOptions}
                getOptionLabel={(option: any) => option.nome}
                label="Ano"
                onChange={(event: any, newValue: any) =>
                  setVehicleYear(newValue.codigo)
                }
              />
            )}
            <S.AlignBtn>
              <S.Btn
                disabled={!vehicleYear}
                variant="contained"
                onClick={handleResult}
              >
                Consultar preço
              </S.Btn>
            </S.AlignBtn>
          </CardComponent>
        </S.BoxCard>
      </Box>
    </S.Container>
  );
}
