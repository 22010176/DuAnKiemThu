import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Input, Row, Select } from 'antd';
import { useState } from 'react';
import { useData } from "./context";

const { Search, } = Input;

function FilterBar() {
  const [{
    hocPhanData, lopHocPhanData, hocKiData, filterForm, giangVienData, khoaData, namHocData
  }, dispatch] = useData()

  const { khoaId, hocKiId, namHoc, trangThai, lop } = filterForm
  const trangThaiOptions = ['Tất cả', 'Đã phân công', 'Chưa phân công'];
  console.log(lopHocPhanData, filterForm)
  return (
    <Card size="small" style={{ marginBottom: '16px', backgroundColor: '#fafafa' }}>
      <Row gutter={16} align="middle">
        <Col span={4}>
          <Select
            placeholder="Chọn khoa"
            allowClear
            style={{ width: '100%' }}
            value={khoaId}
            onChange={(value) => dispatch([{ type: 'updateFilterForm', payload: { name: 'khoaId', value } }])}
            options={[
              { value: 'all', label: 'Tất cả' },
              ...khoaData.map(khoa => ({ value: khoa.id, label: khoa.tenKhoa }))
            ]} />
        </Col>
        <Col span={4}>
          <Select
            placeholder="Chọn năm học"
            allowClear
            style={{ width: '100%' }}
            value={namHoc}
            onChange={(value) => dispatch([
              { type: 'updateFilterForm', payload: { name: 'namHoc', value } },
              { type: 'updateFilterForm', payload: { name: 'hocKiId', value: 'all' } },
            ])}
            options={[
              { value: 'all', label: 'Tất cả' },
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
            onChange={(value) => dispatch([{ type: 'updateFilterForm', payload: { name: 'hocKiId', value } }])}
            options={[
              { value: 'all', label: 'Tất cả' },
              ...hocKiData
                .filter(i => new Date(i.thoiGianBatDau).getFullYear() == namHoc)
                .map(ky => ({ value: ky.id, label: ky.tenKi }))
            ]} />
        </Col>
        <Col span={4}>
          <Select
            placeholder="Chọn trạng thái"
            allowClear
            style={{ width: '100%' }}
            value={trangThai}
            onChange={(value) => dispatch([{ type: 'updateFilterForm', payload: { name: 'trangThai', value } }])}
            options={trangThaiOptions.map((trangThai, i) => ({ value: i || undefined, label: trangThai }))} />
        </Col>
        <Col span={6}>
          <Search
            value={lop}
            onChange={(e) => dispatch([{ type: 'updateFilterForm', payload: { name: 'lop', value: e.target.value } }])}
            placeholder="Tìm kiếm theo tên lớp, mã lớp..."
            allowClear
            style={{ width: '100%' }} />
        </Col>
        <Col span={2}>
          <Button icon={<FontAwesomeIcon icon={faFilter} />} type="text"
            onClick={() => {
              dispatch([
                {
                  type: 'updateFilterLopHocPhan',
                  payload: lopHocPhanData
                    .filter(i => (khoaId == 'all' || i.khoaId == khoaId)
                      && (hocKiId == 'all' || i.hocKiId == hocKiId)
                      && (!lop || i.tenLop.toLowerCase().includes(lop?.toLowerCase()))
                      && (namHoc == 'all' || new Date(i.thoiGianBatDau).getFullYear() == namHoc))
                },
                // { type: 'updateAddBulkModal', payload: true }
              ])
            }}>
            Lọc
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default FilterBar; 