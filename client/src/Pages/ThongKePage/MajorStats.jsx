import React, { useState } from 'react';
import { Layout, Card, Row, Col, Statistic, Table, Tabs, Divider, Typography, Progress, Breadcrumb, Select, Space } from 'antd';
import { TeamOutlined, UserOutlined, WomanOutlined, ManOutlined, BookOutlined, BankOutlined, BarChartOutlined, PieChartOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// Dữ liệu mẫu
const dummyData = {
  totalLecturers: 450,
  maleCount: 280,
  femaleCount: 170,
  masterCount: 320,
  phdCount: 130,
  faculties: [
    { id: 1, name: 'Khoa Công nghệ thông tin', totalLecturers: 95, maleCount: 65, femaleCount: 30, masterCount: 68, phdCount: 27 },
    { id: 2, name: 'Khoa Kinh tế', totalLecturers: 87, maleCount: 42, femaleCount: 45, masterCount: 67, phdCount: 20 },
    { id: 3, name: 'Khoa Ngoại ngữ', totalLecturers: 76, maleCount: 31, femaleCount: 45, masterCount: 58, phdCount: 18 },
    { id: 4, name: 'Khoa Cơ khí', totalLecturers: 68, maleCount: 58, femaleCount: 10, masterCount: 42, phdCount: 26 },
    { id: 5, name: 'Khoa Điện - Điện tử', totalLecturers: 64, maleCount: 54, femaleCount: 10, masterCount: 43, phdCount: 21 },
    { id: 6, name: 'Khoa Y', totalLecturers: 60, maleCount: 30, femaleCount: 30, masterCount: 42, phdCount: 18 }
  ]
};



function MajorStats() {

  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const facultyDetails = selectedFaculty
    ? dummyData.faculties.find(faculty => faculty.id === selectedFaculty)
    : null;

  const columns = [
    { title: 'Tên khoa', dataIndex: 'name', key: 'name', },
    { title: 'Tổng số giáo viên', dataIndex: 'totalLecturers', key: 'totalLecturers', sorter: (a, b) => a.totalLecturers - b.totalLecturers, },
    { title: 'Nam', dataIndex: 'maleCount', key: 'maleCount', sorter: (a, b) => a.maleCount - b.maleCount, },
    { title: 'Nữ', dataIndex: 'femaleCount', key: 'femaleCount', sorter: (a, b) => a.femaleCount - b.femaleCount, },
    { title: 'Thạc sĩ', dataIndex: 'masterCount', key: 'masterCount', sorter: (a, b) => a.masterCount - b.masterCount, },
    { title: 'Tiến sĩ', dataIndex: 'phdCount', key: 'phdCount', sorter: (a, b) => a.phdCount - b.phdCount, },
    { title: 'Phó giáo sư', dataIndex: 'phdCount', key: 'phdCount', sorter: (a, b) => a.phdCount - b.phdCount, },
    { title: 'Giáo sư', dataIndex: 'phdCount', key: 'phdCount', sorter: (a, b) => a.phdCount - b.phdCount, },
    { title: 'Cử nhân', dataIndex: 'phdCount', key: 'phdCount', sorter: (a, b) => a.phdCount - b.phdCount, },
  ];

  // Dữ liệu cho biểu đồ phân phối giới tính
  const genderData = [
    { name: 'Nam', value: dummyData.maleCount },
    { name: 'Nữ', value: dummyData.femaleCount },
  ];

  // Dữ liệu cho biểu đồ phân phối học vị
  const degreeData = [
    { name: 'Thạc sĩ', value: dummyData.masterCount },
    { name: 'Tiến sĩ', value: dummyData.phdCount },
  ];

  // Màu sắc cho biểu đồ
  const COLORS = ['#0088FE', '#FF8042', '#FFBB28'];

  // Dữ liệu cho biểu đồ cột so sánh các khoa
  const facultyCompareData = dummyData.faculties.map(faculty => ({
    name: faculty.name.replace('Khoa ', ''),
    'Giáo viên': faculty.totalLecturers,
  }));
  const tabs = [
    {
      key: '1',
      label: 'Danh sách khoa',
      children: <Table dataSource={dummyData.faculties} columns={columns} rowKey="id" pagination={false} bordered />,
    },
    {
      key: '2',
      label: 'Chi tiết khoa',
      children:
        <Space direction="vertical" className="w-full">
          <div className="mb-4">
            <Select className="ml-4 w-64" placeholder="Chọn khoa để xem chi tiết" onChange={value => setSelectedFaculty(value)} value={selectedFaculty}>
              {dummyData.faculties.map(faculty => (
                <Option key={faculty.id} value={faculty.id}>{faculty.name}</Option>
              ))}
            </Select>
          </div>

          {facultyDetails && (
            <>
              <Title level={4}>{facultyDetails.name}</Title>
              <div gutter={[16, 16]} className="mb-4 grid grid-cols-3 gap-10">
                <Card className="bg-blue-50">
                  <Statistic title="Tổng số giáo viên" value={facultyDetails.totalLecturers} prefix={<TeamOutlined />} valueStyle={{ color: '#1890ff' }} />
                </Card>
                <Card className="bg-green-50">
                  <Statistic title="Giáo viên nam" value={facultyDetails.maleCount} prefix={<ManOutlined />} valueStyle={{ color: '#3f8600' }} suffix={`(${Math.round(facultyDetails.maleCount / facultyDetails.totalLecturers * 100)}%)`} />
                </Card>
                <Card className="bg-pink-50">
                  <Statistic title="Giáo viên nữ" value={facultyDetails.femaleCount} prefix={<WomanOutlined />} valueStyle={{ color: '#eb2f96' }} suffix={`(${Math.round(facultyDetails.femaleCount / facultyDetails.totalLecturers * 100)}%)`} />
                </Card>
              </div>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Card title="Phân bố giới tính">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Nam', value: facultyDetails.maleCount },
                            { name: 'Nữ', value: facultyDetails.femaleCount }
                          ]}
                          cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                          <Cell fill="#1890ff" />
                          <Cell fill="#eb2f96" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="Phân bố bằng cấp">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie data={[
                          { name: 'Thạc sĩ', value: facultyDetails.masterCount },
                          { name: 'Tiến sĩ', value: facultyDetails.phdCount }
                        ]}
                          cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                          <Cell fill="#1890ff" />
                          <Cell fill="#722ed1" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Space>,
    },
  ]
  return <Tabs defaultActiveKey="1" className="mb-8 " items={tabs} />
}

export default MajorStats