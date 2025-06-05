import { useState } from "react";
import { Card, Select, Table, Row, Col, Statistic, DatePicker, Button, Space } from 'antd';
import { BarChartOutlined, TeamOutlined, BookOutlined, CalendarOutlined, AccountBookOutlined } from '@ant-design/icons';

function OverallStats() {
    const [selectedKhoa, setSelectedKhoa] = useState('');
    const [selectedNamHoc, setSelectedNamHoc] = useState('');
    const [selectedKy, setSelectedKy] = useState('');

    const thongKeData = [
        { key: '1', hocPhan: 'Lập trình Java', maHocPhan: 'IT001', soLop: 3, tongSinhVien: 120, sinhVienTrungBinh: 40, khoa: 'CNTT' },
        { key: '2', hocPhan: 'Cơ sở dữ liệu', maHocPhan: 'IT002', soLop: 2, tongSinhVien: 80, sinhVienTrungBinh: 40, khoa: 'CNTT' },
        { key: '3', hocPhan: 'Kế toán tài chính', maHocPhan: 'KT001', soLop: 4, tongSinhVien: 160, sinhVienTrungBinh: 40, khoa: 'KT' }
    ];

    const filteredData = thongKeData.filter(item => {
        return (!selectedKhoa || item.khoa === selectedKhoa);
    });

    // Tính toán thống kê tổng
    const tongSoLop = filteredData.reduce((sum, item) => sum + item.soLop, 0);
    const tongSinhVien = filteredData.reduce((sum, item) => sum + item.tongSinhVien, 0);
    const sinhVienTrungBinhTong = tongSoLop > 0 ? Math.round(tongSinhVien / tongSoLop) : 0;

    return (
        <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col span={6}>
                <Card>
                    <Statistic title="Tổng số lớp mở" value={tongSoLop} prefix={<BookOutlined />} valueStyle={{ color: '#3f8600' }} />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic title="Tổng số sinh viên" value={tongSinhVien} prefix={<TeamOutlined />} valueStyle={{ color: '#1890ff' }} />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic title="SV trung bình/lớp" value={sinhVienTrungBinhTong} prefix={<AccountBookOutlined />} valueStyle={{ color: '#722ed1' }} />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic title="Số học phần" value={filteredData.length} prefix={<BookOutlined />} valueStyle={{ color: '#eb2f96' }} />
                </Card>
            </Col>
        </Row>
    )
}

export default OverallStats;