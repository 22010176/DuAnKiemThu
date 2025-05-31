import React, { useState } from 'react';
import { Card, Select, Table, Row, Col, Statistic, DatePicker, Button, Space } from 'antd';
import { BarChartOutlined, TeamOutlined, BookOutlined, CalendarOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ThongKeLopPage = () => {
  const [selectedKhoa, setSelectedKhoa] = useState('');
  const [selectedNamHoc, setSelectedNamHoc] = useState('');
  const [selectedKy, setSelectedKy] = useState('');

  // Mock data
  const khoaList = [
    { id: 'CNTT', name: 'Công nghệ thông tin' },
    { id: 'KT', name: 'Kế toán' },
    { id: 'NN', name: 'Ngoại ngữ' },
    { id: 'QT', name: 'Quản trị kinh doanh' }
  ];

  const namHocList = ['2023-2024', '2024-2025'];
  const kyHocList = [
    { id: 'HK1', name: 'Học kỳ 1' },
    { id: 'HK2', name: 'Học kỳ 2' },
    { id: 'HK3', name: 'Học kỳ hè' }
  ];

  const thongKeData = [
    {
      key: '1',
      hocPhan: 'Lập trình Java',
      maHocPhan: 'IT001',
      soLop: 3,
      tongSinhVien: 120,
      sinhVienTrungBinh: 40,
      khoa: 'CNTT'
    },
    {
      key: '2',
      hocPhan: 'Cơ sở dữ liệu',
      maHocPhan: 'IT002',
      soLop: 2,
      tongSinhVien: 80,
      sinhVienTrungBinh: 40,
      khoa: 'CNTT'
    },
    {
      key: '3',
      hocPhan: 'Kế toán tài chính',
      maHocPhan: 'KT001',
      soLop: 4,
      tongSinhVien: 160,
      sinhVienTrungBinh: 40,
      khoa: 'KT'
    }
  ];

  const columns = [
    {
      title: 'Mã học phần',
      dataIndex: 'maHocPhan',
      key: 'maHocPhan',
      width: 120,
    },
    {
      title: 'Tên học phần',
      dataIndex: 'hocPhan',
      key: 'hocPhan',
      width: 200,
    },
    {
      title: 'Số lớp mở',
      dataIndex: 'soLop',
      key: 'soLop',
      width: 100,
      align: 'center',
    },
    {
      title: 'Tổng sinh viên',
      dataIndex: 'tongSinhVien',
      key: 'tongSinhVien',
      width: 120,
      align: 'center',
    },
    {
      title: 'SV trung bình/lớp',
      dataIndex: 'sinhVienTrungBinh',
      key: 'sinhVienTrungBinh',
      width: 150,
      align: 'center',
    },
    {
      title: 'Khoa',
      dataIndex: 'khoa',
      key: 'khoa',
      width: 100,
      align: 'center',
    }
  ];

  const filteredData = thongKeData.filter(item => {
    return (!selectedKhoa || item.khoa === selectedKhoa);
  });

  // Tính toán thống kê tổng
  const tongSoLop = filteredData.reduce((sum, item) => sum + item.soLop, 0);
  const tongSinhVien = filteredData.reduce((sum, item) => sum + item.tongSinhVien, 0);
  const sinhVienTrungBinhTong = tongSoLop > 0 ? Math.round(tongSinhVien / tongSoLop) : 0;

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, color: '#1890ff' }}>
          <BarChartOutlined style={{ marginRight: '8px' }} />
          Thống kê lớp học phần
        </h2>
      </div>

      {/* Bộ lọc */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={16}>
          <Col span={6}>
            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Khoa:</div>
            <Select
              placeholder="Chọn khoa"
              style={{ width: '100%' }}
              value={selectedKhoa}
              onChange={setSelectedKhoa}
              allowClear
            >
              {khoaList.map(khoa => (
                <Option key={khoa.id} value={khoa.id}>{khoa.name}</Option>
              ))}
            </Select>
          </Col>
          <Col span={6}>
            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Năm học:</div>
            <Select
              placeholder="Chọn năm học"
              style={{ width: '100%' }}
              value={selectedNamHoc}
              onChange={setSelectedNamHoc}
              allowClear
            >
              {namHocList.map(nam => (
                <Option key={nam} value={nam}>{nam}</Option>
              ))}
            </Select>
          </Col>
          <Col span={6}>
            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Kỳ học:</div>
            <Select
              placeholder="Chọn kỳ học"
              style={{ width: '100%' }}
              value={selectedKy}
              onChange={setSelectedKy}
              allowClear
            >
              {kyHocList.map(ky => (
                <Option key={ky.id} value={ky.id}>{ky.name}</Option>
              ))}
            </Select>
          </Col>
          <Col span={6}>
            <div style={{ marginBottom: '8px' }}>&nbsp;</div>
            <Space>
              <Button type="primary" icon={<BarChartOutlined />}>
                Thống kê
              </Button>
              <Button>Xuất báo cáo</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Thống kê tổng quan */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số lớp mở"
              value={tongSoLop}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số sinh viên"
              value={tongSinhVien}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="SV trung bình/lớp"
              value={sinhVienTrungBinhTong}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Số học phần"
              value={filteredData.length}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Bảng chi tiết */}
      <Card
        title={
          <span>
            <BarChartOutlined style={{ marginRight: '8px' }} />
            Chi tiết thống kê theo học phần
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
              `${range[0]}-${range[1]} của ${total} học phần`,
          }}
          scroll={{ x: 800 }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default ThongKeLopPage;