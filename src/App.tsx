import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './components/dashboard';
import DataTable from './components/dataTable';
import Navbar from './components/navbar';
import VehicleForm, { VehicleFormData } from './components/vehicleForm';

const { Content } = Layout;

function App() {
  const [vehicles, setVehicles] = useState<VehicleFormData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<VehicleFormData | null>(
    null
  );

  useEffect(() => {
    const savedVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    setVehicles(savedVehicles);
  }, []);

  const handleVehicleFormSubmit = (formData: VehicleFormData) => {
    let newVehicles;
    if (isEditing && currentVehicle) {
      newVehicles = vehicles.map((vehicle) =>
        vehicle.licenseNumber === currentVehicle.licenseNumber
          ? formData
          : vehicle
      );
      setIsEditing(false);
      setCurrentVehicle(null);
    } else {
      newVehicles = [...vehicles, formData];
    }
    setVehicles(newVehicles);
    localStorage.setItem('vehicles', JSON.stringify(newVehicles));
  };

  const handleEditVehicle = (vehicle: VehicleFormData) => {
    setIsEditing(true);
    setCurrentVehicle(vehicle);
  };

  return (
    <Layout>
      <Navbar />
      <Content className="content">
        <div className="root">
          <div className="first-portion">
            <Dashboard vehicles={vehicles} />
            <VehicleForm
              onSubmit={handleVehicleFormSubmit}
              currentVehicle={currentVehicle}
            />
          </div>
          <DataTable vehicles={vehicles} onEdit={handleEditVehicle} />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
