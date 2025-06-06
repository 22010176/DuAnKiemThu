import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row, Space } from 'antd';

import { useData } from './context';

function FunctionBar() {
  const [{
    tableData, addModal, addBulkModal, selectedLopHocPhan
  }, dispatch] = useData()

  const handleAdd = () => {
    dispatch([
      { type: "updateAddModal", payload: true },
      { type: "updateAddBulkModal", payload: false },
      { type: 'updateGiangVienModal', payload: false },
    ])
  };

  const handleBulkAdd = () => {
    dispatch([
      { type: "updateAddModal", payload: false },
      { type: 'updateGiangVienModal', payload: false },
      { type: "updateAddBulkModal", payload: true }
    ])
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
          <Button disabled={!selectedLopHocPhan?.length} type="primary" icon={<FontAwesomeIcon icon={faUserPlus} />}
            onClick={() => {
              dispatch([
                { type: 'updateGiangVienModal', payload: true },
                { type: 'updateAddModal', payload: false },
                { type: 'updateAddBulkModal', payload: false }
              ])
            }}>
            Phân công giảng viên ({selectedLopHocPhan?.length})
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default FunctionBar;