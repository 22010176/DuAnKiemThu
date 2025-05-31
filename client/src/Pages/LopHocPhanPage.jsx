import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  InputNumber, 
  Space, 
  Card, 
  Row, 
  Col, 
  Tag, 
  Tooltip,
  message,
  Divider,
  Checkbox
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  UserAddOutlined,
  CopyOutlined,
  FilterOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;

const LopHocPhanPage = () => {
  const [form] = Form.useForm();
  const [bulkForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBulkModalVisible, setIsBulkModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filters, setFilters] = useState({
    khoa: '',
    namHoc: '',
    ky: '',
    trangThai: ''
  });

  // Mock data
  const [data, setData] = useState([
    {
      id: 1,
      maLop: 'CNTT01_01',
      tenLop: 'Lập trình Java - Lớp 1',
      hocPhan: 'Lập trình Java',
      maHocPhan: 'CNTT01',
      khoa: 'Công nghệ thông tin',
      ky: 'Kỳ 1',
      namHoc: '2024-2025',
      soSinhVien: 45,
      soTinChi: 3,
      trangThai: 'Đang mở',
      giangVien: 'Nguyễn Văn A'
    },
    {
      id: 2,
      maLop: 'CNTT02_01',
      tenLop: 'Cơ sở dữ liệu - Lớp 1',
      hocPhan: 'Cơ sở dữ liệu',
      maHocPhan: 'CNTT02',
      khoa: 'Công nghệ thông tin',
      ky: 'Kỳ 1',
      namHoc: '2024-2025',
      soSinhVien: 40,
      soTinChi: 3,
      trangThai: 'Chưa phân công',
      giangVien: null
    }
  ]);

  const khoaOptions = ['Công nghệ thông tin', 'Kinh tế', 'Ngoại ngữ', 'Cơ khí'];
  const namHocOptions = ['2024-2025', '2023-2024', '2022-2023'];
  const kyOptions = ['Kỳ 1', 'Kỳ 2', 'Kỳ hè'];
  const trangThaiOptions = ['Đang mở', 'Chưa phân công', 'Đã đóng'];
  const hocPhanOptions = [
    { ma: 'CNTT01', ten: 'Lập trình Java', tinChi: 3 },
    { ma: 'CNTT02', ten: 'Cơ sở dữ liệu', tinChi: 3 },
    { ma: 'CNTT03', ten: 'Mạng máy tính', tinChi: 2 },
    { ma: 'KT01', ten: 'Kinh tế vi mô', tinChi: 3 }
  ];

  const columns = [
    {
      title: 'Mã lớp',
      dataIndex: 'maLop',
      key: 'maLop',
      width: 120,
    },
    {
      title: 'Tên lớp',
      dataIndex: 'tenLop',
      key: 'tenLop',
      width: 200,
    },
    {
      title: 'Học phần',
      dataIndex: 'hocPhan',
      key: 'hocPhan',
      width: 150,
    },
    {
      title: 'Khoa',
      dataIndex: 'khoa',
      key: 'khoa',
      width: 150,
    },
    {
      title: 'Kỳ/Năm',
      key: 'kyNam',
      width: 120,
      render: (record) => `${record.ky} - ${record.namHoc}`
    },
    {
      title: 'SV',
      dataIndex: 'soSinhVien',
      key: 'soSinhVien',
      width: 60,
      align: 'center'
    },
    {
      title: 'Tín chỉ',
      dataIndex: 'soTinChi',
      key: 'soTinChi',
      width: 70,
      align: 'center'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      width: 120,
      render: (trangThai) => {
        let color = trangThai === 'Đang mở' ? 'green' : 
                   trangThai === 'Chưa phân công' ? 'orange' : 'red';
        return <Tag color={color}>{trangThai}</Tag>;
      }
    },
    {
      title: 'Giảng viên',
      dataIndex: 'giangVien',
      key: 'giangVien',
      width: 150,
      render: (giangVien) => giangVien || <Tag color="orange">Chưa phân công</Tag>
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Sửa">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleBulkAdd = () => {
    bulkForm.resetFields();
    setIsBulkModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa lớp học phần này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => {
        setData(data.filter(item => item.id !== id));
        message.success('Xóa thành công!');
      }
    });
  };

  const handleSubmit = (values) => {
    const selectedHocPhan = hocPhanOptions.find(hp => hp.ma === values.maHocPhan);
    
    if (editingRecord) {
      setData(data.map(item => 
        item.id === editingRecord.id 
          ? { 
              ...item, 
              ...values,
              hocPhan: selectedHocPhan?.ten,
              soTinChi: selectedHocPhan?.tinChi
            }
          : item
      ));
      message.success('Cập nhật thành công!');
    } else {
      const newRecord = {
        id: Date.now(),
        ...values,
        hocPhan: selectedHocPhan?.ten,
        soTinChi: selectedHocPhan?.tinChi,
        giangVien: null
      };
      setData([...data, newRecord]);
      message.success('Thêm mới thành công!');
    }
    setIsModalVisible(false);
  };

  const handleBulkSubmit = (values) => {
    const selectedHocPhan = hocPhanOptions.find(hp => hp.ma === values.maHocPhan);
    const newRecords = [];
    
    for (let i = 1; i <= values.soLop; i++) {
      newRecords.push({
        id: Date.now() + i,
        maLop: `${values.maHocPhan}_${i.toString().padStart(2, '0')}`,
        tenLop: `${selectedHocPhan?.ten} - Lớp ${i}`,
        hocPhan: selectedHocPhan?.ten,
        maHocPhan: values.maHocPhan,
        khoa: values.khoa,
        ky: values.ky,
        namHoc: values.namHoc,
        soSinhVien: values.soSinhVien,
        soTinChi: selectedHocPhan?.tinChi,
        trangThai: 'Đang mở',
        giangVien: null
      });
    }
    
    setData([...data, ...newRecords]);
    message.success(`Tạo thành công ${values.soLop} lớp học phần!`);
    setIsBulkModalVisible(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredData = data.filter(item => {
    return (!filters.khoa || item.khoa === filters.khoa) &&
           (!filters.namHoc || item.namHoc === filters.namHoc) &&
           (!filters.ky || item.ky === filters.ky) &&
           (!filters.trangThai || item.trangThai === filters.trangThai);
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    getCheckboxProps: (record) => ({
      disabled: record.trangThai !== 'Đang mở'
    }),
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <h2 style={{ margin: 0, color: '#001529' }}>Quản lý Lớp Học Phần</h2>
            </Col>
            <Col>
              <Space>
                <Button 
                  type="default" 
                  icon={<CopyOutlined />}
                  onClick={handleBulkAdd}
                >
                  Tạo hàng loạt
                </Button>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={handleAdd}
                >
                  Thêm lớp
                </Button>
                <Button 
                  type="primary"
                  icon={<UserAddOutlined />}
                  disabled={selectedRowKeys.length === 0}
                  onClick={() => {
                    // Navigate to PhanCongGVPage with selected classes
                    message.info('Chuyển đến trang phân công giảng viên...');
                  }}
                >
                  Phân công GV ({selectedRowKeys.length})
                </Button>
              </Space>
            </Col>
          </Row>
        </div>

        {/* Filters */}
        <Card size="small" style={{ marginBottom: '16px', backgroundColor: '#fafafa' }}>
          <Row gutter={16} align="middle">
            <Col span={4}>
              <Select
                placeholder="Chọn khoa"
                allowClear
                style={{ width: '100%' }}
                value={filters.khoa}
                onChange={(value) => handleFilterChange('khoa', value)}
              >
                {khoaOptions.map(khoa => (
                  <Option key={khoa} value={khoa}>{khoa}</Option>
                ))}
              </Select>
            </Col>
            <Col span={4}>
              <Select
                placeholder="Chọn năm học"
                allowClear
                style={{ width: '100%' }}
                value={filters.namHoc}
                onChange={(value) => handleFilterChange('namHoc', value)}
              >
                {namHocOptions.map(nam => (
                  <Option key={nam} value={nam}>{nam}</Option>
                ))}
              </Select>
            </Col>
            <Col span={4}>
              <Select
                placeholder="Chọn kỳ"
                allowClear
                style={{ width: '100%' }}
                value={filters.ky}
                onChange={(value) => handleFilterChange('ky', value)}
              >
                {kyOptions.map(ky => (
                  <Option key={ky} value={ky}>{ky}</Option>
                ))}
              </Select>
            </Col>
            <Col span={4}>
              <Select
                placeholder="Trạng thái"
                allowClear
                style={{ width: '100%' }}
                value={filters.trangThai}
                onChange={(value) => handleFilterChange('trangThai', value)}
              >
                {trangThaiOptions.map(tt => (
                  <Option key={tt} value={tt}>{tt}</Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <Search 
                placeholder="Tìm kiếm theo tên lớp, mã lớp..." 
                allowClear
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={2}>
              <Button icon={<FilterOutlined />} type="text">
                Lọc
              </Button>
            </Col>
          </Row>
        </Card>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          scroll={{ x: 1200 }}
          rowSelection={rowSelection}
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} lớp học phần`
          }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editingRecord ? 'Sửa lớp học phần' : 'Thêm lớp học phần'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="maLop"
                label="Mã lớp"
                rules={[{ required: true, message: 'Vui lòng nhập mã lớp!' }]}
              >
                <Input placeholder="VD: CNTT01_01" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tenLop"
                label="Tên lớp"
                rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}
              >
                <Input placeholder="VD: Lập trình Java - Lớp 1" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="maHocPhan"
                label="Học phần"
                rules={[{ required: true, message: 'Vui lòng chọn học phần!' }]}
              >
                <Select placeholder="Chọn học phần">
                  {hocPhanOptions.map(hp => (
                    <Option key={hp.ma} value={hp.ma}>
                      {hp.ma} - {hp.ten} ({hp.tinChi} TC)
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="khoa"
                label="Khoa"
                rules={[{ required: true, message: 'Vui lòng chọn khoa!' }]}
              >
                <Select placeholder="Chọn khoa">
                  {khoaOptions.map(khoa => (
                    <Option key={khoa} value={khoa}>{khoa}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="ky"
                label="Kỳ học"
                rules={[{ required: true, message: 'Vui lòng chọn kỳ!' }]}
              >
                <Select placeholder="Chọn kỳ">
                  {kyOptions.map(ky => (
                    <Option key={ky} value={ky}>{ky}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="namHoc"
                label="Năm học"
                rules={[{ required: true, message: 'Vui lòng chọn năm học!' }]}
              >
                <Select placeholder="Chọn năm học">
                  {namHocOptions.map(nam => (
                    <Option key={nam} value={nam}>{nam}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="soSinhVien"
                label="Số sinh viên"
                rules={[{ required: true, message: 'Vui lòng nhập số sinh viên!' }]}
              >
                <InputNumber 
                  min={1} 
                  max={100} 
                  placeholder="45"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="trangThai"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select placeholder="Chọn trạng thái">
              {trangThaiOptions.map(tt => (
                <Option key={tt} value={tt}>{tt}</Option>
              ))}
            </Select>
          </Form.Item>

          <Divider />
          
          <Row justify="end" gutter={8}>
            <Col>
              <Button onClick={() => setIsModalVisible(false)}>
                Hủy
              </Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                {editingRecord ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Bulk Add Modal */}
      <Modal
        title="Tạo hàng loạt lớp học phần"
        open={isBulkModalVisible}
        onCancel={() => setIsBulkModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={bulkForm}
          layout="vertical"
          onFinish={handleBulkSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="maHocPhan"
                label="Học phần"
                rules={[{ required: true, message: 'Vui lòng chọn học phần!' }]}
              >
                <Select placeholder="Chọn học phần">
                  {hocPhanOptions.map(hp => (
                    <Option key={hp.ma} value={hp.ma}>
                      {hp.ma} - {hp.ten} ({hp.tinChi} TC)
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="khoa"
                label="Khoa"
                rules={[{ required: true, message: 'Vui lòng chọn khoa!' }]}
              >
                <Select placeholder="Chọn khoa">
                  {khoaOptions.map(khoa => (
                    <Option key={khoa} value={khoa}>{khoa}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="ky"
                label="Kỳ học"
                rules={[{ required: true, message: 'Vui lòng chọn kỳ!' }]}
              >
                <Select placeholder="Chọn kỳ">
                  {kyOptions.map(ky => (
                    <Option key={ky} value={ky}>{ky}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="namHoc"
                label="Năm học"
                rules={[{ required: true, message: 'Vui lòng chọn năm học!' }]}
              >
                <Select placeholder="Chọn năm học">
                  {namHocOptions.map(nam => (
                    <Option key={nam} value={nam}>{nam}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="soLop"
                label="Số lớp cần tạo"
                rules={[{ required: true, message: 'Vui lòng nhập số lớp!' }]}
              >
                <InputNumber 
                  min={1} 
                  max={10} 
                  placeholder="3"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="soSinhVien"
            label="Số sinh viên mỗi lớp"
            rules={[{ required: true, message: 'Vui lòng nhập số sinh viên!' }]}
          >
            <InputNumber 
              min={1} 
              max={100} 
              placeholder="45"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Divider />
          
          <Row justify="end" gutter={8}>
            <Col>
              <Button onClick={() => setIsBulkModalVisible(false)}>
                Hủy
              </Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                Tạo lớp
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default LopHocPhanPage;