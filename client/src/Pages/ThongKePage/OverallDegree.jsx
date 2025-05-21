import { BookOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import { useContext } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Context } from './context';

const { Title } = Typography;

const COLORS = ['#0088FE', '#FF8042', '#FFBB28'];
function OverallDegree() {
  const [state,] = useContext(Context);
  const data = state.processData.degree;

  return (
    <Card>
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-blue-500 flex items-center justify-center rounded-full mr-2">
          <BookOutlined className="text-white" />
        </div>
        <Title level={4} className="m-0">Phân bố theo bằng cấp</Title>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie data={Object.values(data)} cx="50%" cy="50%" labelLine={false} outerRadius={150} fill="#8884d8" dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}>
            {Object.values(data).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default OverallDegree