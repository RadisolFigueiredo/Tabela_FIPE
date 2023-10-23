"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Skeleton, Typography } from "@mui/material";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleResult = useCallback(async () => {
    try {
      const data = await api.get(
        `carros/marcas/${vehicleBrand}/modelos/${vehicleModel}/anos/${vehicleYear}`
      );
      setError(false);
      setVehiclePrice(data.data);
    } catch (err) {
      setError(true);
      console.log("ERR NO YEAR", err);
    }
    if (vehiclePrice) return setLoading(false);
  }, [vehicleBrand, vehicleModel, vehicleYear, vehiclePrice]);

  useEffect(() => {
    handleResult();
  },[handleResult]);

  const handleBack = () => {
    router.push("/");
  };

  return (
    <S.Container>
      <>
        <S.Btn variant="text" onClick={handleBack}>
          Voltar
        </S.Btn>
        <S.BoxResult>
          <S.BoxAlign>
            <>
              {error && (
                <Box display={"flex"} justifyContent={"center"}>
                  Houve um problema, por favor, tente novamente.
                </Box>
              )}

              {!error && loading && (
                <>
                  <Skeleton width="60%" height="40px" />
                  <Skeleton
                    variant="rounded"
                    width={90}
                    height={25}
                    sx={{ mt: 3, mb: 3 }}
                  />
                  <Skeleton width="20%" sx={{ pt: 1 }} />
                </>
              )}
              {!error && !loading && (
                <>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    fontFamily="Roboto, sans-serif"
                  >
                    Tabela Fipe: Preço {vehiclePrice?.Marca}{" "}
                    {vehiclePrice?.Modelo} {""}
                    {vehiclePrice?.AnoModelo}
                  </Typography>
                  <S.ChipValue label={vehiclePrice?.Valor} />
                  <Typography variant="caption" fontFamily="Roboto, sans-serif">
                    Este é o preço de compra do veículo
                  </Typography>
                </>
              )}
            </>
          </S.BoxAlign>
        </S.BoxResult>
      </>
    </S.Container>
  );
}
