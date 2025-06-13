import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, message, Space, Table, Tag, Tooltip } from 'antd';

import { DeleteLopHocPhan, GetLopHocPhanList } from "@/api/lopHocPhanApi";

import { useData } from "./context";

function DataTable() {
  const [{
    lopHocPhanData, selectedLopHocPhan, filterLopHocPhan, filterForm

  }, dispatch] = useData()
  const { khoaId, hocKiId, namHoc, trangThai, lop } = filterForm

  const columns = [
    { title: <p className='text-lg font-semibold'>STT</p>, key: 'stt', width: 70, align: 'center', render: (_, __, index) => index + 1, },
    { title: <p className='text-lg font-semibold'>Mã lớp</p>, dataIndex: 'maLop', key: 'maLop', width: 120, },
    { title: <p className='text-lg font-semibold'>Tên lớp</p>, dataIndex: 'tenLop', key: 'tenLop', width: 200, },
    { title: <p className='text-lg font-semibold'>Học phần</p>, dataIndex: 'tenHocPhan', key: 'tenHocPhan', width: 150, },
    khoaId && { title: <p className='text-lg font-semibold'>Khoa</p>, dataIndex: 'tenKhoa', key: 'tenKhoa', width: 150, },
    // { title: <p className='text-lg font-semibold'>Học kì</p>, key: 'tenKi', dataIndex: 'tenKi', width: 120, render: (_, record) => `${record.ky} (${record.namHoc})` },
    { title: <p className='text-lg font-semibold'>Sinh viên</p>, dataIndex: 'soLuongSinhVien', key: 'soLuongSinhVien', width: 90, align: 'center' },
    { title: <p className='text-lg font-semibold'>Tín chỉ</p>, dataIndex: 'soTinChi', key: 'soTinChi', width: 70, align: 'center' },
    { title: <p className='text-lg font-semibold'>Giáo viên</p>, dataIndex: 'tenGiangVien', key: 'tenGiangVien', width: 150, render: (giangVien) => giangVien || <Tag color="orange">Chưa phân công</Tag> },
    {
      title: <p className='text-lg font-semibold'>Thao tác</p>, key: 'action', width: 120, fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title="Sửa">
            <Button disabled={record.giangVienId != null} variant='outlined' color='blue' type="text" icon={<FontAwesomeIcon icon={faPen} />}
              onClick={() => {
                dispatch([
                  { type: 'setEditForm', payload: record },
                  { type: 'updateFormMode', payload: 'edit' },
                  { type: 'updateAddModal', payload: true }
                ])
              }} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button variant='outlined' color='red' type="text" danger icon={<FontAwesomeIcon icon={faTrash} />}
              onClick={async () => {
                await DeleteLopHocPhan(record.id)
                dispatch([
                  { type: "updateLopHocPhanData", payload: await GetLopHocPhanList() },
                  { type: 'updateFilterLopHocPhan', payload: [] }
                ])
                message.success(`Xóa thành công ${record.tenLop}!`)
              }} />
          </Tooltip>
        </Space>
      ),
    },
  ].filter(_ => !!_);

  const rowSelection = {
    selectedRowKeys: selectedLopHocPhan.map(i => i.id),
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch([{ type: 'updateSelectedRows', payload: [...selectedRows] }])
    },
    getCheckboxProps: (record) => {
      console.log(record)
      return {
        disabled: record.giangVienId != null || new Date(record.thoiGianBatDau) < Date.now(),
      }
    },
  };
  console.log(lopHocPhanData)
  return (
    <Table
      rowKey="id"
      columns={columns}
      scroll={{ x: 1200 }}
      rowSelection={rowSelection}
      dataSource={lopHocPhanData.filter(i => (khoaId == 'all' || i.khoaId == khoaId)
        && (hocKiId == 'all' || i.hocKiId == hocKiId)
        && (!lop || i.tenLop.toLowerCase().includes(lop?.toLowerCase()))
        && (namHoc == 'all' || new Date(i.thoiGianBatDau).getFullYear() == namHoc))}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} lớp học phần`
      }}
    />
  )
}

export default DataTable;