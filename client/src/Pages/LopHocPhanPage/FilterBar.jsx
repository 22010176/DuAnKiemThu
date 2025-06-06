import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Input, Row, Select } from 'antd';
import { useState } from 'react';

const { Search, } = Input;

function FilterBar() {

  const khoaOptions = ['Công nghệ thông tin', 'Kinh tế', 'Ngoại ngữ', 'Cơ khí'];
  const namHocOptions = ['2024-2025', '2023-2024', '2022-2023'];
  const kyOptions = ['Kỳ 1', 'Kỳ 2', 'Kỳ hè'];
  const trangThaiOptions = ['Đã phân công', 'Chưa phân công'];

  const [filters, setFilters] = useState({ khoa: '', namHoc: '', ky: '', trangThai: '' });
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <Card size="small" style={{ marginBottom: '16px', backgroundColor: '#fafafa' }}>
      <Row gutter={16} align="middle">
        <Col span={4}>
          <Select placeholder="Chọn khoa" allowClear style={{ width: '100%' }} value={undefined} onChange={(value) => handleFilterChange('khoa', value)}>
            {khoaOptions.map(khoa => <Option key={khoa} value={khoa}>{khoa}</Option>)}
          </Select>
        </Col>
        <Col span={4}>
          <Select placeholder="Chọn năm học" allowClear style={{ width: '100%' }} value={undefined} onChange={(value) => handleFilterChange('namHoc', value)}>
            {namHocOptions.map(nam => <Option key={nam} value={nam}>{nam}</Option>)}
          </Select>
        </Col>
        <Col span={4}>
          <Select placeholder="Chọn kỳ" allowClear style={{ width: '100%' }} value={undefined} onChange={(value) => handleFilterChange('ky', value)}>
            {kyOptions.map(ky => <Option key={ky} value={ky}>{ky}</Option>)}
          </Select>
        </Col>
        <Col span={4}>
          <Select placeholder="Chọn trạng thái" allowClear style={{ width: '100%' }} value={undefined} onChange={(value) => handleFilterChange('trangThai', value)}>
            {trangThaiOptions.map(tt => <Option key={tt} value={tt}>{tt}</Option>)}
          </Select>
        </Col>
        <Col span={6}>
          <Search placeholder="Tìm kiếm theo tên lớp, mã lớp..." allowClear style={{ width: '100%' }} />
        </Col>
        <Col span={2}>
          <Button icon={<FontAwesomeIcon icon={faFilter} />} type="text">
            Lọc
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default FilterBar; 