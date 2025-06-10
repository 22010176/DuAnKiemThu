import { CreateHeSoLopHocPhan, DeleteHeSoLopHocPhan, GetHeSoLopHocPhan, UpdateHeSoLopHocPhan } from '@/api/heSoLopHocPhan';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, ConfigProvider, Divider, Form, Input, InputNumber, message, Modal, Space, Table, Tag } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';

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
  const [heSoLop, setHeSoLop] = useState([])
  const [heSoLopId, setHeSoLopId] = useState()
  const [modalType, setModalType] = useState('');

  const [form] = Form.useForm();
  const formData = useWatch(i => i, form)

  useEffect(function () {
    GetHeSoLopHocPhan().then(setHeSoLop)
  }, [])

  const heSoColumns = [
    { title: 'Số sinh viên', dataIndex: 'soHocSinhToiThieu', key: 'soHocSinhToiThieu', },
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
      render: (_, item) => (
        <Space>
          <Button size='small' onClick={() => {

            setHeSoLopId(item.id)
            form.setFieldValue('id', item.id)
            form.setFieldValue('heSo', item.heSo)
            form.setFieldValue('soHocSinhToiThieu', item.soHocSinhToiThieu)
            setModalType('edit')
            setModalVisible(true)
          }} >
            Sửa
          </Button>
          <Button size="small" danger
            onClick={async () => {
              await DeleteHeSoLopHocPhan({ id: item.id })
              await GetHeSoLopHocPhan().then(setHeSoLop)
              message.info("Xóa hệ số lớp học phần thành công!")
            }}>
            Xóa
          </Button>
        </Space >
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
      render: (_, entry) => (
        <Space>
          <Button size="small" onClick={() => {

            setModalVisible(true)
          }}>
            Sửa
          </Button>
          <Button size="small" danger>
            Xóa
          </Button>
        </Space >
      ),
    },
  ];

  const handleModalOk = () => {
    form.validateFields().then(async () => {
      setModalVisible(false);
      console.log(formData)
      try {
        if (modalType == 'add') {
          await CreateHeSoLopHocPhan(formData)
          message.info("Tạo hệ số lớp mới thành công!")

        }
        else if (modalType == 'edit') {
          await UpdateHeSoLopHocPhan({ id: heSoLopId, ...formData })
          message.info("Cập nhật hệ số lớp mới thành công!")
        }
      } catch (error) {
        message.error("Thao tác thất bại!")
      }
      await GetHeSoLopHocPhan().then(setHeSoLop)
      setHeSoLopId()
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
          <Card
            title={
              <Button type="primary" onClick={() => {
                setModalType('add');
                setModalVisible(true);
              }}>Thêm hệ số</Button>}>
            <Table bordered columns={heSoColumns} dataSource={heSoLop} pagination={false} size="middle" />
            {/* <Divider type="vertical" /> */}
          </Card>
          <Card>
            <Table bordered columns={bangCapColumns} dataSource={heSoLopData} pagination={false} size="middle" />
          </Card>
        </ConfigProvider>
      </div>
      <Modal
        visible={modalVisible}
        onOk={handleModalOk}
        title={modalType === 'edit' ? 'Cập nhật hệ số lớp' : 'Thêm hệ số lớp'}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        width={500}>
        <Form form={form} layout="vertical">
          <Form.Item label="Số sinh viên" name="soHocSinhToiThieu" rules={[{ required: true, message: 'Vui lòng nhập khoảng sinh viên!' }]}>
            <InputNumber style={{ width: '100%' }} min={0} max={150} placeholder="Ví dụ: 80-89" />
          </Form.Item>
          <Form.Item label="Hệ số" name="heSo" rules={[{ required: true, message: 'Vui lòng nhập hệ số!' }]}>
            <InputNumber style={{ width: '100%' }} step={0.1} min={-1} max={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default HeSoLop;