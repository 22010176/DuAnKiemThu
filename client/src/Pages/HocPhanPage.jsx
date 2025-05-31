import React, { useState } from 'react';
import { Table, Button, Space, Input, Select, Modal, InputNumber, message, Popconfirm } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const HocPhanPage = () => {
  const [hocPhanList, setHocPhanList] = useState([
    { 
      id: 1, 
      maHocPhan: 'CNTT_1', 
      tenHocPhan: 'Giải tích', 
      soTinChi: 3, 
      heSoHocPhan: 1.5, 
      soTiet: 45,
      khoa: 'CNTT'
    },
    { 
      id: 2, 
      maHocPhan: 'CNTT_2', 
      tenHocPhan: 'Toán rời rạc', 
      soTinChi: 2, 
      heSoHocPhan: 1.2, 
      soTiet: 30,
      khoa: 'CNTT'
    },
    { 
      id: 3, 
      maHocPhan: 'KHXH_1', 
      tenHocPhan: 'Triết học', 
      soTinChi: 2, 
      heSoHocPhan: 1.0, 
      soTiet: 30,
      khoa: 'KHXH'
    },
    { 
      id: 4, 
      maHocPhan: 'NN_1', 
      tenHocPhan: 'Tiếng Anh khoa học', 
      soTinChi: 3, 
      heSoHocPhan: 1.0, 
      soTiet: 45,
      khoa: 'NGOẠI NGỮ'
    },
    { 
      id: 5, 
      maHocPhan: 'CNTT_3', 
      tenHocPhan: 'Thực tập', 
      soTinChi: 2, 
      heSoHocPhan: 1.0, 
      soTiet: 30,
      khoa: 'CNTT'
    }
  ]);

  const [filteredData, setFilteredData] = useState(hocPhanList);
  const [selectedKhoa, setSelectedKhoa] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  
  // Form data state
  const [maHocPhan, setMaHocPhan] = useState('');
  const [tenHocPhan, setTenHocPhan] = useState('');
  const [khoa, setKhoa] = useState('');
  const [soTinChi, setSoTinChi] = useState(1);
  const [heSoHocPhan, setHeSoHocPhan] = useState(1.0);
  const [soTiet, setSoTiet] = useState(15);

  const khoaList = ['CNTT', 'KHXH', 'NGOẠI NGỮ', 'TOÁN', 'VẬT LÝ', 'HÓA HỌC'];

  // Filter data based on khoa and search text
  const handleFilter = () => {
    let filtered = hocPhanList;
    
    if (selectedKhoa !== 'all') {
      filtered = filtered.filter(item => item.khoa === selectedKhoa);
    }
    
    if (searchText) {
      filtered = filtered.filter(item => 
        item.tenHocPhan.toLowerCase().includes(searchText.toLowerCase()) ||
        item.maHocPhan.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    setFilteredData(filtered);
  };

  React.useEffect(() => {
    handleFilter();
  }, [selectedKhoa, searchText, hocPhanList]);

  const resetForm = () => {
    setMaHocPhan('');
    setTenHocPhan('');
    setKhoa('');
    setSoTinChi(1);
    setHeSoHocPhan(1.0);
    setSoTiet(15);
  };

  const handleAdd = () => {
    setEditingRecord(null);
    resetForm();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setMaHocPhan(record.maHocPhan);
    setTenHocPhan(record.tenHocPhan);
    setKhoa(record.khoa);
    setSoTinChi(record.soTinChi);
    setHeSoHocPhan(record.heSoHocPhan);
    setSoTiet(record.soTiet);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setHocPhanList(prev => prev.filter(item => item.id !== id));
    message.success('Xóa học phần thành công!');
  };

  const handleSubmit = () => {
    // Validation
    if (!maHocPhan || !tenHocPhan || !khoa) {
      message.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const formData = {
      maHocPhan,
      tenHocPhan,
      khoa,
      soTinChi,
      heSoHocPhan,
      soTiet
    };

    if (editingRecord) {
      // Update existing record
      setHocPhanList(prev => 
        prev.map(item => 
          item.id === editingRecord.id 
            ? { ...formData, id: editingRecord.id }
            : item
        )
      );
      message.success('Cập nhật học phần thành công!');
    } else {
      // Add new record
      const newId = Math.max(...hocPhanList.map(item => item.id)) + 1;
      setHocPhanList(prev => [...prev, { ...formData, id: newId }]);
      message.success('Thêm học phần thành công!');
    }
    
    setIsModalVisible(false);
    resetForm();
  };

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Mã học phần',
      dataIndex: 'maHocPhan',
      key: 'maHocPhan',
      width: 120,
    },
    {
      title: 'Tên học phần',
      dataIndex: 'tenHocPhan',
      key: 'tenHocPhan',
      width: 200,
    },
    {
      title: 'Số tín chỉ',
      dataIndex: 'soTinChi',
      key: 'soTinChi',
      width: 100,
      align: 'center',
    },
    {
      title: 'Hệ số',
      dataIndex: 'heSoHocPhan',
      key: 'heSoHocPhan',
      width: 80,
      align: 'center',
    },
    {
      title: 'Số tiết',
      dataIndex: 'soTiet',
      key: 'soTiet',
      width: 80,
      align: 'center',
    },
    {
      title: 'Khoa',
      dataIndex: 'khoa',
      key: 'khoa',
      width: 120,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record)}
            style={{ padding: 0 }}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button 
              type="link"
              danger 
              icon={<DeleteOutlined />} 
              size="small"
              style={{ padding: 0 }}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ 
      padding: '16px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      {/* Header with filters and add button */}
      <div style={{ 
        backgroundColor: 'white',
        padding: '16px',
        marginBottom: '16px',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h3 style={{ margin: 0, color: '#1890ff' }}>Danh sách học phần</h3>
          <Button 
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Thêm mới
          </Button>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Select
            placeholder="Chọn khoa"
            style={{ width: 180 }}
            value={selectedKhoa}
            onChange={setSelectedKhoa}
            size="middle"
          >
            <Option value="all">Tất cả khoa</Option>
            {khoaList.map(k => (
              <Option key={k} value={k}>{k}</Option>
            ))}
          </Select>
          
          <Input
            placeholder="Tìm kiếm theo tên hoặc mã học phần"
            prefix={<SearchOutlined />}
            style={{ width: 280 }}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            size="middle"
          />
        </div>
      </div>

      {/* Table container */}
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            pageSize: 15,
            showSizeChanger: false,
            showQuickJumper: false,
            showTotal: (total, range) => 
              `Hiển thị ${range[0]}-${range[1]} trong tổng số ${total} bản ghi`,
            size: 'small'
          }}
          size="middle"
          bordered
          scroll={{ x: 800 }}
        />
      </div>

      {/* Modal for Add/Edit */}
      <Modal
        title={editingRecord ? 'Sửa học phần' : 'Thêm học phần mới'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          resetForm();
        }}
        onOk={handleSubmit}
        okText={editingRecord ? 'Cập nhật' : 'Thêm'}
        cancelText="Hủy"
        width={600}
      >
        <div style={{ paddingTop: '16px' }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 6, 
              fontWeight: 500,
              color: '#333'
            }}>
              Mã học phần <span style={{ color: 'red' }}>*</span>
            </label>
            <Input 
              placeholder="Nhập mã học phần (VD: BC-1)" 
              value={maHocPhan}
              onChange={e => setMaHocPhan(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 6, 
              fontWeight: 500,
              color: '#333'
            }}>
              Tên học phần <span style={{ color: 'red' }}>*</span>
            </label>
            <Input 
              placeholder="Nhập tên học phần" 
              value={tenHocPhan}
              onChange={e => setTenHocPhan(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 6, 
              fontWeight: 500,
              color: '#333'
            }}>
              Khoa <span style={{ color: 'red' }}>*</span>
            </label>
            <Select 
              placeholder="Chọn khoa"
              style={{ width: '100%' }}
              value={khoa}
              onChange={setKhoa}
            >
              {khoaList.map(k => (
                <Option key={k} value={k}>{k}</Option>
              ))}
            </Select>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 6, 
                fontWeight: 500,
                color: '#333'
              }}>
                Số tín chỉ <span style={{ color: 'red' }}>*</span>
              </label>
              <InputNumber 
                min={1} 
                max={10} 
                placeholder="3"
                style={{ width: '100%' }}
                value={soTinChi}
                onChange={setSoTinChi}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 6, 
                fontWeight: 500,
                color: '#333'
              }}>
                Hệ số <span style={{ color: 'red' }}>*</span>
              </label>
              <InputNumber 
                min={0.1} 
                max={3.0} 
                step={0.1} 
                placeholder="1.5"
                style={{ width: '100%' }}
                value={heSoHocPhan}
                onChange={setHeSoHocPhan}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 6, 
                fontWeight: 500,
                color: '#333'
              }}>
                Số tiết <span style={{ color: 'red' }}>*</span>
              </label>
              <InputNumber 
                min={15} 
                max={150} 
                placeholder="45"
                style={{ width: '100%' }}
                value={soTiet}
                onChange={setSoTiet}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HocPhanPage;