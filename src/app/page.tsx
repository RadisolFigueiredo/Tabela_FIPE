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

  const [brandOptions, setbrandOptions] = useState<any>([]);
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
    async (event: SelectChangeEvent, newValue: DataProps) => {
      setVehicleBrand(newValue.codigo);
      try {
        const data = await api.get(`carros/marcas/${newValue.codigo}/modelos`);
        console.log("modelSelected", data.data.modelos);
        setModelOptions(data.data.modelos);
      } catch (err) {
        console.log("ERRO MODELO =>", err);
      }
    },
    [setVehicleBrand]
  );

  const yearSelected = useCallback(
    async (event: SelectChangeEvent, newValue: DataProps) => {
      setVehicleModel(newValue.codigo);
      try {
        const data = await api.get(
          `carros/marcas/${vehicleBrand}/modelos/${newValue.codigo}/anos`
        );
        console.log("yearSelected", data.data);

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
        >
          Tabela Fipe
        </Typography>
        <Typography variant="h6" align="center" color="#444444">
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
