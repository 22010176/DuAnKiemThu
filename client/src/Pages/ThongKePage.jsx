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
    {
      id: 1,
      name: 'Khoa Công nghệ thông tin',
      totalLecturers: 95,
      maleCount: 65,
      femaleCount: 30,
      masterCount: 68,
      phdCount: 27
    },
    {
      id: 2,
      name: 'Khoa Kinh tế',
      totalLecturers: 87,
      maleCount: 42,
      femaleCount: 45,
      masterCount: 67,
      phdCount: 20
    },
    {
      id: 3,
      name: 'Khoa Ngoại ngữ',
      totalLecturers: 76,
      maleCount: 31,
      femaleCount: 45,
      masterCount: 58,
      phdCount: 18
    },
    {
      id: 4,
      name: 'Khoa Cơ khí',
      totalLecturers: 68,
      maleCount: 58,
      femaleCount: 10,
      masterCount: 42,
      phdCount: 26
    },
    {
      id: 5,
      name: 'Khoa Điện - Điện tử',
      totalLecturers: 64,
      maleCount: 54,
      femaleCount: 10,
      masterCount: 43,
      phdCount: 21
    },
    {
      id: 6,
      name: 'Khoa Y',
      totalLecturers: 60,
      maleCount: 30,
      femaleCount: 30,
      masterCount: 42,
      phdCount: 18
    }
  ]
};

