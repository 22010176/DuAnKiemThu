import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Select, Space, Card, Row, Col, Tag, message, AutoComplete, Input, Divider, Typography, Alert } from 'antd';
import { UserAddOutlined, SearchOutlined, CheckOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title, Text } = Typography;

const PhanCongGVPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teacherSearchValue, setTeacherSearchValue] = useState('');
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [filters, setFilters] = useState({
    khoa: '',
    namHoc: '2024-2025',
    ky: 'Kỳ 1'
  });

  // Mock data for classes
  const [classData, setClassData] = useState([
    {
      id: 1, maLop: 'CNTT01_01', tenLop: 'Lập trình Java - Lớp 1', hocPhan: 'Lập trình Java', maHocPhan: 'CNTT01', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 45, soTinChi: 3, trangThai: 'Đang mở', giangVien: null, maGiangVien: null
    },
    {
      id: 2,
      maLop: 'CNTT02_01',
      tenLop: 'Cơ sở dữ liệu - Lớp 1',
      hocPhan: 'Cơ sở dữ liệu',
      maHocPhan: 'CNTT02',
      khoa: 'Công nghệ thông tin',
      ky: 'Kỳ 1',
      namHoc: '2024-2025',
      soSinhVien: 40,
      soTinChi: 3,
      trangThai: 'Đang mở',
      giangVien: 'Nguyễn Văn A',
      maGiangVien: 'GV001'
    },
    {
      id: 3,
      maLop: 'CNTT01_02',
      tenLop: 'Lập trình Java - Lớp 2',
      hocPhan: 'Lập trình Java',
      maHocPhan: 'CNTT01',
      khoa: 'Công nghệ thông tin',
      ky: 'Kỳ 1',
      namHoc: '2024-2025',
      soSinhVien: 42,
      soTinChi: 3,
      trangThai: 'Đang mở',
      giangVien: null,
      maGiangVien: null
    }
  ]);

  // Mock teacher data
  const teacherList = [
    { id: 'GV001', name: 'Nguyễn Văn A', khoa: 'Công nghệ thông tin', email: 'nguyenvana@email.com' },
    { id: 'GV002', name: 'Trần Thị B', khoa: 'Công nghệ thông tin', email: 'tranthib@email.com' },
    { id: 'GV003', name: 'Lê Văn C', khoa: 'Công nghệ thông tin', email: 'levanc@email.com' },
    { id: 'GV004', name: 'Phạm Thị D', khoa: 'Kinh tế', email: 'phamthid@email.com' },
    { id: 'GV005', name: 'Hoàng Văn E', khoa: 'Ngoại ngữ', email: 'hoangvane@email.com' }
  ];

  const khoaOptions = ['Công nghệ thông tin', 'Kinh tế', 'Ngoại ngữ', 'Cơ khí'];
  const namHocOptions = ['2024-2025', '2023-2024', '2022-2023'];
  const kyOptions = ['Kỳ 1', 'Kỳ 2', 'Kỳ hè'];

  const columns = [
    {
      title: 'Mã lớp',
      dataIndex: 'maLop',
      key: 'maLop',
      width: 120,
    },
    {
      title: 'Tên lớp',
      dataIndex: 'tenLop',
      key: 'tenLop',
      width: 200,
    },
    {
      title: 'Học phần',
      dataIndex: 'hocPhan',
      key: 'hocPhan',
      width: 150,
    },
    {
      title: 'Khoa',
      dataIndex: 'khoa',
      key: 'khoa',
      width: 150,
    },
    {
      title: 'Kỳ/Năm',
      key: 'kyNam',
      width: 120,
      render: (record) => `${record.ky} - ${record.namHoc}`
    },
    {
      title: 'SV',
      dataIndex: 'soSinhVien',
      key: 'soSinhVien',
      width: 60,
      align: 'center'
    },
    {
      title: 'Tín chỉ',
      dataIndex: 'soTinChi',
      key: 'soTinChi',
      width: 70,
      align: 'center'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      width: 120,
      render: (trangThai) => {
        let color = trangThai === 'Đang mở' ? 'green' :
          trangThai === 'Chưa phân công' ? 'orange' : 'red';
        return <Tag color={color}>{trangThai}</Tag>;
      }
    },
    {
      title: 'Giảng viên',
      key: 'giangVien',
      width: 200,
      render: (record) => (
        record.giangVien ? (
          <Space>
            <Tag color="green">{record.maGiangVien}</Tag>
            <Text>{record.giangVien}</Text>
          </Space>
        ) : (
          <Tag color="orange">Chưa phân công</Tag>
        )
      )
    }
  ];

  // Filter data based on current filters
  const filteredData = classData.filter(item => {
    return item.trangThai === 'Đang mở' &&
      (!filters.khoa || item.khoa === filters.khoa) &&
      item.namHoc === filters.namHoc &&
      item.ky === filters.ky;
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    getCheckboxProps: (record) => ({
      disabled: record.trangThai !== 'Đang mở'
    }),
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setSelectedRowKeys([]); // Clear selection when filter changes
  };

  const handleTeacherSearch = (value) => {
    setTeacherSearchValue(value);
    if (value) {
      const filtered = teacherList.filter(teacher =>
        teacher.id.toLowerCase().includes(value.toLowerCase()) ||
        teacher.name.toLowerCase().includes(value.toLowerCase())
      );
      setTeacherOptions(filtered.map(teacher => ({
        value: teacher.id,
        label: `${teacher.id} - ${teacher.name}`,
        teacher: teacher
      })));
    } else {
      setTeacherOptions([]);
    }
  };

  const handleTeacherSelect = (value, option) => {
    setSelectedTeacher(option.teacher);
    setTeacherSearchValue(`${option.teacher.id} - ${option.teacher.name}`);
  };

  const handleAssignTeacher = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một lớp để phân công!');
      return;
    }
    setIsModalVisible(true);
  };

  const handleConfirmAssign = () => {
    if (!selectedTeacher) {
      message.warning('Vui lòng chọn giảng viên!');
      return;
    }

    const updatedClassData = classData.map(item => {
      if (selectedRowKeys.includes(item.id)) {
        return {
          ...item,
          giangVien: selectedTeacher.name,
          maGiangVien: selectedTeacher.id
        };
      }
      return item;
    });

    setClassData(updatedClassData);
    setSelectedRowKeys([]);
    setSelectedTeacher(null);
    setTeacherSearchValue('');
    setIsModalVisible(false);
    message.success(`Đã phân công thành công ${selectedRowKeys.length} lớp cho ${selectedTeacher.name}!`);
  };

  const handleRemoveAssignment = (classId) => {
    Modal.confirm({
      title: 'Xác nhận hủy phân công',
      content: 'Bạn có chắc chắn muốn hủy phân công giảng viên cho lớp này?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: () => {
        const updatedClassData = classData.map(item => {
          if (item.id === classId) {
            return {
              ...item,
              giangVien: null,
              maGiangVien: null
            };
          }
          return item;
        });
        setClassData(updatedClassData);
        message.success('Đã hủy phân công thành công!');
      }
    });
  };

  const selectedClasses = classData.filter(item => selectedRowKeys.includes(item.id));

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2} style={{ margin: 0, color: '#001529' }}>
                Phân Công Giảng Viên
              </Title>
            </Col>
            <Col>
              <Space>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    setSelectedRowKeys([]);
                    message.info('Đã làm mới dữ liệu');
                  }}
                >
                  Làm mới
                </Button>
                <Button
                  type="primary"
                  icon={<UserAddOutlined />}
                  disabled={selectedRowKeys.length === 0}
                  onClick={handleAssignTeacher}
                >
                  Phân công GV ({selectedRowKeys.length})
                </Button>
              </Space>
            </Col>
          </Row>
        </div>

        {/* Filters */}
        <Card size="small" style={{ marginBottom: '16px', backgroundColor: '#fafafa' }}>
          <Row gutter={16} align="middle">
            <Col span={6}>
              <Select
                placeholder="Chọn khoa"
                allowClear
                style={{ width: '100%' }}
                value={filters.khoa}
                onChange={(value) => handleFilterChange('khoa', value)}
              >
                {khoaOptions.map(khoa => (
                  <Option key={khoa} value={khoa}>{khoa}</Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <Select
                placeholder="Chọn năm học"
                style={{ width: '100%' }}
                value={filters.namHoc}
                onChange={(value) => handleFilterChange('namHoc', value)}
              >
                {namHocOptions.map(nam => (
                  <Option key={nam} value={nam}>{nam}</Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <Select
                placeholder="Chọn kỳ"
                style={{ width: '100%' }}
                value={filters.ky}
                onChange={(value) => handleFilterChange('ky', value)}
              >
                {kyOptions.map(ky => (
                  <Option key={ky} value={ky}>{ky}</Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <Alert
                message={`Hiển thị ${filteredData.length} lớp đang mở`}
                type="info"
                showIcon
                style={{ textAlign: 'center' }}
              />
            </Col>
          </Row>
        </Card>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          scroll={{ x: 1200 }}
          rowSelection={rowSelection}
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} lớp học phần`
          }}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ padding: '16px', backgroundColor: '#fafafa' }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Space direction="vertical" size="small">
                      <Text><strong>Thông tin lớp:</strong></Text>
                      <Text>Mã học phần: {record.maHocPhan}</Text>
                      <Text>Số tín chỉ: {record.soTinChi}</Text>
                      <Text>Số sinh viên: {record.soSinhVien}</Text>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space direction="vertical" size="small">
                      <Text><strong>Thao tác:</strong></Text>
                      {record.giangVien ? (
                        <Button
                          type="link"
                          danger
                          icon={<CloseOutlined />}
                          onClick={() => handleRemoveAssignment(record.id)}
                        >
                          Hủy phân công
                        </Button>
                      ) : (
                        <Text type="secondary">Chưa có giảng viên</Text>
                      )}
                    </Space>
                  </Col>
                </Row>
              </div>
            ),
            rowExpandable: () => true,
          }}
        />
      </Card>

      {/* Assignment Modal */}
      <Modal
        title="Phân công giảng viên"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedTeacher(null);
          setTeacherSearchValue('');
        }}
        footer={null}
        width={700}
      >
        <div style={{ marginBottom: '16px' }}>
          <Title level={4}>Danh sách lớp được chọn:</Title>
          <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #d9d9d9', padding: '8px', borderRadius: '4px' }}>
            {selectedClasses.map(cls => (
              <div key={cls.id} style={{ padding: '4px 0', borderBottom: '1px solid #f0f0f0' }}>
                <Space>
                  <Tag color="blue">{cls.maLop}</Tag>
                  <Text>{cls.tenLop}</Text>
                  <Text type="secondary">({cls.soSinhVien} SV)</Text>
                </Space>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        <div style={{ marginBottom: '16px' }}>
          <Title level={4}>Chọn giảng viên:</Title>
          <AutoComplete
            style={{ width: '100%' }}
            options={teacherOptions}
            onSearch={handleTeacherSearch}
            onSelect={handleTeacherSelect}
            value={teacherSearchValue}
            placeholder="Nhập mã GV hoặc tên giảng viên để tìm kiếm..."
          >
            <Input suffix={<SearchOutlined />} />
          </AutoComplete>
        </div>

        {selectedTeacher && (
          <Card size="small" style={{ marginBottom: '16px', backgroundColor: '#f6ffed', border: '1px solid #b7eb8f' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Space direction="vertical" size="small">
                  <Text><strong>Mã GV:</strong> {selectedTeacher.id}</Text>
                  <Text><strong>Tên:</strong> {selectedTeacher.name}</Text>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical" size="small">
                  <Text><strong>Khoa:</strong> {selectedTeacher.khoa}</Text>
                  <Text><strong>Email:</strong> {selectedTeacher.email}</Text>
                </Space>
              </Col>
            </Row>
          </Card>
        )}

        <Divider />

        <Row justify="end" gutter={8}>
          <Col>
            <Button onClick={() => {
              setIsModalVisible(false);
              setSelectedTeacher(null);
              setTeacherSearchValue('');
            }}>
              Hủy
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleConfirmAssign}
              disabled={!selectedTeacher}
            >
              Xác nhận phân công
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default PhanCongGVPage;