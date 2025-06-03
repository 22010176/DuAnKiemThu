import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { faArrowRotateRight, faCheck, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, DatePicker, Form, message, Modal, Popconfirm, Select, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { CreateHocKy, GetHocKyList } from '@/api/khoaApi';

const { Option } = Select;
const { RangePicker } = DatePicker;

const HocKiPage = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedNamHoc, setSelectedNamHoc] = useState('');
  const [kyData, setKyData] = useState({})

  const [formData, setFormData] = useState({ tenKi: '', thoiGianBatDau: '', thoiGianKetThuc: '' });
  const [createForm, setCreateForm] = useState(false);

  async function updateData() {
    const data = await GetHocKyList();
    setHocKyData(data);
  }

  useEffect(function () {
    updateData();
  }, [])

  const [hocKyData, setHocKyData] = useState([
    { key: '1', id: 'HK1_2024', tenKy: 'Học kỳ 1', namHoc: '2024-2025', ngayBatDau: '2024-09-01', ngayKetThuc: '2024-12-30', trangThai: 'Đang diễn ra' },
    { key: '2', id: 'HK2_2024', tenKy: 'Học kỳ 2', namHoc: '2024-2025', ngayBatDau: '2025-01-15', ngayKetThuc: '2025-05-30', trangThai: 'Sắp diễn ra' },
    { key: '3', id: 'HK3_2024', tenKy: 'Học kỳ hè', namHoc: '2024-2025', ngayBatDau: '2025-06-15', ngayKetThuc: '2025-08-15', trangThai: 'Chưa bắt đầu' }
  ]);

  const namHocList = [2023, 2024, 2025, 2026, 2027]

  const columns = [
    { title: <p className='text-lg font-semibold'>STT</p>, dataIndex: 'stt', key: 'stt', width: 150, render: (text, _, i) => <span className='text-lg'>{i + 1}</span> },
    { title: <p className='text-lg font-semibold'>Tên học kỳ</p>, dataIndex: 'tenKy', key: 'tenKy', width: 150, render: (text) => <span className='text-lg'>{text}</span> },
    { title: <p className='text-lg font-semibold'>Năm học</p>, dataIndex: 'namHoc', key: 'namHoc', width: 120, align: 'center', render: (text) => <span className='text-lg'>{text}</span> },
    { title: <p className='text-lg font-semibold'>Ngày bắt đầu</p>, dataIndex: 'ngayBatDau', key: 'ngayBatDau', width: 120, align: 'center', render: (date) => <span className='text-lg'>{dayjs(date).format('DD/MM/YYYY')}</span> },
    { title: <p className='text-lg font-semibold'>Ngày kết thúc</p>, dataIndex: 'ngayKetThuc', key: 'ngayKetThuc', width: 120, align: 'center', render: (date) => <span className='text-lg'>{dayjs(date).format('DD/MM/YYYY')}</span> },
    {
      title: <p className='text-lg font-semibold'>Trạng thái</p>, dataIndex: 'trangThai', key: 'trangThai', width: 120, align: 'center',
      render: (status) => {
        let color = 'default';
        if (status === 'Đang diễn ra') color = 'green';
        else if (status === 'Sắp diễn ra') color = 'blue';
        else if (status === 'Đã kết thúc') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: <p className='text-lg font-semibold'>Thao tác</p>, key: 'action', width: 120, align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => handleDelete(record.key)} okText="Có" cancelText="Không">
            <Button type="primary" danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredData = hocKyData?.filter?.(item => !selectedNamHoc || item.namHoc === selectedNamHoc);

  const showModal = () => {
    setIsModalVisible(true);
    setEditingId(null);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setIsModalVisible(true);
    setEditingId(record.key);
    form.setFieldsValue({ ...record, thoiGian: [dayjs(record.ngayBatDau), dayjs(record.ngayKetThuc())] });
  };

  const handleDelete = (key) => {
    setHocKyData(hocKyData.filter(item => item.key !== key));
    message.success('Xóa học kỳ thành công!');
  };

  const handleOk = async () => {
    console.log(formData)
    const a = await CreateHocKy({
      tenKi: `${formData?.tenKi}_${formData?.tenKi + 1}_${((kyData?.nam?.find(i => i.nam == formData?.tenKi)?.count) || 0) + 1}`,
      thoiGianBatDau: formData?.thoiGianBatDau,
      thoiGianKetThuc: formData?.thoiGianKetThuc
    })
    updateData();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className='p-6 bg-white min-h-screen'>
      {/* Bộ lọc và nút thêm */}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div>
            <span style={{ marginRight: '8px', fontWeight: 'bold' }}>Năm học:</span>
            <Select placeholder="Chọn năm học" style={{ width: '150px' }} value={selectedNamHoc} onChange={setSelectedNamHoc} allowClear>
              {namHocList.map(nam => <Option key={nam} value={nam}>{nam}</Option>)}
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2 items-center">
          <Button variant="link" color="orange" icon={<FontAwesomeIcon icon={faPlus} className="scale-150" />} onClick={() => { setCreateForm(true) }} />
          <Button variant="link" color="green" icon={<FontAwesomeIcon icon={faUpload} className="scale-150" />} onClick={() => { }} />
          <Button variant="link" color="blue" icon={<FontAwesomeIcon icon={faArrowRotateRight} className="scale-150" />} />
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <Table className='mt-4' columns={columns} dataSource={filteredData}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} học kỳ`,
        }} scroll={{ x: 800 }} size="small" />

      {/* Modal thêm/sửa */}
      <Modal
        title={<h1 className="text-xl font-bold text-blue-900 uppercase">{editingId ? 'Sửa học kì' : 'Thêm học kì mới'}</h1>}
        open={createForm}
        // onOk={handleOk}
        // onCancel={handleCancel}
        footer={[
          <Button htmlType="submit" className="w-min self-end" variant="solid" color="orange" icon={<FontAwesomeIcon icon={faCheck} />} onClick={handleOk}>
            Hoàn thành
          </Button>
        ]}
        width={600}>
        <Form form={form} layout="vertical" initialValues={{ trangThai: 'Chưa bắt đầu' }}>
          <Form.Item name="namHoc" label="Năm học" rules={[{ required: true, message: 'Vui lòng chọn năm học!' }]}>
            <Select placeholder="Chọn năm học"
              onChange={e => {
                console.log(e)
                setFormData(d => ({ ...d, tenKi: e }));
              }}>
              {namHocList.map(nam => <Option key={nam} value={nam}>{`${nam}-${nam + 1}`}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="thoiGian" label="Thời gian" rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}>
            <RangePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder={['Ngày bắt đầu', 'Ngày kết thúc']} onChange={e => {
              const d1 = new Date(e[0]?.$d)
              const d2 = new Date(e[1]?.$d)
              setFormData(d => ({
                ...d,
                thoiGianBatDau: d1.toISOString().split('T')[0],
                thoiGianKetThuc: d2.toISOString().split('T')[0]
              }));
            }} />
          </Form.Item>
          <Form.Item name="tenKy" label="Tên học kỳ" rules={[{ required: true, message: 'Vui lòng nhập tên học kỳ!' }]}>
            <p className='border border-gray-400 h-8 py-1 px-2 bg-gray-100 opacity-50 rounded'>
              {/* {formData?.tenKi}_{formData?.tenKi + 1}_{((kyData?.nam?.find(i => i.nam == formData?.tenKi)?.count) || 0) + 1} */}
            </p>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HocKiPage;