function ThongKePage() {
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const facultyDetails = selectedFaculty
    ? dummyData.faculties.find(faculty => faculty.id === selectedFaculty)
    : null;

  const columns = [
    { title: 'Tên khoa', dataIndex: 'name', key: 'name', },
    { title: 'Tổng số giảng viên', dataIndex: 'totalLecturers', key: 'totalLecturers', sorter: (a, b) => a.totalLecturers - b.totalLecturers, },
    { title: 'Nam', dataIndex: 'maleCount', key: 'maleCount', sorter: (a, b) => a.maleCount - b.maleCount, },
    { title: 'Nữ', dataIndex: 'femaleCount', key: 'femaleCount', sorter: (a, b) => a.femaleCount - b.femaleCount, },
    { title: 'Thạc sĩ', dataIndex: 'masterCount', key: 'masterCount', sorter: (a, b) => a.masterCount - b.masterCount, },
    { title: 'Tiến sĩ', dataIndex: 'phdCount', key: 'phdCount', sorter: (a, b) => a.phdCount - b.phdCount, },
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
    'Giảng viên': faculty.totalLecturers,
  }));

  return (
    <div className="min-h-screen bg-gray-100">
      <Content className="p-6">
        <div className="bg-white p-6 rounded shadow">
          <Title level={3} className="mb-6">Thống kê giảng viên toàn trường</Title>

          <Row gutter={[16, 16]} className="mb-8">
            <Col xs={24} sm={12} lg={6}>
              <Card className="bg-blue-50">
                <Statistic title="Tổng số giảng viên" value={dummyData.totalLecturers} prefix={<TeamOutlined />} valueStyle={{ color: '#1890ff' }} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="bg-green-50">
                <Statistic
                  title="Giảng viên nam"
                  value={dummyData.maleCount}
                  prefix={<ManOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                  suffix={`(${Math.round(dummyData.maleCount / dummyData.totalLecturers * 100)}%)`}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="bg-pink-50">
                <Statistic
                  title="Giảng viên nữ"
                  value={dummyData.femaleCount}
                  prefix={<WomanOutlined />}
                  valueStyle={{ color: '#eb2f96' }}
                  suffix={`(${Math.round(dummyData.femaleCount / dummyData.totalLecturers * 100)}%)`}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="bg-purple-50">
                <Statistic
                  title="Số lượng tiến sĩ"
                  value={`${Math.round(dummyData.phdCount / dummyData.masterCount * 100)}%`}
                  prefix={<BookOutlined />}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Card>
            </Col>
          </Row>

          <Divider orientation="left">Thống kê theo học vị</Divider>
          <Row gutter={[24, 24]} className="mb-8">
            <Col xs={24} sm={12}>
              <Card>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-500 flex items-center justify-center rounded-full mr-2">
                    <BookOutlined className="text-white" />
                  </div>
                  <Title level={4} className="m-0">Phân bố theo trình độ học vị</Title>
                </div>
                <Row gutter={16}>
                  <Col span={12}>
                    <div className="mb-4">
                      <Text>Thạc sĩ</Text>
                      <Progress
                        percent={Math.round(dummyData.masterCount / dummyData.totalLecturers * 100)}
                        strokeColor="#1890ff"
                      />
                    </div>
                    <div>
                      <Text>Tiến sĩ</Text>
                      <Progress percent={Math.round(dummyData.phdCount / dummyData.totalLecturers * 100)} strokeColor="#722ed1" />
                    </div>
                  </Col>
                  <Col span={12}>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={degreeData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                          {degreeData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-pink-500 flex items-center justify-center rounded-full mr-2">
                    <UserOutlined className="text-white" />
                  </div>
                  <Title level={4} className="m-0">Phân bố theo giới tính</Title>
                </div>
                <Row gutter={16}>
                  <Col span={12}>
                    <div className="mb-4">
                      <Text>Nam</Text>
                      <Progress percent={Math.round(dummyData.maleCount / dummyData.totalLecturers * 100)} strokeColor="#1890ff" />
                    </div>
                    <div>
                      <Text>Nữ</Text>
                      <Progress percent={Math.round(dummyData.femaleCount / dummyData.totalLecturers * 100)} strokeColor="#eb2f96" />
                    </div>
                  </Col>
                  <Col span={12}>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={genderData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                          {genderData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Divider orientation="left">So sánh giữa các khoa</Divider>
          <Card className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-500 flex items-center justify-center rounded-full mr-2">
                <BarChartOutlined className="text-white" />
              </div>
              <Title level={4} className="m-0">Số lượng giảng viên theo khoa</Title>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={facultyCompareData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Giảng viên" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Tabs defaultActiveKey="1" className="mb-8">

            <TabPane tab="Danh sách khoa" key="1">
              <Table dataSource={dummyData.faculties} columns={columns} rowKey="id" pagination={false} bordered />
            </TabPane>
            <TabPane tab="Chi tiết khoa" key="2">
              <Space direction="vertical" className="w-full">
                <div className="mb-4">
                  <Select className="ml-4 w-64" placeholder="Chọn khoa để xem chi tiết" onChange={value => setSelectedFaculty(value)} value={selectedFaculty}>
                    {dummyData.faculties.map(faculty => (
                      <Option key={faculty.id} value={faculty.id}>{faculty.name}</Option>
                    ))}
                  </Select>
                </div>

                {facultyDetails ? (
                  <>
                    <Title level={4}>{facultyDetails.name}</Title>
                    <Row gutter={[16, 16]} className="mb-4">
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <Card className="bg-blue-50">
                          <Statistic title="Tổng số giảng viên" value={facultyDetails.totalLecturers} prefix={<TeamOutlined />} valueStyle={{ color: '#1890ff' }} />
                        </Card>
                      </Col>
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <Card className="bg-green-50">
                          <Statistic title="Giảng viên nam" value={facultyDetails.maleCount} prefix={<ManOutlined />} valueStyle={{ color: '#3f8600' }} suffix={`(${Math.round(facultyDetails.maleCount / facultyDetails.totalLecturers * 100)}%)`} />
                        </Card>
                      </Col>
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <Card className="bg-pink-50">
                          <Statistic title="Giảng viên nữ" value={facultyDetails.femaleCount} prefix={<WomanOutlined />} valueStyle={{ color: '#eb2f96' }} suffix={`(${Math.round(facultyDetails.femaleCount / facultyDetails.totalLecturers * 100)}%)`} />
                        </Card>
                      </Col>
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <Card className="bg-purple-50">
                          <Statistic title="Số lượng tiến sĩ" value={`${Math.round(facultyDetails.phdCount / facultyDetails.masterCount * 100)}%`} prefix={<BookOutlined />} valueStyle={{ color: '#722ed1' }} />
                        </Card>
                      </Col>
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <Card className="bg-purple-50">
                          <Statistic title="Số lượng tiến sĩ" value={`${Math.round(facultyDetails.phdCount / facultyDetails.masterCount * 100)}%`} prefix={<BookOutlined />} valueStyle={{ color: '#722ed1' }} />
                        </Card>
                      </Col>
                    </Row>

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
                        <Card title="Phân bố học vị">
                          <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                              <Pie
                                data={[
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
                ) : (
                  <div className="text-center p-8 bg-gray-50 rounded">
                    <Text type="secondary">Vui lòng chọn khoa để xem thông tin chi tiết</Text>
                  </div>
                )}
              </Space>
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </div>
  );
};

export default ThongKePage;