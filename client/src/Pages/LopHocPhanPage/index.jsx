import { Card, Tabs } from 'antd';
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
import ClassSelectionModal from './BulkAddSuccessModal';
import HocPhanDataTable from './HocPhanDataTable';

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
    <div className='px-2'>

      <Context.Provider value={[state, dispatch]}>
        <Tabs
          items={[
            {
              key: '1', label: 'Học Phần',
              children: (
                <>
                  <FilterBar />

                  <HocPhanDataTable />
                </>
              )
            },
            {
              key: '2', label: 'Lớp học phần và phân công',
              children: (
                <>
                  {/* <div> */}
                  {/* <Card> */}
                  <FunctionBar />

                  <FilterBar />

                  <DataTable />
                  {/* </Card> */}
                  {/* </div> */}

                  {/* Add/Edit Modal */}
                  <FormModal />

                  {/* Bulk Add Modal */}
                  <BulkAddModal />

                  {/* Assignment Modal */}
                  <PhanCongGiangVienModal />

                  <ClassSelectionModal />
                </>
              )
            }
          ]} />
      </Context.Provider>
    </div>
  );
};

export default LopHocPhanPage;