import { UserOutlined } from '@ant-design/icons';
import { Card, Layout, Select, Tabs, Typography } from 'antd';
import { useContext } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


import { Context } from './context';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const COLORS = ['#0088FE', '#FF8042', '#FFBB28'];

function OverallGender() {
  const [state,] = useContext(Context);

  const data = state.processData.gender;
  const genderData = [
    { name: 'Nam', value: data.maleCount },
    { name: 'Nữ', value: data.femaleCount },
  ];
  return (
    <Card>
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-pink-500 flex items-center justify-center rounded-full mr-2">
          <UserOutlined className="text-white" />
        </div>
        <Title level={4} className="m-0">Phân bố theo giới tính</Title>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie data={genderData} cx="50%" cy="50%" labelLine={false} outerRadius={150} fill="#8884d8" dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}>
            {genderData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

    </Card>
  )
}

export default OverallGender