import { createContext, ReactNode, useState } from "react";

interface VehicleContextType {
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: string;
  setVehicleBrand: (brand: string) => void;
  setVehicleModel: (model: string) => void;
  setVehicleYear: (year: string) => void;
  resetFields: () => void;
}

interface PropsVehicleContext {
  children: ReactNode;
}

const VehicleContext = createContext<VehicleContextType>({
  vehicleBrand: '',
  vehicleModel: '',
  vehicleYear: '',
  setVehicleBrand: () => {},
  setVehicleModel: () => {},
  setVehicleYear: () => {},
  resetFields: () => {},
});

const VehicleContextProvider = ({ children }: PropsVehicleContext) => {
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');

  const resetFields = () => {
    setVehicleBrand('');
    setVehicleModel('');
    setVehicleYear('');
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicleBrand,
        setVehicleBrand,
        vehicleModel,
        setVehicleModel,
        vehicleYear,
        setVehicleYear,
        resetFields,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export { VehicleContextProvider };
export default VehicleContext;
