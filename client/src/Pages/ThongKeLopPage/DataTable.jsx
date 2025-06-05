import { useState } from "react";
import { Card, Select, Table, Row, Col, Statistic, DatePicker, Button, Space } from 'antd';
import { BarChartOutlined, TeamOutlined, BookOutlined, CalendarOutlined, AccountBookOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

function DataTable() {
  const [selectedKhoa, setSelectedKhoa] = useState('');
  const [selectedNamHoc, setSelectedNamHoc] = useState('');
  const [selectedKy, setSelectedKy] = useState('');

  const thongKeData = [
    { key: '1', hocPhan: 'Lập trình Java', maHocPhan: 'IT001', soLop: 3, tongSinhVien: 120, sinhVienTrungBinh: 40, khoa: 'CNTT' },
    { key: '2', hocPhan: 'Cơ sở dữ liệu', maHocPhan: 'IT002', soLop: 2, tongSinhVien: 80, sinhVienTrungBinh: 40, khoa: 'CNTT' },
    { key: '3', hocPhan: 'Kế toán tài chính', maHocPhan: 'KT001', soLop: 4, tongSinhVien: 160, sinhVienTrungBinh: 40, khoa: 'KT' }
  ];

  const columns = [
    { title: 'Mã học phần', dataIndex: 'maHocPhan', key: 'maHocPhan', width: 120, },
    { title: 'Tên học phần', dataIndex: 'hocPhan', key: 'hocPhan', width: 200, },
    { title: 'Số lớp mở', dataIndex: 'soLop', key: 'soLop', width: 100, align: 'center', },
    { title: 'Tổng sinh viên', dataIndex: 'tongSinhVien', key: 'tongSinhVien', width: 120, align: 'center', },
    { title: 'SV trung bình/lớp', dataIndex: 'sinhVienTrungBinh', key: 'sinhVienTrungBinh', width: 150, align: 'center', },
    { title: 'Khoa', dataIndex: 'khoa', key: 'khoa', width: 100, align: 'center', }
  ];

  const filteredData = thongKeData.filter(item => {
    return (!selectedKhoa || item.khoa === selectedKhoa);
  });

  return (
    <Card
      title={
        <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#2A7ED7' }}>
          <BarChartOutlined style={{ marginRight: '8px' }} />
          Chi tiết thống kê theo học phần
        </span>
      }>
      <Table
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: 800 }}
        size="middle"
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} học phần`,
        }}
      />
    </Card>
  )
}

export default DataTable;