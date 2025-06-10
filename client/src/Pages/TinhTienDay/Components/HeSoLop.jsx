import { Button, Card, ConfigProvider, Divider, Form, Input, InputNumber, Modal, Space, Table, Tag } from 'antd';
import { useState } from 'react';

const heSoLopData = [
  { key: '1', soSinhVien: '<20', heSo: -0.3, trangThai: 'Đang áp dụng' },
  { key: '2', soSinhVien: '20-29', heSo: -0.2, trangThai: 'Đang áp dụng' },
  { key: '3', soSinhVien: '30-39', heSo: -0.1, trangThai: 'Đang áp dụng' },
  { key: '4', soSinhVien: '40-49', heSo: 0, trangThai: 'Đang áp dụng' },
  { key: '5', soSinhVien: '50-59', heSo: 0.1, trangThai: 'Đang áp dụng' },
  { key: '6', soSinhVien: '60-69', heSo: 0.2, trangThai: 'Đang áp dụng' },
  { key: '7', soSinhVien: '70-79', heSo: 0.3, trangThai: 'Đang áp dụng' }
];

function HeSoLop() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();

  const heSoColumns = [
    { title: 'Số sinh viên', dataIndex: 'soSinhVien', key: 'soSinhVien', },
    {
      title: 'Hệ số', dataIndex: 'heSo', key: 'heSo',
      render: (value) => (
        <Tag color={value < 0 ? 'red' : value > 0 ? 'green' : 'blue'}>
          {value > 0 ? '+' : ''}{value}
        </Tag>
      )
    },
    {
      title: 'Thao tác', key: 'action',
      render: () => (
        <Space>
          <Button size="small" onClick={() => {
            setModalType('heSo');
            setModalVisible(true);
          }}>
            <i className="fas fa-edit"></i> Sửa
          </Button>
          <Button size="small" danger>
            <i className="fas fa-trash"></i> Xóa
          </Button>
        </Space>
      ),
    },
  ];
  const bangCapColumns = [
    { title: 'Tên bằng cấp', dataIndex: 'soSinhVien', key: 'soSinhVien', },
    {
      title: 'Hệ số', dataIndex: 'heSo', key: 'heSo',
      render: (value) => (
        <Tag color={value < 0 ? 'red' : value > 0 ? 'green' : 'blue'}>
          {value > 0 ? '+' : ''}{value}
        </Tag>
      )
    },
    {
      title: 'Thao tác', key: 'action',
      render: () => (
        <Space>
          <Button size="small" onClick={() => {
            setModalType('heSo');
            setModalVisible(true);
          }}>
            <i className="fas fa-edit"></i> Sửa
          </Button>
          <Button size="small" danger>
            <i className="fas fa-trash"></i> Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleModalOk = () => {
    form.validateFields().then(() => {
      setModalVisible(false);
      form.resetFields();
    });
  };
  return (
    <>
      <div className='grid grid-cols-2 gap-10'>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                borderColor: "#000000",
                colorPrimaryBorder: "#000000",
              }
            }
          }}>
          {/* <Divider type="vertical" /> */}



          <Card
            title={
              <Button type="primary" onClick={() => {
                setModalType('addHeSo');
                setModalVisible(true);
              }}>
                <i className="fas fa-plus"></i> Thêm hệ số
              </Button>
            }
          // extra={

          // }
          >
            <Table bordered columns={heSoColumns} dataSource={heSoLopData} pagination={false} size="middle" />
            {/* <Divider type="vertical" /> */}
          </Card>
          <Card
            title={
              <Button type="primary" onClick={() => {
                setModalType('addHeSo');
                setModalVisible(true);
              }}>
                <i className="fas fa-plus"></i> Thêm hệ số
              </Button>
            }
          // extra={            }
          >
            <Table bordered columns={bangCapColumns} dataSource={heSoLopData} pagination={false} size="middle" />
          </Card>
        </ConfigProvider>
      </div>
      <Modal
        visible={modalVisible}
        onOk={handleModalOk}
        title={modalType === 'heSo' ? 'Cập nhật hệ số lớp' : 'Thêm hệ số lớp'}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        width={500}>
        <Form form={form} layout="vertical">
          <Form.Item label="Số sinh viên" name="soSinhVien" rules={[{ required: true, message: 'Vui lòng nhập khoảng sinh viên!' }]}>
            <Input placeholder="Ví dụ: 80-89" />
          </Form.Item>
          <Form.Item label="Hệ số" name="heSo" rules={[{ required: true, message: 'Vui lòng nhập hệ số!' }]}>
            <InputNumber style={{ width: '100%' }} step={0.1} min={-1} max={2} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default HeSoLop;