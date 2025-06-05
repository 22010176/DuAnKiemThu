import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { DeleteHocKy, GetHocKyList } from '@/api/hocKiApi';
import { useData } from './context';


function TableHeader({ children }) {
  return <p className='text-lg font-semibold'>{children}</p>
}

function DataTable() {
  const [{
    data, kyData
  }, dispatch] = useData()

  useEffect(function () {
    GetHocKyList()
      .then(res => {
        dispatch({ type: "updateKyData", payload: res.map((i, j) => ({ ...i, key: j })) })
      })
  }, [dispatch])

  const columns = [
    { title: <TableHeader>STT</TableHeader>, dataIndex: 'stt', key: 'stt', width: 150, render: (text, _, i) => <span className='text-lg'>{i + 1}</span> },
    { title: <TableHeader>Tên học kỳ</TableHeader>, dataIndex: 'tenKi', key: 'tenKi', width: 150, render: (text) => <span className='text-lg'>{text}</span> },
    { title: <TableHeader>Năm học</TableHeader>, dataIndex: 'namHoc', key: 'namHoc', width: 120, align: 'center', render: (_, i) => <span className='text-lg'>{new Date(i.thoiGianBatDau).getFullYear()}</span> },
    { title: <TableHeader>Ngày bắt đầu</TableHeader>, dataIndex: 'thoiGianBatDau', key: 'thoiGianBatDau', width: 120, align: 'center', render: (date) => <span className='text-lg'>{dayjs(date).format('DD/MM/YYYY')}</span> },
    { title: <TableHeader>Ngày kết thúc</TableHeader>, dataIndex: 'thoiGianKetThuc', key: 'thoiGianKetThuc', width: 120, align: 'center', render: (date) => <span className='text-lg'>{dayjs(date).format('DD/MM/YYYY')}</span> },
    {
      title: <TableHeader>Trạng thái</TableHeader>, dataIndex: 'trangThai', key: 'trangThai', width: 120, align: 'center',
      render: (status) => {
        let color = 'default';
        if (status === 'Đang diễn ra') color = 'green';
        else if (status === 'Sắp diễn ra') color = 'blue';
        else if (status === 'Đã kết thúc') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: <TableHeader>Thao tác</TableHeader>, key: 'action', width: 120, align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" size="small" icon={<EditOutlined />}
            onClick={() => {
              dispatch([
                { type: "updateModelMode", payload: "edit" },
                { type: "updateModel", payload: true },
                { type: "setFormData", payload: { ...record } },
              ])
            }} />
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" okText="Có" cancelText="Không"
            onConfirm={async () => {
              await DeleteHocKy(record.id)

              const reuslt = await GetHocKyList()

              dispatch([
                { type: "updateKyData", payload: reuslt },
                // { type: "updateSelectedYear", payload: 'all' }
              ])
            }}>
            <Button type="primary" danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <Table className='mt-4' columns={columns} dataSource={kyData}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} học kỳ`,
      }} scroll={{ x: 800 }} size="small" />
  )
}

export default DataTable