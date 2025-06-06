import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Row, Space } from 'antd';
import { useState } from 'react';
import { useData } from './context';

function FunctionBar() {
  const [{
    tableData, addModal, addBulkModal
  }, dispatch] = useData()


  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const [bulkForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBulkModalVisible, setIsBulkModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    getCheckboxProps: (record) => ({
      disabled: record.trangThai !== 'Chưa phân công',
    }),
  };
  const handleAdd = () => {
    dispatch([
      { type: "updateAddModal", payload: true },
      { type: "updateAddBulkModal", payload: false }
    ])
  };

  const handleBulkAdd = () => {
    bulkForm.resetFields();
    setIsBulkModalVisible(true);
  };

  return (
    <Row className='mb-5' justify="space-between" align="middle">
      <Col>
        <Space>
          <Button type="default" icon={<FontAwesomeIcon icon={faCopy} />} onClick={handleBulkAdd}>
            Tạo hàng loạt
          </Button>
          <Button type="primary" icon={<FontAwesomeIcon icon={faPlus} />} onClick={handleAdd}>
            Thêm lớp
          </Button>
          <Button type="primary" icon={<FontAwesomeIcon icon={faUserPlus} />}
            disabled={selectedRowKeys.length === 0} onClick={() => { }}>
            Phân công giảng viên ({selectedRowKeys.length})
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default FunctionBar;