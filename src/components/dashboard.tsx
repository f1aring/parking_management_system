import { Card, DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import '../App.css';
import { VehicleFormData } from './vehicleForm';

interface DashboardProps {
  vehicles: VehicleFormData[];
}

const Dashboard: React.FC<DashboardProps> = ({ vehicles }) => {
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleFormData[]>(
    []
  );
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());

  useEffect(() => {
    const formattedDate = selectedDate.format('YYYY-MM-DD');
    const filtered = vehicles.filter((vehicle) => {
      return (
        vehicle.entryTime.startsWith(formattedDate) ||
        vehicle.exitTime.startsWith(formattedDate)
      );
    });
    setFilteredVehicles(filtered);
  }, [selectedDate, vehicles]);

  const totalCarsParked = filteredVehicles.length;
  const totalSlots = 100; // Assuming total parking slots are 100
  const totalEmptySlots = totalSlots - totalCarsParked;

  const vehicleTypeCount = filteredVehicles.reduce((acc, vehicle) => {
    acc[vehicle.vehicleType] = (acc[vehicle.vehicleType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const twoHoursAgo = moment().subtract(2, 'hours');
  const longParkedVehicles = filteredVehicles.filter((vehicle) => {
    const entryTime = moment(vehicle.entryTime);
    return entryTime.isBefore(twoHoursAgo);
  });

  const handleDateChange = (date: Moment | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div style={{ marginBottom: '20px' }}>
        <label>Date: </label>
        <DatePicker value={selectedDate} onChange={handleDateChange} />
      </div>

      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Card title="Total Cars Parked" style={{ width: 240 }}>
          <h3>{totalCarsParked}</h3>
        </Card>

        <Card title="Total Empty Slots" style={{ width: 300 }}>
          <h3>{totalEmptySlots}</h3>
        </Card>

        <Card title="Vehicle Types" style={{ width: 240 }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {Object.keys(vehicleTypeCount).map((type) => (
              <li key={type} style={{ marginBottom: '5px' }}>
                {type}: {vehicleTypeCount[type]}
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Vehicles Parked for More Than Two Hours"
          style={{ width: 300 }}
        >
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {longParkedVehicles.map((vehicle, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>
                {vehicle.licenseNumber} - {vehicle.ownerName}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
