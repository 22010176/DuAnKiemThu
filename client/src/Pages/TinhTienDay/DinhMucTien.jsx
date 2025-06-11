import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Form, Input, InputNumber, message, Modal, Table } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';

import { GetDinhMucTien, UpdateDinhMucTien } from '@/api/dinhMucTien';

function DinhMucTien() {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const customValue = useWatch(i => i, form);
  // console.log('Form values:', customValue);

  useEffect(() => {
    GetDinhMucTien().then(response => {
      setData(response);
    })
  }, []);

  const dinhMucColumns = [
    { title: 'Loại tiết', dataIndex: 'loaiTiet', key: 'loaiTiet', render: (text) => "Tiết chuẩn" },
    { title: 'Số tiền (VNĐ)', dataIndex: 'soTien', key: 'soTien', render: (value) => value?.toLocaleString('vi-VN') },
    { title: 'Ngày cập nhật', dataIndex: 'ngayCapNhat', key: 'ngayCapNhat', render: (date) => new Date(date)?.toLocaleDateString('vi-VN') },
    {
      title: 'Thao tác', key: 'action',
      render: () => (
        <Button type="primary" size="small" onClick={() => {
          setModalVisible(true);
        }}>
          <FontAwesomeIcon icon={faPen} />
        </Button>
      ),
    },
  ];

  const lichSuColumns = [
    { title: 'Số tiền (VNĐ)', dataIndex: 'soTien', key: 'soTien', render: (value) => value.toLocaleString('vi-VN') },
    { title: 'Ngày cập nhật', dataIndex: 'ngayCapNhat', key: 'ngayCapNhat', render: (date) => new Date(date).toLocaleDateString('vi-VN') },
    { title: 'Lý do', dataIndex: 'lyDo', key: 'lyDo', }
  ];

  const handleModalOk = () => {
    form.validateFields().then(async () => {
      setModalVisible(false);

      const result = await UpdateDinhMucTien(customValue);
      console.log('Update result:', result);
      message.success('Cập nhật định mức tiền thành công!');
      GetDinhMucTien().then(response => {
        setData(response);
      })
      form.resetFields();
    });
  };

  async function OnSubmit(values) {
    console.log('Submitted values:', values);
    // Call API to update dinh muc tien
    // await UpdateDinhMucTien(values);
    setModalVisible(false);
    form.resetFields();
  }

  return (
    <>
      <div className='p-5'>
        <Card title="Định mức tiền theo tiết chuẩn hiện tại">
          <Table columns={dinhMucColumns} dataSource={[data[0]]} pagination={false} size="middle" />
        </Card>
        <Card title="Lịch sử cập nhật định mức " style={{ marginTop: '16px' }}>
          <Table size="middle" columns={lichSuColumns} dataSource={data} pagination={{ pageSize: 5 }} />
        </Card>
      </div>

      <Modal
        open={modalVisible}
        onOk={handleModalOk}
        title={'Cập nhật định mức tiền'}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        width={500}>
        <Form form={form} layout="vertical" onFinish={OnSubmit}>
          <Form.Item label="Số tiền cho 1 tiết chuẩn (VNĐ)" name="soTien" rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}>
            <InputNumber style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
          </Form.Item>
          <Form.Item label="Lý do cập nhật" name="lyDo" rules={[{ required: true, message: 'Vui lòng nhập lý do!' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal >
    </>
  )
}

export default DinhMucTien