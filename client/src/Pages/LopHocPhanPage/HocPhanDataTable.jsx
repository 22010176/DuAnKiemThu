import { Table, Tag } from "antd";
import { useData } from "./context";
import { useEffect, useMemo, useState } from "react";
import { GetHocPhanTinhTrang } from "@/api/hocphanApi";

function TableHeader({ children }) {
  return (
    <p className="text-lg font-semibold">{children} </p>
  )
}

function HocPhanDataTable() {
  const [data, setData] = useState([])
  const [{ filterForm }, dispatch] = useData()
  const { khoaId, hocKiId, namHoc, lop, hocPhan } = filterForm
  console.log({ khoaId, hocKiId, namHoc, lop, hocPhan, t: data[1] })
  const filterData = useMemo(() => {
    return Object.values(data
      .filter(i =>
        (khoaId == 'all' || i.khoaId == khoaId) &&
        (hocKiId == 'all' || i.hocKiId == hocKiId) &&
        (namHoc == 'all' || new Date(i.thoiGianBatDau).getFullYear() == namHoc) &&
        (hocPhan == 'all' || i.id == hocPhan))
      .reduce((acc, item) => {
        if (!acc[item.id]) acc[item.id] = { ...item }
        else acc[item.id].soLopHocPhan += (item.soLopHocPhan || 0)
        return acc
      }, {}))

  }, [data, khoaId, hocKiId, namHoc, hocPhan])


  useEffect(function () {
    GetHocPhanTinhTrang().then(res => setData(res))
  }, [])


  console.log()


  const columns = [
    { title: <TableHeader>STT</TableHeader>, key: 'stt', width: 60, align: 'center', render: (_, __, index) => index + 1, },
    { title: <TableHeader>Mã học phần</TableHeader>, dataIndex: 'maHocPhan', key: 'maHocPhan', width: 120, },
    { title: <TableHeader>Tên học phần</TableHeader>, dataIndex: 'tenHocPhan', key: 'tenHocPhan', width: 200, },
    { title: <TableHeader>Khoa</TableHeader>, dataIndex: 'tenKhoa', key: 'tenKhoa', width: 120, },
    { title: <TableHeader>Số tín chỉ</TableHeader>, dataIndex: 'soTinChi', key: 'soTinChi', width: 100, align: 'center', },
    { title: <TableHeader>Hệ số</TableHeader>, dataIndex: 'heSoHocPhan', key: 'heSoHocPhan', width: 80, align: 'center', },
    { title: <TableHeader>Số tiết</TableHeader>, dataIndex: 'soTiet', key: 'soTiet', width: 80, align: 'center', },
    {
      title: <TableHeader>Trạng thái</TableHeader>, dataIndex: 'soTiet', key: 'soTiet', width: 80, align: 'center',
      render: (_, entry) => entry.soLopHocPhan > 0 ? <Tag color="blue">Đã mở lớp</Tag> : <Tag color="purple">Chưa mở lớp</Tag>
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filterData}
      size="small"
      bordered
      // scroll={{ x: 800 }}
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} trong tổng số ${total} bản ghi`,
      }} />
  )
}

export default HocPhanDataTable