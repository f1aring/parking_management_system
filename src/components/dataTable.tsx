import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { VehicleFormData } from './vehicleForm';

interface DataTableProps {
  vehicles: VehicleFormData[];
  onEdit: (vehicle: VehicleFormData) => void;
}

const DataTable: React.FC<DataTableProps> = ({ vehicles, onEdit }) => {
  const columns: ColumnsType<VehicleFormData> = [
    {
      title: 'License Number',
      dataIndex: 'licenseNumber',
      key: 'licenseNumber',
    },
    {
      title: 'Vehicle Type',
      dataIndex: 'vehicleType',
      key: 'vehicleType',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Owner Name',
      dataIndex: 'ownerName',
      key: 'ownerName',
    },
    {
      title: 'Owner Phone',
      dataIndex: 'ownerPhone',
      key: 'ownerPhone',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <Tag color={text === 'in' ? 'green' : 'red'}>{text}</Tag>
      ),
    },
    {
      title: 'Owner Address',
      dataIndex: 'ownerAddress',
      key: 'ownerAddress',
    },
    {
      title: 'Entry Time',
      dataIndex: 'entryTime',
      key: 'entryTime',
    },
    {
      title: 'Exit Time',
      dataIndex: 'exitTime',
      key: 'exitTime',
    },
    {
      title: 'Parking Charge',
      dataIndex: 'parkingCharge',
      key: 'parkingCharge',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onEdit(record)}>Edit</a>
        </Space>
      ),
    },
  ];

  const dataSource = vehicles.map((vehicle, index) => ({
    key: index.toString(),
    ...vehicle,
  }));

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      style={{ marginTop: 100 }}
    />
  );
};

export default DataTable;
