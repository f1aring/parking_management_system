import type { FormProps } from 'antd';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import React from 'react';
import '../App.css';

export interface VehicleFormData {
  licenseNumber: string;
  vehicleType: string;
  ownerName: string;
  ownerPhone: string;
  status: string;
  ownerAddress: string;
  entryTime: string;
  exitTime: string;
  parkingCharge: string;
}

interface VehicleFormProps {
  onSubmit: (formData: VehicleFormData) => void;
}

interface InternalFormFields {
  licenseNumber: string;
  vehicleType: string;
  ownerName: string;
  ownerPhone: string;
  status: string;
  ownerAddress: string;
  timeRange: [moment.Moment, moment.Moment];
  parkingCharge: string;
}

const { Option } = Select;
const { RangePicker } = DatePicker;

const VehicleForm: React.FC<VehicleFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<InternalFormFields>['onFinish'] = (values) => {
    const [entryTime, exitTime] = values.timeRange || [];
    const formData: VehicleFormData = {
      licenseNumber: values.licenseNumber,
      vehicleType: values.vehicleType,
      ownerName: values.ownerName,
      ownerPhone: values.ownerPhone,
      status: values.status,
      ownerAddress: values.ownerAddress,
      entryTime: entryTime?.toISOString() || '',
      exitTime: exitTime?.toISOString() || '',
      parkingCharge: values.parkingCharge,
    };
    onSubmit(formData);
    form.resetFields();
  };

  const onFinishFailed: FormProps<InternalFormFields>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      name="vehicleForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="form"
    >
      <Form.Item<InternalFormFields>
        label="License Number"
        name="licenseNumber"
        rules={[
          { required: true, message: 'Please input the license number!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<InternalFormFields>
        label="Vehicle Type"
        name="vehicleType"
        rules={[{ required: true, message: 'Please select the vehicle type!' }]}
      >
        <Select>
          <Option value="Microbus">Microbus</Option>
          <Option value="Car">Car</Option>
          <Option value="Truck">Truck</Option>
        </Select>
      </Form.Item>

      <Form.Item<InternalFormFields>
        label="Owner Name"
        name="ownerName"
        rules={[{ required: true, message: 'Please input the owner name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<InternalFormFields>
        label="Owner Phone"
        name="ownerPhone"
        rules={[
          { required: true, message: 'Please input the owner phone number!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<InternalFormFields>
        label="Status"
        name="status"
        rules={[{ required: true, message: 'Please select the status!' }]}
      >
        <Select>
          <Option value="in">In</Option>
          <Option value="out">Out</Option>
        </Select>
      </Form.Item>

      <Form.Item<InternalFormFields>
        label="Owner Address"
        name="ownerAddress"
        rules={[{ required: true, message: 'Please input the owner address!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<InternalFormFields>
        label="Time Range"
        name="timeRange"
        rules={[
          {
            required: true,
            message: 'Please select the entry and exit times!',
          },
        ]}
      >
        <RangePicker showTime />
      </Form.Item>

      <Form.Item<InternalFormFields>
        label="Parking Charge"
        name="parkingCharge"
        rules={[
          { required: true, message: 'Please input the parking charge!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VehicleForm;
