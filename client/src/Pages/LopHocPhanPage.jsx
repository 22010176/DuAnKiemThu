import { CheckOutlined, SearchOutlined } from '@ant-design/icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faFilter, faPen, faPlus, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Button, Card, Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Space, Table, Tag, Tooltip, Typography, message } from 'antd';
import { useState } from 'react';
// import { u } from 'react-router/dist/development/route-data-B9_30zbP';

const { Option } = Select;
const { Search, } = Input;
const { Title, Text } = Typography;

const LopHocPhanPage = () => {
  const [form] = Form.useForm();
  const [bulkForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBulkModalVisible, setIsBulkModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filters, setFilters] = useState({ khoa: '', namHoc: '', ky: '', trangThai: '' });

  // Mock data
  const [data, setData] = useState([
    { id: 1, maLop: 'CNTT01_01', tenLop: 'Lập trình Java - Lớp 1', hocPhan: 'Lập trình Java', maHocPhan: 'CNTT01', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 45, soTinChi: 3, trangThai: 'Đã phân công', giangVien: 'Nguyễn Văn A' },
    { id: 2, maLop: 'CNTT02_01', tenLop: 'Cơ sở dữ liệu - Lớp 1', hocPhan: 'Cơ sở dữ liệu', maHocPhan: 'CNTT02', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 40, soTinChi: 3, trangThai: 'Chưa phân công', giangVien: null }
  ]);

  const khoaOptions = ['Công nghệ thông tin', 'Kinh tế', 'Ngoại ngữ', 'Cơ khí'];
  const namHocOptions = ['2024-2025', '2023-2024', '2022-2023'];
  const kyOptions = ['Kỳ 1', 'Kỳ 2', 'Kỳ hè'];
  const trangThaiOptions = ['Đã phân công', 'Chưa phân công'];
  const hocPhanOptions = [
    { ma: 'CNTT01', ten: 'Lập trình Java', tinChi: 3 },
    { ma: 'CNTT02', ten: 'Cơ sở dữ liệu', tinChi: 3 },
    { ma: 'CNTT03', ten: 'Mạng máy tính', tinChi: 2 },
    { ma: 'KT01', ten: 'Kinh tế vi mô', tinChi: 3 }
  ];

  const columns = [
    { title: <p className='text-lg font-semibold'>STT</p>, key: 'stt', width: 70, align: 'center', render: (_, __, index) => index + 1, },
    { title: <p className='text-lg font-semibold'>Mã lớp</p>, dataIndex: 'maLop', key: 'maLop', width: 120, },
    { title: <p className='text-lg font-semibold'>Tên lớp</p>, dataIndex: 'tenLop', key: 'tenLop', width: 200, },
    { title: <p className='text-lg font-semibold'>Học phần</p>, dataIndex: 'hocPhan', key: 'hocPhan', width: 150, },
    { title: <p className='text-lg font-semibold'>Khoa</p>, dataIndex: 'khoa', key: 'khoa', width: 150, },
    { title: <p className='text-lg font-semibold'>Học kì</p>, key: 'hocKi', width: 120, render: (record) => `${record.ky} (${record.namHoc})` },
    { title: <p className='text-lg font-semibold'>Sinh viên</p>, dataIndex: 'soSinhVien', key: 'soSinhVien', width: 90, align: 'center' },
    { title: <p className='text-lg font-semibold'>Tín chỉ</p>, dataIndex: 'soTinChi', key: 'soTinChi', width: 70, align: 'center' },
    {
      title: <p className='text-lg font-semibold'>Trạng thái</p>, dataIndex: 'trangThai', key: 'trangThai', width: 120, render: (trangThai) => {
        let color = trangThai === 'Đã phân công' ? 'green' : (trangThai === 'Chưa phân công' ? 'orange' : 'red');
        return <Tag color={color}>{trangThai}</Tag>;
      }
    }, {
      title: <p className='text-lg font-semibold'>Giáo viên</p>, dataIndex: 'giangVien', key: 'giangVien', width: 150, render: (giangVien) => giangVien || <Tag color="orange">Chưa phân công</Tag>
    }, {
      title: <p className='text-lg font-semibold'>Thao tác</p>, key: 'action', width: 120, fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title="Sửa">
            <Button variant='outlined' color='blue' type="text" icon={<FontAwesomeIcon icon={faPen} />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button variant='outlined' color='red' type="text" danger icon={<FontAwesomeIcon icon={faTrash} />} onClick={() => handleDelete(record.id)} />
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
        trangThai: 'Chưa phân công',
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
      disabled: record.trangThai !== 'Chưa phân công',
    }),
  };
  const selectedTeacher = {};
  const selectedClasses = []
  return (
    <>
      <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Card>
          <div style={{ marginBottom: '16px' }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Space>
                  <Button type="default" icon={<FontAwesomeIcon icon={faCopy} />} onClick={handleBulkAdd}>
                    Tạo hàng loạt
                  </Button>
                  <Button type="primary" icon={<FontAwesomeIcon icon={faPlus} />} onClick={handleAdd}>
                    Thêm lớp
                  </Button>
                  <Button type="primary" icon={<FontAwesomeIcon icon={faUserPlus} />}
                    disabled={selectedRowKeys.length === 0} onClick={() => { }}>
                    Phân công giảng viên ({selectedRowKeys.length})
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>

          {/* Filters */}
          <Card size="small" style={{ marginBottom: '16px', backgroundColor: '#fafafa' }}>
            <Row gutter={16} align="middle">
              <Col span={4}>
                <Select placeholder="Chọn khoa" allowClear style={{ width: '100%' }} value={undefined} onChange={(value) => handleFilterChange('khoa', value)}>
                  {khoaOptions.map(khoa => <Option key={khoa} value={khoa}>{khoa}</Option>)}
                </Select>
              </Col>
              <Col span={4}>
                <Select placeholder="Chọn năm học" allowClear style={{ width: '100%' }} value={undefined} onChange={(value) => handleFilterChange('namHoc', value)}>
                  {namHocOptions.map(nam => <Option key={nam} value={nam}>{nam}</Option>)}
                </Select>
              </Col>
              <Col span={4}>
                <Select placeholder="Chọn kỳ" allowClear style={{ width: '100%' }} value={undefined} onChange={(value) => handleFilterChange('ky', value)}>
                  {kyOptions.map(ky => <Option key={ky} value={ky}>{ky}</Option>)}
                </Select>
              </Col>
              <Col span={4}>
                <Select placeholder="Chọn trạng thái" allowClear style={{ width: '100%' }} value={undefined} onChange={(value) => handleFilterChange('trangThai', value)}>
                  {trangThaiOptions.map(tt => <Option key={tt} value={tt}>{tt}</Option>)}
                </Select>
              </Col>
              <Col span={6}>
                <Search placeholder="Tìm kiếm theo tên lớp, mã lớp..." allowClear style={{ width: '100%' }} />
              </Col>
              <Col span={2}>
                <Button icon={<FontAwesomeIcon icon={faFilter} />} type="text">
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
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} lớp học phần`
            }}
          />
        </Card>

      </div>
      {/* Add/Edit Modal */}
      <Modal
        title={<h1 className="text-xl font-bold text-blue-900 uppercase">{editingRecord ? 'Sửa lớp học phần' : 'Thêm lớp học phần mới'}</h1>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button htmlType="submit" className="w-min self-end" variant="solid" color="orange"
            onClick={handleSubmit} key="submit">
            Hoàn thành
            {<FontAwesomeIcon icon={faCheck} />}
          </Button>
        ]}
        width={600}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="maLop" label="Mã lớp" rules={[{ required: true }]}>
                <Input disabled placeholder="VD: CNTT01_01" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="tenLop" label="Tên lớp" rules={[{ required: true }]}>
                <Input disabled placeholder="VD: Lập trình Java - Lớp 1" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="khoa" label="Khoa" rules={[{ required: true }]}>
                <Select placeholder="Chọn khoa">
                  {khoaOptions.map(khoa => (
                    <Option key={khoa} value={khoa}>{khoa}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="maHocPhan" label="Học phần" rules={[{ required: true }]}>
                <Select placeholder="Chọn học phần">
                  {hocPhanOptions.map(hp => <Option key={hp.ma} value={hp.ma}>{hp.ma} - {hp.ten} ({hp.tinChi} TC)</Option>)}
                </Select>
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="namHoc" label="Năm học" rules={[{ required: true }]}>
                <Select placeholder="Chọn năm học">
                  {namHocOptions.map(nam => <Option key={nam} value={nam}>{nam}</Option>)}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="ky" label="Kỳ học" rules={[{ required: true }]}>
                <Select placeholder="Chọn kỳ">
                  {kyOptions.map(ky => <Option key={ky} value={ky}>{ky}</Option>)}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="soSinhVien" label="Số sinh viên" rules={[{ required: true }]}>
                <InputNumber min={1} max={100} placeholder="45" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Bulk Add Modal */}
      <Modal
        title={<h1 className="text-xl font-bold text-blue-900 uppercase">Tạo hàng loạt lớp học phần</h1>}
        open={isBulkModalVisible}
        onCancel={() => setIsBulkModalVisible(false)}
        footer={[
          <Button htmlType="submit" className="w-min self-end" variant="solid" color="orange" onClick={handleSubmit} key="submit">
            Hoàn thành
            {<FontAwesomeIcon icon={faCheck} />}
          </Button>
        ]}
        width={600}>
        <Form form={bulkForm} layout="vertical" onFinish={handleBulkSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="khoa" label="Khoa" rules={[{ required: true }]}>
                <Select placeholder="Chọn khoa">
                  {khoaOptions.map(khoa => <Option key={khoa} value={khoa}>{khoa}</Option>)}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="maHocPhan" label="Học phần" rules={[{ required: true }]}>
                <Select placeholder="Chọn học phần">
                  {hocPhanOptions.map(hp => <Option key={hp.ma} value={hp.ma}>{hp.ma} - {hp.ten} ({hp.tinChi} TC)</Option>)}
                </Select>
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="namHoc" label="Năm học" rules={[{ required: true }]}>
                <Select placeholder="Chọn năm học">
                  {namHocOptions.map(nam => <Option key={nam} value={nam}>{nam}</Option>)}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="ky" label="Kỳ học" rules={[{ required: true }]}>
                <Select placeholder="Chọn kỳ">
                  {kyOptions.map(ky => (
                    <Option key={ky} value={ky}>{ky}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="soLop" label="Số lớp cần tạo" rules={[{ required: true }]}>
                <InputNumber min={1} max={10} placeholder="3" style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="soSinhVien" label="Số sinh viên mỗi lớp" rules={[{ required: true }]}>
                <InputNumber min={1} max={100} placeholder="45" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

        </Form>
      </Modal>

      {/* Assignment Modal */}
      <Modal title="Phân công giảng viên" open={false} onCancel={() => { }} footer={[]} width={700}>
        <div style={{ marginBottom: '16px' }}>
          <Title level={4}>Danh sách lớp được chọn:</Title>
          <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #d9d9d9', padding: '8px', borderRadius: '4px' }}>
            {selectedClasses?.map(cls => (
              <div key={cls?.id} style={{ padding: '4px 0', borderBottom: '1px solid #f0f0f0' }}>
                <Space>
                  <Tag color="blue">{cls?.maLop}</Tag>
                  <Text>{cls?.tenLop}</Text>
                  <Text type="secondary">({cls?.soSinhVien} SV)</Text>
                </Space>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        <div style={{ marginBottom: '16px' }}>
          <Title level={4}>Chọn giảng viên:</Title>
          <AutoComplete style={{ width: '100%' }} options={[]} placeholder="Nhập mã GV hoặc tên giảng viên để tìm kiếm...">
            <Input suffix={<SearchOutlined />} />
          </AutoComplete>
        </div>

        {selectedTeacher && (
          <Card size="small" style={{ marginBottom: '16px', backgroundColor: '#f6ffed', border: '1px solid #b7eb8f' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Space direction="vertical" size="small">
                  <Text><strong>Mã GV:</strong> {selectedTeacher?.id}</Text>
                  <Text><strong>Tên:</strong> {selectedTeacher?.name}</Text>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical" size="small">
                  <Text><strong>Khoa:</strong> {selectedTeacher?.khoa}</Text>
                  <Text><strong>Email:</strong> {selectedTeacher?.email}</Text>
                </Space>
              </Col>
            </Row>
          </Card>
        )}

        <Divider />

        <Row justify="end" gutter={8}>
          <Col>
            <Button onClick={() => { }}>
              Hủy
            </Button>
          </Col>
          <Col>
            <Button type="primary" icon={<CheckOutlined />}>
              Xác nhận phân công
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default LopHocPhanPage;