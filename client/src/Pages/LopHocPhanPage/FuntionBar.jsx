import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row, Space, Tooltip } from 'antd';

import { useData } from './context';

function FunctionBar() {
  const [{
    selectedLopHocPhan, filterLopHocPhan, filterForm: { khoaId }
  }, dispatch] = useData()

  const handleAdd = () => {
    dispatch([
      { type: 'updateFormMode', payload: 'add' },
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
          <Tooltip title="Phải chọn khoa!!!">
            <Button
              type="primary" icon={<FontAwesomeIcon icon={faUserPlus} />}
              disabled={khoaId == 'all' || !selectedLopHocPhan?.length || filterLopHocPhan?.length}
              onClick={() => {
                dispatch([
                  { type: 'updateGiangVienModal', payload: true },
                  { type: 'updateAddModal', payload: false },
                  { type: 'updateAddBulkModal', payload: false }
                ])
              }}>
              Phân công giảng viên ({selectedLopHocPhan?.length})
            </Button>
          </Tooltip>
        </Space>
      </Col>
    </Row>
  )
}

export default FunctionBar;