import { GetKhoaList } from '@/api/khoaApi';
import { BarChartOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useData } from './context';
import { GetNamHocList } from '@/api/lhpThongKeApi';
import { GetHocKyList } from '@/api/hocKiApi';


function FilterSection() {
  const [{
    selectedKhoa, selectedNamHoc, selectedKy
  }, dispatch] = useData()

  console.log({ selectedKhoa, selectedNamHoc, selectedKy })
  const [khoa, setKhoa] = useState([])
  const [namHoc, setNamHoc] = useState([])
  const [kyHoc, setKyHoc] = useState([])

  useEffect(function () {
    GetKhoaList().then(res => setKhoa(res))
    GetNamHocList().then(res => setNamHoc(res))
    GetHocKyList().then(res => setKyHoc(res))
  }, [])

  useEffect(function () {

  }, [namHoc])

  // Mock data
  const kyHocList = [
    { id: 'HK1', name: 'Học kỳ 1' },
    { id: 'HK2', name: 'Học kỳ 2' },
    { id: 'HK3', name: 'Học kỳ hè' }
  ];

  return (
    <Card style={{ marginBottom: '12px', marginTop: "12px" }}>
      <Row gutter={16}>
        <Col span={6}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Khoa:</div>
          <Select
            placeholder="Chọn khoa" style={{ width: '100%' }} allowClear
            value={selectedKhoa || undefined}
            onChange={a => console.log(a)}
            options={[
              { value: '', label: 'Tất cả khoa' },
              ...khoa.map(k => ({ value: k.maKhoa, label: k.tenKhoa }))
            ]} />


        </Col>
        <Col span={6}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Năm học:</div>
          <Select
            placeholder="Chọn năm học"
            disabled={selectedKhoa}
            style={{ width: '100%' }}
            value={selectedNamHoc || undefined}
            onChange={a => console.log(a)} allowClear
            options={[
              { value: '', label: 'Tất cả năm học' },
              ...(namHoc?.map(nam => ({ value: nam.nam, label: `${nam.nam}-${nam.nam + 1}` })) || [])
            ]} />
        </Col>
        <Col span={6}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Kỳ học:</div>
          <Select
            placeholder="Chọn kỳ học"
            style={{ width: '100%' }}
            value={selectedKy || undefined}
            onChange={a => console.log(a)} allowClear
            options={kyHocList.map(ky => ({ value: ky.id, label: ky.tenKi }))} />
        </Col>
        <Col span={6}>
          <div style={{ marginBottom: '8px' }}>&nbsp;</div>
          <Space>
            <Button type="primary" icon={<BarChartOutlined />} >
              Thống kê
            </Button>
            <Button type='primary' style={{ backgroundColor: '#19A10A' }}>Xuất báo cáo</Button>
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default FilterSection;