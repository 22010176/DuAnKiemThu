import { BarChartOutlined } from '@ant-design/icons';
import { Card, Divider, Layout, Select, Tabs, Typography } from 'antd';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

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


// Dữ liệu cho biểu đồ cột so sánh các khoa
const facultyCompareData = dummyData.faculties.map(faculty => ({
  name: faculty.name.replace('Khoa ', ''),
  'Giáo viên': faculty.totalLecturers,
}));

function OverallMajor() {
  return (
    <>
      <Divider orientation="left">So sánh giữa các khoa</Divider>
      <Card className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-green-500 flex items-center justify-center rounded-full mr-2">
            <BarChartOutlined className="text-white" />
          </div>
          <Title level={4} className="m-0">Số lượng giáo viên theo khoa</Title>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={facultyCompareData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Giáo viên" fill="#1890ff" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>

  )
}

export default OverallMajor