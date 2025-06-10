import { Button, Card, Col, Divider, Modal, Row, Select, Statistic, Table, Tag } from 'antd';
import React from 'react';

const { Option } = Select;

const tienDayData = [
  {
    key: '1', maGV: 'GV001', tenGV: 'Nguyễn Văn A', bangCap: 'Thạc sỹ', khoa: 'Công nghệ thông tin', soLop: 2, tongTien: 15000000,
    chiTiet: [
      { maLop: 'IT001.01', tenHP: 'Lập trình Java', soTiet: 45, soSV: 55, heSoHP: 1.0, tienDay: 9652500 },
      { maLop: 'IT002.01', tenHP: 'Cơ sở dữ liệu', soTiet: 30, soSV: 42, heSoHP: 1.2, tienDay: 5347500 }
    ]
  },
  {
    key: '2', maGV: 'GV002', tenGV: 'Trần Thị B', bangCap: 'Tiến sỹ', khoa: 'Toán học', soLop: 1, tongTien: 7956000,
    chiTiet: [
      { maLop: 'MT001.01', tenHP: 'Giải tích', soTiet: 30, soSV: 43, heSoHP: 1.2, tienDay: 7956000 }
    ]
  }
];

function TienDayGiangVien() {
  const [detailModalVisible, setDetailModalVisible] = React.useState(false);
  const [selectedTeacher, setSelectedTeacher] = React.useState(null);

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
      title: 'Thao tác', key: 'action',
      render: (_, record) => (
        <Button type="link"
          onClick={() => {
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

  return (
    <>
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
    </>
  )
}

export default TienDayGiangVien;