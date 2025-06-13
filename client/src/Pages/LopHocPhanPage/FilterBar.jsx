import { Card, Col, Input, Row, Select } from 'antd';

import { useData } from "./context";

const { Search, } = Input;

function FilterBar() {
  const [{
    hocPhanData, lopHocPhanData, hocKiData, filterForm, giangVienData, khoaData, namHocData
  }, dispatch] = useData()
  const { khoaId, hocKiId, namHoc, trangThai, lop, hocPhan } = filterForm
  // console.log(hocPhanData[0], khoaId)

  return (
    <Card size="small" style={{ marginBottom: '16px', backgroundColor: '#fafafa' }}>
      <Row gutter={16} align="middle">
        <Col span={5}>
          <Select
            placeholder="Chọn khoa"
            allowClear
            style={{ width: '100%' }}
            value={khoaId || undefined}
            onChange={(value) => dispatch([
              { type: 'updateFilterForm', payload: { name: 'khoaId', value } },
              { type: 'updateFilterForm', payload: { name: 'hocPhan', value: 'all' } },
              { type: 'updateSelectedRows', payload: [] },
              // { type: 'updateForm', payload: { name: 'khoaId', value: value == 'all' ? undefined : value } },
              // { type: 'updateForm', payload: { name: 'hocPhanId', value: undefined } },
              // { type: 'updateBulkForm', payload: { name: 'khoaId', value: value == 'all' ? undefined : value } },
              // { type: 'updateBulkForm', payload: { name: 'hocPhanId', value: undefined } },
            ])}
            options={[
              { value: 'all', label: 'Tất cả khoa' },
              ...khoaData.map(khoa => ({ value: khoa.id, label: khoa.tenKhoa }))
            ]} />
        </Col>
        <Col span={5}>
          <Select
            placeholder="Chọn năm học"
            allowClear
            style={{ width: '100%' }}
            value={namHoc || undefined}
            onChange={(value) => dispatch([
              { type: 'updateFilterForm', payload: { name: 'namHoc', value } },
              { type: 'updateFilterForm', payload: { name: 'hocKiId', value: 'all' } },
              { type: 'updateSelectedRows', payload: [] },
              // { type: 'updateForm', payload: { name: 'nam', value } },
              // { type: 'updateForm', payload: { name: 'hocKiId' } },
              // { type: 'updateBulkForm', payload: { name: 'nam', value } },
              // { type: 'updateBulkForm', payload: { name: 'hocKiId' } },
            ])}
            options={[
              { value: 'all', label: 'Tất cả năm học' },
              ...namHocData.map(nam => ({ value: nam.nam, label: `${nam.nam}-${nam.nam + 1}` }))
            ]} />
        </Col>
        <Col span={4}>
          <Select
            placeholder="Chọn kỳ"
            allowClear
            style={{ width: '100%' }}
            disabled={!namHoc}
            value={hocKiId}
            onChange={(value) => dispatch([
              { type: 'updateFilterForm', payload: { name: 'hocKiId', value } },
              { type: 'updateSelectedRows', payload: [] },
              // { type: 'updateForm', payload: { name: 'hocKiId', value } },
              // { type: 'updateBulkForm', payload: { name: 'hocKiId', value } },
            ])}
            options={[
              { value: 'all', label: 'Tất cả kì học' },
              ...hocKiData
                .filter(i => new Date(i.thoiGianBatDau).getFullYear() == namHoc)
                .map(ky => ({ value: ky.id, label: ky.tenKi }))
            ]} />
        </Col>

        <Col span={4}>
          <Select
            placeholder="Chọn học phần"
            allowClear
            style={{ width: '100%' }}
            value={hocPhan}
            onChange={(value) => dispatch([
              { type: 'updateFilterForm', payload: { name: 'hocPhan', value } },
              { type: 'updateForm', payload: { name: 'hocPhanId', value } },
              // { type: 'updateBulkForm', payload: { name: 'hocPhanId', value } },
              // { type: 'updateSelectedRows', payload: [] }
            ])}
            options={[
              { value: 'all', label: 'Tất cả học phần' },
              ...hocPhanData
                .filter(hocPhan => hocPhan.khoaId == khoaId)
                .map(hocPhan => ({ value: hocPhan.id, label: hocPhan.tenHocPhan }))
            ]} />
        </Col>

        {/* <Col span={4}>
          <Select
            placeholder="Chọn trạng thái"
            allowClear
            style={{ width: '100%' }}
            value={trangThai}
            onChange={(value) => dispatch([
              { type: 'updateFilterForm', payload: { name: 'trangThai', value } },
              { type: 'updateSelectedRows', payload: [] }
            ])}
            options={[
              { value: 'all', label: 'Tất cả trạng thái' },
              { value: 'no', label: 'Chưa phân công' },
              { value: 'yes', label: 'Đã phân công' },
            ]} />
        </Col> */}
        <Col span={6}>
          <Search
            value={lop}
            onChange={(e) => dispatch([{ type: 'updateFilterForm', payload: { name: 'lop', value: e.target.value } }])}
            placeholder="Tìm kiếm theo tên lớp, mã lớp..."
            allowClear
            style={{ width: '100%' }} />
        </Col>
      </Row>
    </Card>
  )
}

export default FilterBar; 