import { Card } from 'antd';
import { useEffect, useReducer } from 'react';

import { GetHocPhan } from '@/api/hocphanApi';
import { GetKhoaList } from '@/api/khoaApi';
import { GetNamHocList } from '@/api/lhpThongKeApi';
import { GetLopHocPhanList } from '@/api/lopHocPhanApi';

import BulkAddModal from './BulkAddModal';
import DataTable from './DataTable';
import FilterBar from './FilterBar';
import FormModal from './FormModal';
import FunctionBar from './FuntionBar';
import PhanCongGiangVienModal from './PhanCongGiangVienModal';
import { Context, initialState, reducer } from './context';
import { GetHocKyList } from '@/api/hocKiApi';

const LopHocPhanPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(function () {
    Promise.all([
      GetLopHocPhanList().then(i => dispatch([
        { type: "updateLopHocPhanData", payload: i }
      ])),
      GetKhoaList().then(i => dispatch([
        { type: "updateKhoaData", payload: i }
      ])),
      GetHocPhan().then(i => dispatch([
        { type: "updateHocPhanData", payload: i }
      ])),
      GetNamHocList().then(i => dispatch([
        { type: "updateNamHocData", payload: i }
      ])),
      GetHocKyList().then(i => dispatch([
        { type: "updateHocKiData", payload: i }
      ])),
    ])
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