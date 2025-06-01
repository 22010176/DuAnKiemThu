import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  DatePicker, 
  Select,
  Space,
  Popconfirm,
  message,
  Tag
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  CalendarOutlined,
  SearchOutlined 
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;

const HocKiPage = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedNamHoc, setSelectedNamHoc] = useState('');

  const [hocKyData, setHocKyData] = useState([
    {
      key: '1',
      id: 'HK1_2024',
      tenKy: 'Học kỳ 1',
      namHoc: '2024-2025',
      ngayBatDau: '2024-09-01',
      ngayKetThuc: '2024-12-30',
      trangThai: 'Đang diễn ra'
    },
    {
      key: '2',
      id: 'HK2_2024',
      tenKy: 'Học kỳ 2',
      namHoc: '2024-2025',
      ngayBatDau: '2025-01-15',
      ngayKetThuc: '2025-05-30',
      trangThai: 'Sắp diễn ra'
    },
    {
      key: '3',
      id: 'HK3_2024',
      tenKy: 'Học kỳ hè',
      namHoc: '2024-2025',
      ngayBatDau: '2025-06-15',
      ngayKetThuc: '2025-08-15',
      trangThai: 'Chưa bắt đầu'
    }
  ]);

  const namHocList = ['2023-2024', '2024-2025', '2025-2026'];

  const columns = [
    {
      title: 'Mã học kỳ',
      dataIndex: 'id',
      key: 'id',
      width: 120,
    },
    {
      title: 'Tên học kỳ',
      dataIndex: 'tenKy',
      key: 'tenKy',
      width: 150,
    },
    {
      title: 'Năm học',
      dataIndex: 'namHoc',
      key: 'namHoc',
      width: 120,
      align: 'center',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'ngayBatDau',
      key: 'ngayBatDau',
      width: 120,
      align: 'center',
      render: (date) => dayjs(date).format('DD/MM/YYYY')
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'ngayKetThuc',
      key: 'ngayKetThuc',
      width: 120,
      align: 'center',
      render: (date) => dayjs(date).format('DD/MM/YYYY')
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      width: 120,
      align: 'center',
      render: (status) => {
        let color = 'default';
        if (status === 'Đang diễn ra') color = 'green';
        else if (status === 'Sắp diễn ra') color = 'blue';
        else if (status === 'Đã kết thúc') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.key)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredData = hocKyData.filter(item => 
    !selectedNamHoc || item.namHoc === selectedNamHoc
  );

  const showModal = () => {
    setIsModalVisible(true);
    setEditingId(null);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setIsModalVisible(true);
    setEditingId(record.key);
    form.setFieldsValue({
      ...record,
      thoiGian: [dayjs(record.ngayBatDau), dayjs(record.ngayKetThuc)]
    });
  };

  const handleDelete = (key) => {
    setHocKyData(hocKyData.filter(item => item.key !== key));
    message.success('Xóa học kỳ thành công!');
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const newData = {
        key: editingId || Date.now().toString(),
        id: values.id,
        tenKy: values.tenKy,
        namHoc: values.namHoc,
        ngayBatDau: values.thoiGian[0].format('YYYY-MM-DD'),
        ngayKetThuc: values.thoiGian[1].format('YYYY-MM-DD'),
        trangThai: values.trangThai
      };

      if (editingId) {
        setHocKyData(hocKyData.map(item => 
          item.key === editingId ? newData : item
        ));
        message.success('Cập nhật học kỳ thành công!');
      } else {
        setHocKyData([...hocKyData, newData]);
        message.success('Thêm học kỳ thành công!');
      }

      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, color: '#1890ff' }}>
          <CalendarOutlined style={{ marginRight: '8px' }} />
          Quản lý học kỳ
        </h2>
      </div>

      {/* Bộ lọc và nút thêm */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div>
              <span style={{ marginRight: '8px', fontWeight: 'bold' }}>Năm học:</span>
              <Select
                placeholder="Chọn năm học"
                style={{ width: '150px' }}
                value={selectedNamHoc}
                onChange={setSelectedNamHoc}
                allowClear
              >
                {namHocList.map(nam => (
                  <Option key={nam} value={nam}>{nam}</Option>
                ))}
              </Select>
            </div>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Thêm học kỳ
          </Button>
        </div>
      </Card>

      {/* Bảng dữ liệu */}
      <Card
        title={
          <span>
            <CalendarOutlined style={{ marginRight: '8px' }} />
            Danh sách học kỳ
          </span>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} học kỳ`,
          }}
          scroll={{ x: 800 }}
          size="middle"
        />
      </Card>

      {/* Modal thêm/sửa */}
      <Modal
        title={editingId ? "Sửa học kỳ" : "Thêm học kỳ"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ trangThai: 'Chưa bắt đầu' }}
        >
          <Form.Item
            name="id"
            label="Mã học kỳ"
            rules={[{ required: true, message: 'Vui lòng nhập mã học kỳ!' }]}
          >
            <Input placeholder="Ví dụ: HK1_2024" />
          </Form.Item>

          <Form.Item
            name="tenKy"
            label="Tên học kỳ"
            rules={[{ required: true, message: 'Vui lòng nhập tên học kỳ!' }]}
          >
            <Input placeholder="Ví dụ: Học kỳ 1" />
          </Form.Item>

          <Form.Item
            name="namHoc"
            label="Năm học"
            rules={[{ required: true, message: 'Vui lòng chọn năm học!' }]}
          >
            <Select placeholder="Chọn năm học">
              {namHocList.map(nam => (
                <Option key={nam} value={nam}>{nam}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="thoiGian"
            label="Thời gian"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
          >
            <RangePicker 
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
            />
          </Form.Item>

          <Form.Item
            name="trangThai"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Option value="Chưa bắt đầu">Chưa bắt đầu</Option>
              <Option value="Sắp diễn ra">Sắp diễn ra</Option>
              <Option value="Đang diễn ra">Đang diễn ra</Option>
              <Option value="Đã kết thúc">Đã kết thúc</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HocKiPage;