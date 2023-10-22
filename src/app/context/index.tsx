import { VehicleContextProvider } from "./vehicleDetail";

const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  return <VehicleContextProvider>{children}</VehicleContextProvider>;
};

export default GlobalContext;
