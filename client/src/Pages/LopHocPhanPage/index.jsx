import { CheckOutlined, SearchOutlined } from '@ant-design/icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faFilter, faPen, faPlus, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Button, Card, Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Space, Table, Tag, Tooltip, Typography, message } from 'antd';
import { useState } from 'react';

import FunctionBar from './FuntionBar';
import FilterBar from './FilterBar';
import DataTable from './DataTable';
import FormModal from './FormModal';
import BulkAddModal from './BulkAddModal';
import PhanCongGiangVienModal from './PhanCongGiangVienModal';
// import { u } from 'react-router/dist/development/route-data-B9_30zbP';

const { Option } = Select;
const { Search, } = Input;
const { Title, Text } = Typography;

const LopHocPhanPage = () => {

  return (
    <>
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
    </>
  );
};

export default LopHocPhanPage;