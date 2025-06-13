import { Button, Card, Col, Divider, Modal, Row, Select, Statistic, Table, Tag } from 'antd';
import { faChalkboardTeacher, faMoneyBillWave, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';

import { GetHocKyList } from '@/api/hocKiApi';
import { GetKhoaList } from '@/api/khoaApi';
import { GetNamHocList } from '@/api/lhpThongKeApi';
import { GetDinhMuc, GetHeSoLopHocPhan, TinhTienDay } from '@/api/tinhTienDay';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons';

function LayHeSoDinhMucSinhVien(danhSachHeSoLop, soHocSinhToiThieu, namHoc) {
  const result = danhSachHeSoLop.filter(i => i.soHocSinhToiThieu <= soHocSinhToiThieu && i.namHoc <= namHoc)
  return result.length > 0 ? result[result.length - 1].heSo : 1;
}

function LayDinhMuc(danhSachDinhMuc, namHoc) {
  const result = danhSachDinhMuc.filter(i => new Date(i.ngayCapNhat).getFullYear() <= namHoc)
  return (result.length > 0 ? result[result.length - 1] : danhSachDinhMuc[0]).soTien;
}

function GetYear(str) {
  return new Date(str).getFullYear();
}

function TienDayGiangVien() {
  // modal
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  console.log(selectedTeacher)

  // data
  const [tienDayData, setTienDayData] = useState([])
  const [khoa, setKhoa] = useState([])
  const [kyHoc, setKyHoc] = useState([])
  const [namHoc, setNamHoc] = useState([])
  const [heSoLopHocPhan, setHeSoLopHocPhan] = useState([])
  const [dinhMucSoTietChuan, setDinhMucSoTienChuan] = useState([])
  console.log(dinhMucSoTietChuan)
  // form
  const [filterForm, setFilterForm] = useState({ khoa: 'all', kyHoc: null, namHoc: 'all' })
  /*
{
    "id": "39c566e4-7dba-48d9-a5b9-60eef656590a",
    "maGiangVien": "PU_HH_973",
    "tenGiangVien": "kCWJ",
    "khoaId": "64cb87b4-0e25-4092-8daf-67da44ec3297",
    "maKhoa": "FAC_HH",
    "tenKhoa": "Khoa Hóa học",
    "maBangCap": "DEG_1",
    "tenBangCap": "Giáo sư",
    "maLop": "FAC_CK_638852787425150195-1529",
    "tenLop": "ec0-c524-4922-b (N1529)",
    "soLuongSinhVien": 199,
    "maHocKi": "7f24ebd1-8a2d-4ae2-a454-a8eadb2fe169",
    "thoiGianBatDau": "1950-08-01T22:37:41.671Z",
    "thoiGianKetThuc": "1951-02-01T22:37:41.671Z",
    "heSoBangCap": 1,
    "hocPhanId": "b5937ca9-84be-40b1-ad55-617644f8a36c",
    "maHocPhan": "FAC_CK_638852787425150195",
    "tenHocPhan": "ec0-c524-4922-b",
    "soTiet": 293,
    "soTinChi": 3,
    "heSoHocPhan": 8.740433692932129
}
  */
  // console.log(tienDayData)
  const tinhTienTableData = useMemo(() => {
    const result = {}

    for (const item of tienDayData) {
      // console.log(filterForm.khoa == item.khoaId)
      if (filterForm.khoa != 'all' && item.khoaId != filterForm.khoa) continue
      if (filterForm.namHoc != 'all' && new Date(item.thoiGianBatDau).getFullYear() != filterForm.namHoc) continue
      if (filterForm.kyHoc != null && item.maHocKi != filterForm.kyHoc) continue

      if (result[item.id] != null) {
        result[item.id].soLop += 1;
        continue
      }
      const namHoc = new Date(item.thoiGianBatDau).getFullYear()
      result[item.id] = {
        id: item.id,
        khoaId: item.khoaId,
        maKhoa: item.maKhoa,
        tenKhoa: item.tenKhoa,
        maHocKi: item.maHocKi,
        tenHocKy: item.tenHoc,
        namHoc,
        soLop: 1,
        maGiangVien: item.maGiangVien,
        tenGiangVien: item.tenGiangVien,
        maBangCap: item.maBangCap,
        tenBangCap: item.tenBangCap,
        tienDay: item.soTiet * (
          item.heSoHocPhan
          + LayHeSoDinhMucSinhVien(heSoLopHocPhan, item.soLuongSinhVien, namHoc)
        ) * item.heSoBangCap * LayDinhMuc(dinhMucSoTietChuan, namHoc)
      }
    }
    return Object.values(result)
  }, [dinhMucSoTietChuan, filterForm.khoa, filterForm.kyHoc, filterForm.namHoc, heSoLopHocPhan, tienDayData])
  // filterForm


  useEffect(function () {
    // fetch data
    GetKhoaList().then(setKhoa)
    GetNamHocList().then(setNamHoc)
    GetHocKyList().then(setKyHoc)
    TinhTienDay().then(setTienDayData)
    GetDinhMuc().then(setDinhMucSoTienChuan)
    GetHeSoLopHocPhan().then(setHeSoLopHocPhan)
  }, [])

  const tienDayColumns = [
    { title: 'Mã GV', dataIndex: 'maGiangVien', key: 'maGiangVien', },
    { title: 'Tên giáo viên', dataIndex: 'tenGiangVien', key: 'tenGiangVien', },
    {
      title: 'Bằng cấp', dataIndex: 'tenBangCap', key: 'tenBangCap',
      render: value => <Tag color="blue">{value}</Tag>
    },
    { title: 'Khoa', dataIndex: 'tenKhoa', key: 'tenKhoa', },
    {
      title: 'Số lớp', dataIndex: 'soLop', key: 'soLop',
      render: value => <Tag color="orange">{value} lớp</Tag>
    },
    {
      title: 'Tổng tiền (VNĐ)', dataIndex: 'tienDay', key: 'tienDay',
      render: value => <span style={{ fontWeight: 'bold', color: '#1890ff' }}>{value?.toLocaleString('vi-VN')}</span>

    },
    {
      title: 'Thao tác', key: 'action',
      render: (_, record) => (
        <Button type="link"
          onClick={() => {

            setSelectedTeacher({
              ...record,
              chiTiet: tienDayData
                ?.filter(i => i.id == record.id
                  && (filterForm.namHoc == 'all' || new Date(i.thoiGianBatDau).getFullYear() == filterForm.namHoc)
                  && (filterForm.kyHoc == null || i.maHocKi == filterForm.kyHoc)
                  && (filterForm.khoa == 'all' || i.khoaId == filterForm.khoa))
                .map(i => ({
                  ...i,
                  tienDay: i.soTiet * (
                    i.heSoHocPhan
                    + LayHeSoDinhMucSinhVien(heSoLopHocPhan, i.soLuongSinhVien, GetYear(i.thoiGianBatDau))
                  ) * i.heSoBangCap * LayDinhMuc(dinhMucSoTietChuan, GetYear(i.thoiGianBatDau))
                }))
            });

            setDetailModalVisible(true);
          }}>Chi tiết</Button>
      ),
    },
  ];
  const chiTietColumns = [
    { title: 'Mã lớp', dataIndex: 'maLop', key: 'maLop', },
    { title: 'Tên học phần', dataIndex: 'tenHocPhan', key: 'tenHocPhan', },
    { title: 'Số tiết', dataIndex: 'soTiet', key: 'soTiet', },
    { title: 'Số SV', dataIndex: 'soLuongSinhVien', key: 'soLuongSinhVien', },
    { title: 'Hệ số HP', dataIndex: 'heSoHocPhan', key: 'heSoHocPhan', render: (value) => value?.toFixed(2) },
    { title: 'Tiền dạy (VNĐ)', dataIndex: 'tienDay', key: 'tienDay', render: (value) => value?.toLocaleString('vi-VN') }
  ];

  return (
    <>
      <div className='p-5'>
        <Card title="Bộ lọc tính tiền dạy">
          <Row gutter={16}>
            <Col span={6}>
              <Select placeholder="Chọn khoa" style={{ width: '100%' }}
                value={filterForm.khoa}
                onChange={(value) => setFilterForm({ ...filterForm, khoa: value })}
                options={[
                  { value: "all", label: "Toàn trường" },
                  ...khoa.map(i => ({ value: i.id, label: i.tenKhoa }))
                ]} />
            </Col>
            <Col span={6}>
              <Select placeholder="Năm học" style={{ width: '100%' }}
                value={filterForm.namHoc}
                onChange={(value) => setFilterForm({ ...filterForm, namHoc: value, kyHoc: null })}
                options={[
                  { value: "all", label: "Toàn thời gian" },
                  ...namHoc.map(i => ({ value: i.nam, label: `${i.nam} - ${i.nam + 1}` }))
                ]} />
            </Col>
            <Col span={6}>
              <Select placeholder="Kì học" style={{ width: '100%' }} disabled={filterForm.namHoc === 'all'}
                value={filterForm.kyHoc}
                onChange={(value) => setFilterForm({ ...filterForm, kyHoc: value })}
                options={kyHoc.filter(i => new Date(i.thoiGianBatDau).getFullYear() === filterForm.namHoc).map(i => ({ value: i.id, label: i.tenHocKy }))} />
            </Col>
            <Col span={3}>
              <Button variant='solid' color='green' icon={<FontAwesomeIcon icon={faFileExcel} />} style={{ width: '100%' }}>
                Xuất file excel
              </Button>
            </Col>
          </Row>
        </Card>

        <Card title="Kết quả tính tiền dạy" style={{ marginTop: '16px' }}>
          <Row gutter={16} style={{ marginBottom: '16px' }}>
            <Col span={8}>
              <Statistic prefix={<FontAwesomeIcon icon={faUserTie} />}
                title="Tổng số giáo viên"
                value={tinhTienTableData.length} />
            </Col>
            <Col span={8}>
              <Statistic prefix={<FontAwesomeIcon icon={faChalkboardTeacher} />}
                title="Tổng số lớp"
                value={tinhTienTableData.reduce((prev, curr) => prev + curr.soLop, 0)} />
            </Col>
            <Col span={8}>
              <Statistic prefix={<FontAwesomeIcon icon={faMoneyBillWave} />}
                formatter={(value) => value?.toLocaleString('vi-VN') + ' VNĐ'}
                title="Tổng tiền chi trả"
                value={tinhTienTableData.reduce((prev, curr) => prev + curr.tienDay, 0)} />
            </Col>
          </Row>

          <Table columns={tienDayColumns} dataSource={tinhTienTableData} pagination={{ pageSize: 10 }} size="middle" />
        </Card>
      </div>

      {/* Modal chi tiết tính tiền */}
      <Modal
        title={`Chi tiết tính tiền - ${selectedTeacher?.tenGV}`}
        width={1000}
        open={detailModalVisible}
        onCancel={() => {
          setDetailModalVisible(false)
          setSelectedTeacher(null)
        }}
        footer={[
          <Button key="close"
            onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>
        ]}>
        {selectedTeacher && (
          <>
            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col span={12}>
                <Card size="small">
                  <Statistic title="Bằng cấp" value={selectedTeacher.tenBangCap} valueStyle={{ fontSize: '16px' }} />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <Statistic title="Tổng tiền" value={selectedTeacher.chiTiet.reduce((prev, curr) => prev + curr.tienDay, 0)} formatter={(value) => value?.toLocaleString('vi-VN') + ' VNĐ'} valueStyle={{ color: '#1890ff', fontSize: '16px' }} />
                </Card>
              </Col>
            </Row>

            <Divider>Chi tiết các lớp dạy</Divider>

            <Table columns={chiTietColumns} dataSource={selectedTeacher.chiTiet} size="small" />

            <div className='mt-4 p-3 rounded-lg bg-gray-100' >
              <h4>Công thức tính:</h4>
              <p><strong>Tiền dạy mỗi lớp = Số tiết quy đổi × Hệ số giáo viên × Tiền dạy một tiết</strong></p>
              <p><strong>Số tiết quy đổi = Số tiết thực tế × (Hệ số học phần + Hệ số lớp)</strong></p>
            </div>
          </>
        )}
      </Modal>
    </>
  )
}

export default TienDayGiangVien;