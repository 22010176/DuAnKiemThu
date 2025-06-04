import { DatePicker, Select } from 'antd';
import { useReducer } from 'react';

import DataForm from './DataForm';
import DataTable from './DataTable';
import FunctionBar from './FunctionBar';
import { Context, initialState, reducer } from './context';

const { Option } = Select;
const { RangePicker } = DatePicker;

function HocKiPage() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={[state, dispatch]}>
      <div className='p-6 bg-white min-h-screen'>
        {/* Bộ lọc và nút thêm */}
        <FunctionBar />

        {/* Bảng dữ liệu */}
        <DataTable />

      </div>
      {/* Modal thêm/sửa */}
      <DataForm />
    </Context.Provider>
  );
};

export default HocKiPage;