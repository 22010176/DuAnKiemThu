import { BarChartOutlined } from '@ant-design/icons';
import { Card } from 'antd';

import { useReducer } from 'react';
import DataTable from './DataTable';
import FilterSection from './FilterSection';
import OverallStats from './OverallStats';
import { Context, initialState, reducer } from './context';

const ThongKeLopPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={[state, dispatch]}>
      <div style={{ padding: '24px', background: '#f5f5f5' }}>
        <Card className='mb-10'>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#2A7ED7' }}>
            <BarChartOutlined style={{ marginRight: '8px' }} />
            Chi tiết thống kê theo học phần
          </span>
        </Card>

        {/* Bộ lọc */}
        <FilterSection />

        {/* Thống kê tổng quan */}
        <OverallStats />

        {/* Bảng chi tiết */}
        <DataTable />
      </div>
    </Context.Provider>
  );
};

export default ThongKeLopPage;