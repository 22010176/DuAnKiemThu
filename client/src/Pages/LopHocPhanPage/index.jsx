import { Card } from 'antd';
import { useEffect, useReducer } from 'react';

import { GetHocKyList } from '@/api/hocKiApi';
import { GetHocPhan } from '@/api/hocphanApi';
import { GetKhoaList } from '@/api/khoaApi';
import { GetNamHocList } from '@/api/lhpThongKeApi';
import { GetLopHocPhanList } from '@/api/lopHocPhanApi';
import { GetGiangVien } from '@/api/giangVien';

import BulkAddModal from './BulkAddModal';
import DataTable from './DataTable';
import FilterBar from './FilterBar';
import FormModal from './FormModal';
import FunctionBar from './FuntionBar';
import PhanCongGiangVienModal from './PhanCongGiangVienModal';
import { Context, initialState, reducer } from './context';

const LopHocPhanPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(function () {
    Promise.all([
      GetLopHocPhanList(),
      GetKhoaList(),
      GetHocPhan(),
      GetNamHocList(),
      GetHocKyList(),
      GetGiangVien(),
    ]).then(data => dispatch([
      { type: "updateLopHocPhanData", payload: data[0] },
      { type: "updateKhoaData", payload: data[1] },
      { type: "updateHocPhanData", payload: data[2] },
      { type: "updateNamHocData", payload: data[3] },
      { type: "updateHocKiData", payload: data[4] },
      { type: "updateGiangVienData", payload: data[5] }
    ]))
  }, [])

  return (
    <Context.Provider value={[state, dispatch]}>
      <div className='p-5 bg-gray-100 grow'>
        <Card>
          <FunctionBar />

          <FilterBar />

          <DataTable />
        </Card>
      </div>
      {/* Add/Edit Modal */}
      <FormModal />

      {/* Bulk Add Modal */}
      <BulkAddModal />

      {/* Assignment Modal */}
      <PhanCongGiangVienModal />
    </Context.Provider>
  );
};

export default LopHocPhanPage;