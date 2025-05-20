import { ManOutlined, TeamOutlined, WomanOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';

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


function OverallStats() {
  return (
    <div gutter={[16, 16]} className="mb-8 grid grid-cols-3 gap-3">
      <div>
        <Card className="bg-blue-50">
          <Statistic title="Tổng số giáo viên" value={dummyData.totalLecturers} prefix={<TeamOutlined />} valueStyle={{ color: '#1890ff' }} />
        </Card>
      </div>
      <div>
        <Card className="bg-green-50">
          <Statistic
            title="Giáo viên nam"
            value={dummyData.maleCount}
            prefix={<ManOutlined />}
            valueStyle={{ color: '#3f8600' }}
            suffix={`(${Math.round(dummyData.maleCount / dummyData.totalLecturers * 100)}%)`} />
        </Card>
      </div>
      <div>
        <Card className="bg-pink-50">
          <Statistic
            title="Giáo viên nữ"
            value={dummyData.femaleCount}
            prefix={<WomanOutlined />}
            valueStyle={{ color: '#eb2f96' }}
            suffix={`(${Math.round(dummyData.femaleCount / dummyData.totalLecturers * 100)}%)`} />
        </Card>
      </div>
    </div>

  )
}

export default OverallStats