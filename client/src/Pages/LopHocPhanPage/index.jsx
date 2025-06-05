import { Card } from 'antd';
import { useReducer } from 'react';

import BulkAddModal from './BulkAddModal';
import DataTable from './DataTable';
import FilterBar from './FilterBar';
import FormModal from './FormModal';
import FunctionBar from './FuntionBar';
import PhanCongGiangVienModal from './PhanCongGiangVienModal';
import { Context, initialState, reducer } from './context';

const LopHocPhanPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={[state, dispatch]}>
      <div className='p-5 bg-gray-100 grow'>
        <Card>
          <FunctionBar />

          {/* Filters */}
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