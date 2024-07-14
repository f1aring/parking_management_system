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

  const cardStyle = { width: 240, backgroundColor: '#9fd3c7' };

  return (
    <div className="dashboard dashboard-background">
      <h2 className="dashboard-title">Dashboard</h2>
      <div style={{ marginBottom: '20px', textAlign: 'left' }}>
        <label className="date-picker">Date: </label>
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
        <Card
          title="Total Cars Parked"
          className="card-background"
          style={cardStyle}
        >
          <h3 className="card-content">{totalCarsParked}</h3>
        </Card>

        <Card
          title="Total Empty Slots"
          className="card-background"
          style={{ ...cardStyle, width: 300 }}
        >
          <h3 className="card-content">{totalEmptySlots}</h3>
        </Card>

        <Card
          title="Vehicle Types"
          className="card-background"
          style={cardStyle}
        >
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {Object.keys(vehicleTypeCount).map((type) => (
              <li
                key={type}
                className="card-content"
                style={{ marginBottom: '5px' }}
              >
                {type}: {vehicleTypeCount[type]}
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Vehicles Parked for More Than Two Hours"
          className="card-background"
          style={{ ...cardStyle, width: 300 }}
        >
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {longParkedVehicles.map((vehicle, index) => (
              <li
                key={index}
                className="card-content"
                style={{ marginBottom: '5px' }}
              >
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
