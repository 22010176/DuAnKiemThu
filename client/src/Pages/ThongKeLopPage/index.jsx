import { BarChartOutlined } from '@ant-design/icons';
import { Card } from 'antd';

import { useEffect, useReducer } from 'react';
import DataTable from './DataTable';
import FilterSection from './FilterSection';
import OverallStats from './OverallStats';
import { Context, initialState, reducer } from './context';
import { GetKhoaList } from '@/api/khoaApi';
import { GetNamHocList } from '@/api/lhpThongKeApi';
import { GetHocKyList } from '@/api/hocKiApi';

const ThongKeLopPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(function () {
    Promise.all([
      GetKhoaList(),
      GetNamHocList(),
      GetHocKyList()
    ]).then(data => {
      dispatch([
        { type: 'updateData', payload: { key: 'khoaData', data: data[0] } },
        { type: 'updateData', payload: { key: 'namHocData', data: data[1] } },
        { type: 'updateData', payload: { key: 'hocKiData', data: data[2] } },
      ])
    })
  }, [])

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