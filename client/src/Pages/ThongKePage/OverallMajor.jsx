import { BarChartOutlined } from '@ant-design/icons';
import { Card, Divider, Layout, Select, Tabs, Typography } from 'antd';
import { useContext } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Context } from './context';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const COLORS = ['#0088FE', '#FF8042', '#FFBB28'];
function OverallMajor() {
  const [state,] = useContext(Context);
  const temp = state.gioiTinh.reduce((acc, khoa) => {
    if (acc[khoa.maKhoa] == null) acc[khoa.maKhoa] = { name: khoa.tenKhoa, "Số giảng viên": 0 }
    acc[khoa.maKhoa]["Số giảng viên"] += khoa.soGiangVien;
    return acc;
  }, {});

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

        <ResponsiveContainer width="100%" height={400}>
          <BarChart width="100%" height={400} data={Object.values(temp)} >
            <CartesianGrid strokeDasharray="1 0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Số giảng viên" stackId="name" fill="#534bde" barSize={30} >
              {Object.values(temp).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>

  )
}

export default OverallMajor