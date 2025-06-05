import { CheckOutlined, SearchOutlined } from '@ant-design/icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faFilter, faPen, faPlus, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Button, Card, Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Space, Table, Tag, Tooltip, Typography, message } from 'antd';
import { useState } from 'react';
import { useData } from './context';

function FunctionBar() {
  const [{
    tableData
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