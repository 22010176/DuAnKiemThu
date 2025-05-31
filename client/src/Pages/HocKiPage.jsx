import React, { useState } from 'react';

const HocKiPage = () => {
  const [selectedNamHoc, setSelectedNamHoc] = useState('2023-2024');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    tenKi: '',
    namHoc: '2023-2024',
    ngayBatDau: '',
    ngayKetThuc: ''
  });

  // Dữ liệu mẫu
  const [namHocList] = useState(['2021-2022', '2022-2023', '2023-2024', '2024-2025']);
  const [hocKiData, setHocKiData] = useState([
    {
      id: 1,
      tenKi: 'Học kì 1',
      namHoc: '2023-2024',
      ngayBatDau: '2023-09-01',
      ngayKetThuc: '2024-01-15',
      trangThai: 'Đang diễn ra'
    },
    {
      id: 2,
      tenKi: 'Học kì 2',
      namHoc: '2023-2024',
      ngayBatDau: '2024-02-01',
      ngayKetThuc: '2024-06-30',
      trangThai: 'Chưa bắt đầu'
    },
    {
      id: 3,
      tenKi: 'Học kì hè',
      namHoc: '2023-2024',
      ngayBatDau: '2024-07-01',
      ngayKetThuc: '2024-08-31',
      trangThai: 'Chưa bắt đầu'
    }
  ]);

  const filteredHocKi = hocKiData.filter(item => item.namHoc === selectedNamHoc);

  const handleAdd = () => {
    setFormData({
      tenKi: '',
      namHoc: selectedNamHoc,
      ngayBatDau: '',
      ngayKetThuc: ''
    });
    setShowAddModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa học kì này?')) {
      setHocKiData(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.tenKi || !formData.ngayBatDau || !formData.ngayKetThuc) return;
    
    if (showAddModal) {
      const newItem = {
        ...formData,
        id: Date.now(),
        trangThai: 'Chưa bắt đầu'
      };
      setHocKiData(prev => [...prev, newItem]);
      setShowAddModal(false);
    } else {
      setHocKiData(prev => prev.map(item => 
        item.id === editingItem.id ? { ...formData, id: item.id } : item
      ));
      setShowEditModal(false);
    }
    setFormData({ tenKi: '', namHoc: selectedNamHoc, ngayBatDau: '', ngayKetThuc: '' });
  };

  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          width: '480px',
          maxWidth: '90vw',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '1px solid #e8e8e8',
            paddingBottom: '16px'
          }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{title}</h3>
            <button 
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#999',
                padding: '0',
                width: '24px',
                height: '24px'
              }}
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const buttonStyle = {
    padding: '6px 12px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    color: 'white'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none'
  };

  const selectStyle = {
    ...inputStyle,
    height: '36px'
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '240px', 
        backgroundColor: '#001529', 
        color: 'white',
        padding: '16px 0'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 16px',
          marginBottom: '32px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'white',
            borderRadius: '4px',
            marginRight: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: '#001529', fontWeight: 'bold', fontSize: '14px' }}>MTM</span>
          </div>
          <span style={{ fontWeight: 'bold' }}>UNIVERSITY</span>
        </div>
        
        <div style={{ padding: '0 16px' }}>
          <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '8px' }}>Quản lý lớp học</div>
          <div style={{
            backgroundColor: '#1890ff',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            marginBottom: '4px',
            cursor: 'pointer'
          }}>
            Học kì
          </div>
          <div style={{
            color: '#8c8c8c',
            padding: '8px 12px',
            borderRadius: '4px',
            marginBottom: '4px',
            cursor: 'pointer'
          }}>
            Học phần
          </div>
          <div style={{
            color: '#8c8c8c',
            padding: '8px 12px',
            borderRadius: '4px',
            marginBottom: '4px',
            cursor: 'pointer'
          }}>
            Lớp học phần
          </div>
          <div style={{
            color: '#8c8c8c',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Thống kê
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '24px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          {/* Header */}
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid #e8e8e8',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#262626' }}>Quản lý Học kì</h1>
              <p style={{ margin: '4px 0 0 0', color: '#8c8c8c', fontSize: '14px' }}>Quản lý các học kì trong năm học</p>
            </div>
            <button 
              onClick={handleAdd}
              style={primaryButtonStyle}
            >
              + Thêm học kì
            </button>
          </div>

          {/* Filters */}
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid #e8e8e8',
            backgroundColor: '#fafafa'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>Năm học:</label>
                <select 
                  value={selectedNamHoc}
                  onChange={(e) => setSelectedNamHoc(e.target.value)}
                  style={selectStyle}
                >
                  {namHocList.map(nam => (
                    <option key={nam} value={nam}>{nam}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#fafafa' }}>
                  <th style={{ 
                    padding: '12px 16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#8c8c8c',
                    borderBottom: '1px solid #e8e8e8'
                  }}>STT</th>
                  <th style={{ 
                    padding: '12px 16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#8c8c8c',
                    borderBottom: '1px solid #e8e8e8'
                  }}>Tên học kì</th>
                  <th style={{ 
                    padding: '12px 16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#8c8c8c',
                    borderBottom: '1px solid #e8e8e8'
                  }}>Năm học</th>
                  <th style={{ 
                    padding: '12px 16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#8c8c8c',
                    borderBottom: '1px solid #e8e8e8'
                  }}>Ngày bắt đầu</th>
                  <th style={{ 
                    padding: '12px 16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#8c8c8c',
                    borderBottom: '1px solid #e8e8e8'
                  }}>Ngày kết thúc</th>
                  <th style={{ 
                    padding: '12px 16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#8c8c8c',
                    borderBottom: '1px solid #e8e8e8'
                  }}>Trạng thái</th>
                  <th style={{ 
                    padding: '12px 16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#8c8c8c',
                    borderBottom: '1px solid #e8e8e8'
                  }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredHocKi.map((item, index) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #e8e8e8' }}>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#262626' }}>{index + 1}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#262626', fontWeight: '500' }}>{item.tenKi}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#262626' }}>{item.namHoc}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#262626' }}>{item.ngayBatDau}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#262626' }}>{item.ngayKetThuc}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '4px 8px',
                        fontSize: '12px',
                        borderRadius: '4px',
                        backgroundColor: item.trangThai === 'Đang diễn ra' ? '#f6ffed' : item.trangThai === 'Chưa bắt đầu' ? '#e6f7ff' : '#f5f5f5',
                        color: item.trangThai === 'Đang diễn ra' ? '#52c41a' : item.trangThai === 'Chưa bắt đầu' ? '#1890ff' : '#8c8c8c',
                        border: `1px solid ${item.trangThai === 'Đang diễn ra' ? '#b7eb8f' : item.trangThai === 'Chưa bắt đầu' ? '#91d5ff' : '#d9d9d9'}`
                      }}>
                        {item.trangThai}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button 
                        onClick={() => handleEdit(item)}
                        style={{
                          ...buttonStyle,
                          marginRight: '8px',
                          color: '#1890ff',
                          borderColor: '#1890ff'
                        }}
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        style={{
                          ...buttonStyle,
                          color: '#ff4d4f',
                          borderColor: '#ff4d4f'
                        }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredHocKi.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#8c8c8c',
              fontSize: '14px'
            }}>
              Không có dữ liệu học kì cho năm học {selectedNamHoc}
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      <Modal 
        show={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Thêm học kì mới"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#262626', marginBottom: '8px' }}>
              Tên học kì <span style={{ color: '#ff4d4f' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.tenKi}
              onChange={(e) => setFormData({...formData, tenKi: e.target.value})}
              style={inputStyle}
              placeholder="Ví dụ: Học kì 1"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#262626', marginBottom: '8px' }}>
              Năm học <span style={{ color: '#ff4d4f' }}>*</span>
            </label>
            <select
              value={formData.namHoc}
              onChange={(e) => setFormData({...formData, namHoc: e.target.value})}
              style={selectStyle}
            >
              {namHocList.map(nam => (
                <option key={nam} value={nam}>{nam}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#262626', marginBottom: '8px' }}>
              Ngày bắt đầu <span style={{ color: '#ff4d4f' }}>*</span>
            </label>
            <input
              type="date"
              value={formData.ngayBatDau}
              onChange={(e) => setFormData({...formData, ngayBatDau: e.target.value})}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#262626', marginBottom: '8px' }}>
              Ngày kết thúc <span style={{ color: '#ff4d4f' }}>*</span>
            </label>
            <input
              type="date"
              value={formData.ngayKetThuc}
              onChange={(e) => setFormData({...formData, ngayKetThuc: e.target.value})}
              style={inputStyle}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          <button
            onClick={() => setShowAddModal(false)}
            style={buttonStyle}
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            style={primaryButtonStyle}
          >
            Thêm
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal 
        show={showEditModal} 
        onClose={() => setShowEditModal(false)}
        title="Chỉnh sửa học kì"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#262626', marginBottom: '8px' }}>
              Tên học kì <span style={{ color: '#ff4d4f' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.tenKi}
              onChange={(e) => setFormData({...formData, tenKi: e.target.value})}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#262626', marginBottom: '8px' }}>
              Năm học <span style={{ color: '#ff4d4f' }}>*</span>
            </label>
            <select
              value={formData.namHoc}
              onChange={(e) => setFormData({...formData, namHoc: e.target.value})}
              style={selectStyle}
            >
              {namHocList.map(nam => (
                <option key={nam} value={nam}>{nam}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#262626', marginBottom: '8px' }}>
              Ngày bắt đầu <span style={{ color: '#ff4d4f' }}>*</span>
            </label>
            <input
              type="date"
              value={formData.ngayBatDau}
              onChange={(e) => setFormData({...formData, ngayBatDau: e.target.value})}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#262626', marginBottom: '8px' }}>
              Ngày kết thúc <span style={{ color: '#ff4d4f' }}>*</span>
            </label>
            <input
              type="date"
              value={formData.ngayKetThuc}
              onChange={(e) => setFormData({...formData, ngayKetThuc: e.target.value})}
              style={inputStyle}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          <button
            onClick={() => setShowEditModal(false)}
            style={buttonStyle}
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            style={primaryButtonStyle}
          >
            Cập nhật
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HocKiPage;