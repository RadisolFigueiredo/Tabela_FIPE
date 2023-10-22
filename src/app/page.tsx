"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { Box, MenuItem, SelectChangeEvent, Typography } from "@mui/material";
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
    try {
      const data = await api.get(`carros/marcas`);
      setbrandOptions(data.data);
    } catch (err) {
      console.log("ERRO BRAND =>", err);
    }
  };

  const modelSelected = useCallback(
    async (event: SelectChangeEvent) => {
      setVehicleBrand(event.target.value);
      try {
        const data = await api.get(
          `carros/marcas/${event.target.value}/modelos`
        );
        setModelOptions(data.data.modelos);
      } catch (err) {
        console.log("ERRO MODELO =>", err);
      }
    },
    [setVehicleBrand]
  );

  const yearSelected = useCallback(
    async (event: SelectChangeEvent) => {
      setVehicleModel(event.target.value);
      try {
        const data = await api.get(
          `carros/marcas/${vehicleBrand}/modelos/${event.target.value}/anos`
        );
        setyearOptions(data.data);
      } catch (err) {
        console.log("ERRO YEAR =>", err);
      }
    },
    [vehicleBrand, setVehicleModel]
  );

  const handleResult = () => {
    router.push("/result");
  };

  useEffect(() => {
    resetFields();
    handleBrandOptions();
  },[]);

  return (
    <S.Container>
      <Box>
        <Typography
          variant="h4"
          fontWeight={600}
          align="center"
          color="#444444"
          mb={1}
        >
          Tabela Fipe
        </Typography>
        <Typography variant="h6" align="center" color="#444444">
          Consulte o valor de um veículo de forma gratuita
        </Typography>
        <S.BoxCard>
          <CardComponent>
            <SelectComponent
              id="brand"
              title="Marca"
              labelId="marca"
              value={vehicleBrand}
              label="Marca"
              onChange={(event) => modelSelected(event)}
            >
              {brandOptions?.map((item: any) => (
                <MenuItem key={item.codigo} value={item.codigo}>
                  {item.nome}
                </MenuItem>
              ))}
            </SelectComponent>
            <SelectComponent
              id="model"
              title="Modelo"
              labelId="modelo"
              value={vehicleModel}
              label="Modelo"
              disabled={!vehicleBrand}
              onChange={(event) => yearSelected(event)}
            >
              {modelOptions?.map((item: any) => (
                <MenuItem key={item.codigo} value={item.codigo}>
                  {item.nome}
                </MenuItem>
              ))}
            </SelectComponent>
            {vehicleBrand && vehicleModel && (
              <SelectComponent
                id="year"
                title="Ano"
                labelId="ano"
                value={vehicleYear}
                label="Ano"
                onChange={(event) => setVehicleYear(event.target.value)}
              >
                {yearOptions?.map((item: any) => (
                  <MenuItem key={item.codigo} value={item.codigo}>
                    {item.nome}
                  </MenuItem>
                ))}
              </SelectComponent>
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
