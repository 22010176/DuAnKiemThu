import React from 'react';
import { Card, Table, Button, Select, Input, DatePicker, Space, Tabs, Statistic, Modal, Form, InputNumber, Divider, Tag, Tooltip, Row, Col } from 'antd';

const { Option } = Select;
const { TabPane } = Tabs;

// Sample data
const dinhMucData = [
  { key: '1', loaiTiet: 'Tiết chuẩn', soTien: 130000, ngayCapNhat: '2024-01-15', nguoiCapNhat: 'Admin', trangThai: 'Đang áp dụng' }
];

const lichSuDinhMucData = [
  { key: '1', soTien: 130000, ngayCapNhat: '2024-01-15', nguoiCapNhat: 'Admin', lyDo: 'Cập nhật theo quyết định số 123/QĐ-MTM' },
  { key: '2', soTien: 120000, ngayCapNhat: '2023-09-01', nguoiCapNhat: 'Admin', lyDo: 'Điều chỉnh theo lạm phát' }
];

const heSoLopData = [
  { key: '1', soSinhVien: '<20', heSo: -0.3, trangThai: 'Đang áp dụng' },
  { key: '2', soSinhVien: '20-29', heSo: -0.2, trangThai: 'Đang áp dụng' },
  { key: '3', soSinhVien: '30-39', heSo: -0.1, trangThai: 'Đang áp dụng' },
  { key: '4', soSinhVien: '40-49', heSo: 0, trangThai: 'Đang áp dụng' },
  { key: '5', soSinhVien: '50-59', heSo: 0.1, trangThai: 'Đang áp dụng' },
  { key: '6', soSinhVien: '60-69', heSo: 0.2, trangThai: 'Đang áp dụng' },
  { key: '7', soSinhVien: '70-79', heSo: 0.3, trangThai: 'Đang áp dụng' }
];

const tienDayData = [
  {
    key: '1',
    maGV: 'GV001',
    tenGV: 'Nguyễn Văn A',
    bangCap: 'Thạc sỹ',
    khoa: 'Công nghệ thông tin',
    soLop: 2,
    tongTien: 15000000,
    chiTiet: [
      { maLop: 'IT001.01', tenHP: 'Lập trình Java', soTiet: 45, soSV: 55, heSoHP: 1.0, tienDay: 9652500 },
      { maLop: 'IT002.01', tenHP: 'Cơ sở dữ liệu', soTiet: 30, soSV: 42, heSoHP: 1.2, tienDay: 5347500 }
    ]
  },
  {
    key: '2',
    maGV: 'GV002',
    tenGV: 'Trần Thị B',
    bangCap: 'Tiến sỹ',
    khoa: 'Toán học',
    soLop: 1,
    tongTien: 7956000,
    chiTiet: [
      { maLop: 'MT001.01', tenHP: 'Giải tích', soTiet: 30, soSV: 43, heSoHP: 1.2, tienDay: 7956000 }
    ]
  }
];

