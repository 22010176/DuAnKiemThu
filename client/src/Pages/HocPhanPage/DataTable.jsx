import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "antd";
import { useContext } from "react";

import { Context } from "./context";

function TableHeader({ children }) {
  return (
    <p className="text-lg font-semibold">{children} </p>
  )
}

function DataTable() {
  const [state, dispatch] = useContext(Context)

  const columns = [
    { title: <TableHeader>STT</TableHeader>, key: 'stt', width: 60, align: 'center', render: (_, __, index) => index + 1, },
    { title: <TableHeader>Mã học phần</TableHeader>, dataIndex: 'maHocPhan', key: 'maHocPhan', width: 120, },
    { title: <TableHeader>Tên học phần</TableHeader>, dataIndex: 'tenHocPhan', key: 'tenHocPhan', width: 200, },
    { title: <TableHeader>Số tín chỉ</TableHeader>, dataIndex: 'soTinChi', key: 'soTinChi', width: 100, align: 'center', },
    { title: <TableHeader>Hệ số</TableHeader>, dataIndex: 'heSoHocPhan', key: 'heSoHocPhan', width: 80, align: 'center', },
    { title: <TableHeader>Số tiết</TableHeader>, dataIndex: 'soTiet', key: 'soTiet', width: 80, align: 'center', },
    { title: <TableHeader>Khoa</TableHeader>, dataIndex: 'khoa', key: 'khoa', width: 120, },
    {
      title: <TableHeader>Thao tác</TableHeader>, key: 'action', width: 100, align: 'center',
      render: (_, record) => (
        <Space>
          <Button variant="outlined" color="blue" icon={<FontAwesomeIcon icon={faPen} />} onClick={() => { }} style={{ padding: 0 }} />
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => { }} okText="Có" cancelText="Không">
            <Button variant="outlined" color="red" icon={<FontAwesomeIcon icon={faTrash} />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className='rounded bg-white shadow'>
      <Table
        columns={columns}
        dataSource={[]}
        rowKey="id"
        size="small"
        bordered
        scroll={{ x: 800 }}
        pagination={{
          pageSize: 15,
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} trong tổng số ${total} bản ghi`,
        }} />
    </div>
  )
}

export default DataTable