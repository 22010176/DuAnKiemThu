import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, message, Space, Table, Tag, Tooltip } from 'antd';

import { DeleteLopHocPhan, GetLopHocPhanList } from "@/api/lopHocPhanApi";

import { useData } from "./context";

function DataTable() {
  const [{
    lopHocPhanData, selectedLopHocPhan, filterLopHocPhan
  }, dispatch] = useData()

  const columns = [
    { title: <p className='text-lg font-semibold'>STT</p>, key: 'stt', width: 70, align: 'center', render: (_, __, index) => index + 1, },
    { title: <p className='text-lg font-semibold'>Mã lớp</p>, dataIndex: 'maLop', key: 'maLop', width: 120, },
    { title: <p className='text-lg font-semibold'>Tên lớp</p>, dataIndex: 'tenLop', key: 'tenLop', width: 200, },
    { title: <p className='text-lg font-semibold'>Học phần</p>, dataIndex: 'tenHocPhan', key: 'tenHocPhan', width: 150, },
    { title: <p className='text-lg font-semibold'>Khoa</p>, dataIndex: 'tenKhoa', key: 'tenKhoa', width: 150, },
    // { title: <p className='text-lg font-semibold'>Học kì</p>, key: 'tenKi', dataIndex: 'tenKi', width: 120, render: (_, record) => `${record.ky} (${record.namHoc})` },
    { title: <p className='text-lg font-semibold'>Sinh viên</p>, dataIndex: 'soLuongSinhVien', key: 'soLuongSinhVien', width: 90, align: 'center' },
    { title: <p className='text-lg font-semibold'>Tín chỉ</p>, dataIndex: 'soTinChi', key: 'soTinChi', width: 70, align: 'center' },
    { title: <p className='text-lg font-semibold'>Giáo viên</p>, dataIndex: 'tenGiangVien', key: 'tenGiangVien', width: 150, render: (giangVien) => giangVien || <Tag color="orange">Chưa phân công</Tag> },
    {
      title: <p className='text-lg font-semibold'>Thao tác</p>, key: 'action', width: 120, fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title="Sửa">
            <Button variant='outlined' color='blue' type="text" icon={<FontAwesomeIcon icon={faPen} />} onClick={() => { }} />
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
  ];
  const rowSelection = {
    selectedRowKeys: selectedLopHocPhan.map(i => i.id),
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch([{ type: 'updateSelectedRows', payload: [...selectedRows] }])
    },
    getCheckboxProps: (record) => ({
      disabled: record.giangVienId,
    }),
  };

  return (
    <Table
      columns={columns}
      dataSource={filterLopHocPhan.length ? filterLopHocPhan : lopHocPhanData}
      rowKey="id"
      scroll={{ x: 1200 }}
      rowSelection={rowSelection}
      pagination={{
        pageSize: 10,
        // total: filteredData.length,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} lớp học phần`
      }}
    />
  )
}

export default DataTable;