const TinhTienDay = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState('');
  const [detailModalVisible, setDetailModalVisible] = React.useState(false);
  const [selectedTeacher, setSelectedTeacher] = React.useState(null);
  const [form] = Form.useForm();

  const dinhMucColumns = [
    { title: 'Loại tiết', dataIndex: 'loaiTiet', key: 'loaiTiet', },
    { title: 'Số tiền (VNĐ)', dataIndex: 'soTien', key: 'soTien', render: (value) => value.toLocaleString('vi-VN') },
    { title: 'Ngày cập nhật', dataIndex: 'ngayCapNhat', key: 'ngayCapNhat', },
    { title: 'Người cập nhật', dataIndex: 'nguoiCapNhat', key: 'nguoiCapNhat', },
    { title: 'Trạng thái', dataIndex: 'trangThai', key: 'trangThai', render: (status) => <Tag color="green">{status}</Tag> },
    {
      title: 'Thao tác',
      key: 'action',
      render: () => (
        <Button type="primary" size="small" onClick={() => {
          setModalType('dinhMuc');
          setModalVisible(true);
        }}>
          <i className="fas fa-edit"></i> Cập nhật
        </Button>
      ),
    },
  ];

  const lichSuColumns = [
    { title: 'Số tiền (VNĐ)', dataIndex: 'soTien', key: 'soTien', render: (value) => value.toLocaleString('vi-VN') },
    { title: 'Ngày cập nhật', dataIndex: 'ngayCapNhat', key: 'ngayCapNhat', },
    { title: 'Người cập nhật', dataIndex: 'nguoiCapNhat', key: 'nguoiCapNhat', },
    { title: 'Lý do', dataIndex: 'lyDo', key: 'lyDo', }
  ];

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
      title: 'Trạng thái', dataIndex: 'trangThai', key: 'trangThai',
      render: (status) => <Tag color="green">{status}</Tag>
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

  const tienDayColumns = [
    { title: 'Mã GV', dataIndex: 'maGV', key: 'maGV', },
    { title: 'Tên giáo viên', dataIndex: 'tenGV', key: 'tenGV', },
    { title: 'Bằng cấp', dataIndex: 'bangCap', key: 'bangCap', render: (value) => <Tag color="blue">{value}</Tag> },
    { title: 'Khoa', dataIndex: 'khoa', key: 'khoa', },
    { title: 'Số lớp', dataIndex: 'soLop', key: 'soLop', render: (value) => <Tag color="orange">{value} lớp</Tag> },
    {
      title: 'Tổng tiền (VNĐ)', dataIndex: 'tongTien', key: 'tongTien', render: (value) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
          {value.toLocaleString('vi-VN')}
        </span>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => {
          setSelectedTeacher(record);
          setDetailModalVisible(true);
        }}>
          <i className="fas fa-eye"></i> Chi tiết
        </Button>
      ),
    },
  ];

  const chiTietColumns = [
    { title: 'Mã lớp', dataIndex: 'maLop', key: 'maLop', },
    { title: 'Tên học phần', dataIndex: 'tenHP', key: 'tenHP', },
    { title: 'Số tiết', dataIndex: 'soTiet', key: 'soTiet', },
    { title: 'Số SV', dataIndex: 'soSV', key: 'soSV', },
    { title: 'Hệ số HP', dataIndex: 'heSoHP', key: 'heSoHP', },
    { title: 'Tiền dạy (VNĐ)', dataIndex: 'tienDay', key: 'tienDay', render: (value) => value.toLocaleString('vi-VN') }
  ];

  const handleModalOk = () => {
    form.validateFields().then(() => {
      setModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, color: '#1890ff' }}>
          <i className="fas fa-calculator"></i> UC3 - Tính Tiền Dạy
        </h2>
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab={<span><i className="fas fa-money-bill-wave"></i> Định mức tiền</span>} key="1">
          <Card title="Định mức tiền theo tiết chuẩn">
            <Table columns={dinhMucColumns} dataSource={dinhMucData} pagination={false} size="middle" />
          </Card>

          <Card title="Lịch sử cập nhật định mức" style={{ marginTop: '16px' }}>
            <Table size="middle" columns={lichSuColumns} dataSource={lichSuDinhMucData} pagination={{ pageSize: 5 }} />
          </Card>
        </TabPane>

        <TabPane tab={<span><i className="fas fa-users"></i> Hệ số lớp</span>} key="2">
          <Card
            title="Quản lý hệ số lớp theo số sinh viên"
            extra={
              <Button type="primary" onClick={() => {
                setModalType('addHeSo');
                setModalVisible(true);
              }}>
                <i className="fas fa-plus"></i> Thêm hệ số
              </Button>
            }>
            <Table columns={heSoColumns} dataSource={heSoLopData} pagination={false} size="middle" />
          </Card>
        </TabPane>

        <TabPane key="3" tab={<span><i className="fas fa-calculator"></i> Tính tiền dạy</span>}>
          <Card title="Bộ lọc tính tiền dạy">
            <Row gutter={16}>
              <Col span={6}>
                <Select placeholder="Chọn khoa" style={{ width: '100%' }}>
                  <Option value="all">Toàn trường</Option>
                  <Option value="cntt">Công nghệ thông tin</Option>
                  <Option value="toan">Toán học</Option>
                  <Option value="ly">Vật lý</Option>
                </Select>
              </Col>
              <Col span={6}>
                <Select placeholder="Năm học" style={{ width: '100%' }}>
                  <Option value="2023-2024">2023-2024</Option>
                  <Option value="2024-2025">2024-2025</Option>
                </Select>
              </Col>
              <Col span={6}>
                <Select placeholder="Kì học" style={{ width: '100%' }}>
                  <Option value="1">Kì 1</Option>
                  <Option value="2">Kì 2</Option>
                  <Option value="3">Kì hè</Option>
                </Select>
              </Col>
              <Col span={6}>
                <Button type="primary" style={{ width: '100%' }}>
                  <i className="fas fa-search"></i> Tìm kiếm
                </Button>
              </Col>
            </Row>
          </Card>

          <Card title="Kết quả tính tiền dạy" style={{ marginTop: '16px' }}>
            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col span={8}>
                <Statistic title="Tổng số giáo viên" value={2} prefix={<i className="fas fa-user-tie"></i>} />
              </Col>
              <Col span={8}>
                <Statistic title="Tổng số lớp" value={3} prefix={<i className="fas fa-chalkboard-teacher"></i>} />
              </Col>
              <Col span={8}>
                <Statistic title="Tổng tiền chi trả" value={22956000} prefix={<i className="fas fa-money-bill-wave"></i>} formatter={(value) => value.toLocaleString('vi-VN') + ' VNĐ'} />
              </Col>
            </Row>

            <Table columns={tienDayColumns} dataSource={tienDayData} pagination={{ pageSize: 10 }} size="middle" />
          </Card>
        </TabPane>
      </Tabs>

      {/* Modal cập nhật định mức */}
      <Modal
        visible={modalVisible}
        onOk={handleModalOk}
        title={
          modalType === 'dinhMuc' ? 'Cập nhật định mức tiền' :
            modalType === 'heSo' ? 'Cập nhật hệ số lớp' :
              'Thêm hệ số lớp'
        }
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        width={500}>
        <Form form={form} layout="vertical">
          {modalType === 'dinhMuc' && (
            <>
              <Form.Item label="Số tiền cho 1 tiết chuẩn (VNĐ)" name="soTien" rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}>
                <InputNumber style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
              </Form.Item>
              <Form.Item label="Lý do cập nhật" name="lyDo" rules={[{ required: true, message: 'Vui lòng nhập lý do!' }]}>
                <Input.TextArea rows={3} />
              </Form.Item>
            </>
          )}

          {(modalType === 'heSo' || modalType === 'addHeSo') && (
            <>
              <Form.Item label="Số sinh viên" name="soSinhVien" rules={[{ required: true, message: 'Vui lòng nhập khoảng sinh viên!' }]}>
                <Input placeholder="Ví dụ: 80-89" />
              </Form.Item>
              <Form.Item label="Hệ số" name="heSo" rules={[{ required: true, message: 'Vui lòng nhập hệ số!' }]}>
                <InputNumber style={{ width: '100%' }} step={0.1} min={-1} max={2} />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>

      {/* Modal chi tiết tính tiền */}
      <Modal
        title={`Chi tiết tính tiền - ${selectedTeacher?.tenGV}`}
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>
        ]}
        width={800}
      >
        {selectedTeacher && (
          <>
            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col span={12}>
                <Card size="small">
                  <Statistic title="Bằng cấp" value={selectedTeacher.bangCap} valueStyle={{ fontSize: '16px' }} />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <Statistic title="Tổng tiền" value={selectedTeacher.tongTien} formatter={(value) => value.toLocaleString('vi-VN') + ' VNĐ'} valueStyle={{ color: '#1890ff', fontSize: '16px' }} />
                </Card>
              </Col>
            </Row>

            <Divider>Chi tiết các lớp dạy</Divider>

            <Table columns={chiTietColumns} dataSource={selectedTeacher.chiTiet} pagination={false} size="small" />

            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
              <h4>Công thức tính:</h4>
              <p><strong>Tiền dạy mỗi lớp = Số tiết quy đổi × Hệ số giáo viên × Tiền dạy một tiết</strong></p>
              <p><strong>Số tiết quy đổi = Số tiết thực tế × (Hệ số học phần + Hệ số lớp)</strong></p>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default TinhTienDay;