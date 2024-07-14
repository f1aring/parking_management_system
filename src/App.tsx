import { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './components/dashboard';
import DataTable from './components/dataTable';
import VehicleForm, { VehicleFormData } from './components/vehicleForm';

function App() {
  const [vehicles, setVehicles] = useState<VehicleFormData[]>([]);

  useEffect(() => {
    const savedVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    setVehicles(savedVehicles);
  }, []);

  const handleVehicleFormSubmit = (formData: VehicleFormData) => {
    const newVehicles = [...vehicles, formData];
    setVehicles(newVehicles);
    localStorage.setItem('vehicles', JSON.stringify(newVehicles));
  };

  return (
    <>
      <div className="root">
        <div className="first-portion">
          <Dashboard vehicles={vehicles} />
          <VehicleForm onSubmit={handleVehicleFormSubmit} />
        </div>

        <DataTable vehicles={vehicles} />
      </div>
    </>
  );
}

export default App;
