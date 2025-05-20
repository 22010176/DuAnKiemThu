import React, { useState } from 'react';
import { Layout, Card, Row, Col, Statistic, Table, Tabs, Divider, Typography, Progress, Breadcrumb, Select, Space } from 'antd';
import { TeamOutlined, UserOutlined, WomanOutlined, ManOutlined, BookOutlined, BankOutlined, BarChartOutlined, PieChartOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

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
const COLORS = ['#0088FE', '#FF8042', '#FFBB28'];

function OverallGender() {
  return (
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
              <Pie data={genderData} cx="50%" cy="50%" labelLine={false} outerRadius={50} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                {genderData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Card>
  )
}

export default OverallGender