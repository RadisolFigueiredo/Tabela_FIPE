"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {Typography } from "@mui/material";
import VehicleContext from "../context/vehicleDetail";
import { api } from "../services/api";
import * as S from "./styles";

interface ResultProps {
  AnoModelo: number;
  Marca: string;
  Modelo: string;
  Valor: string;
}

export default function Result() {
  const router = useRouter();

  const { vehicleBrand, vehicleModel, vehicleYear } =
    useContext(VehicleContext);

  const [vehiclePrice, setVehiclePrice] = useState<ResultProps>();

  const handleResult = useCallback(async () => {
    try {
      const data = await api.get(
        `carros/marcas/${vehicleBrand}/modelos/${vehicleModel}/anos/${vehicleYear}`
      );
      setVehiclePrice(data.data);
    } catch (err) {
      console.log("ERRO NO ANO", err);
    }
  }, [vehicleBrand, vehicleModel, vehicleYear]);

  useEffect(() => {
    handleResult();
  });

  return (
    <S.Container>
      <S.Btn variant="text" onClick={() => router.push("/")}>
        Voltar
      </S.Btn>
      <S.BoxResult>
        <S.BoxAlign>
          <Typography variant="h5" fontWeight={600}>
            Tabela Fipe: Preço {vehiclePrice?.Marca} {vehiclePrice?.Modelo}
            {vehiclePrice?.AnoModelo}
          </Typography>
          <S.ChipValue label={vehiclePrice?.Valor} />
          <Typography variant="caption">
            Este é o preço de compra do veículo
          </Typography>
        </S.BoxAlign>
      </S.BoxResult>
    </S.Container>
  );
}