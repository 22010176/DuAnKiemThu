import { CheckOutlined, SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Card, Col, Divider, Input, Modal, Row, Select, Space, Tag, Typography, message } from 'antd';
import { useState } from 'react';

import { useData } from './context';

const { Title, Text } = Typography;

function PhanCongGiangVienModal() {
  const [messageApi, contextHolder] = message.useMessage()
  const [{
    giangVienModal, selectedLopHocPhan, lopHocPhanData, giangVienData
  }, dispatch] = useData()

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teacherSearchValue, setTeacherSearchValue] = useState('');
  const [teacherOptions, setTeacherOptions] = useState([]);


  // Mock data for classes
  const [classData, setClassData] = useState([
    { id: 1, maLop: 'CNTT01_01', tenLop: 'Lập trình Java - Lớp 1', hocPhan: 'Lập trình Java', maHocPhan: 'CNTT01', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 45, soTinChi: 3, trangThai: 'Đang mở', giangVien: null, maGiangVien: null },
    { id: 2, maLop: 'CNTT02_01', tenLop: 'Cơ sở dữ liệu - Lớp 1', hocPhan: 'Cơ sở dữ liệu', maHocPhan: 'CNTT02', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 40, soTinChi: 3, trangThai: 'Đang mở', giangVien: 'Nguyễn Văn A', maGiangVien: 'GV001' },
    { id: 3, maLop: 'CNTT01_02', tenLop: 'Lập trình Java - Lớp 2', hocPhan: 'Lập trình Java', maHocPhan: 'CNTT01', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 42, soTinChi: 3, trangThai: 'Đang mở', giangVien: null, maGiangVien: null }
  ]);



  const handleTeacherSearch = (value) => {
    setTeacherSearchValue(value);

    if (!value) return setTeacherOptions([])
    setTeacherOptions(giangVienData
      .filter(teacher =>
        teacher.id.toLowerCase().includes(value.toLowerCase()) ||
        teacher.tenGiangVien.toLowerCase().includes(value.toLowerCase()))
      .map(teacher => ({
        value: teacher.id,
        label: `${teacher.id} - ${teacher.tenGiangVien}`,
        teacher: teacher
      })));

  };

  const handleTeacherSelect = (value, option) => {
    setSelectedTeacher(option.teacher);
    setTeacherSearchValue(`${option.teacher.id} - ${option.teacher.tenGiangVien}`);
  };



  const handleConfirmAssign = () => {
    if (!selectedTeacher) return message.warning('Vui lòng chọn giảng viên!');;

    const updatedClassData = classData.map(item => {
      if (!selectedRowKeys.includes(item.id)) return item;

      return { ...item, giangVien: selectedTeacher.name, maGiangVien: selectedTeacher.id };
    });

    setClassData(updatedClassData);
    setSelectedRowKeys([]);
    setSelectedTeacher(null);
    setTeacherSearchValue('');
    messageApi.success(`Đã phân công thành công ${selectedRowKeys.length} lớp cho ${selectedTeacher.name}!`);
  };

  // classData.filter(item => selectedRowKeys.includes(item.id));
  return (
    <>
      {contextHolder}
      <Modal
        title="Phân công giảng viên"
        open={giangVienModal}
        footer={null}
        width={1000}
        onCancel={() => {
          dispatch([
            { type: "updateGiangVienModal", payload: false },
            { type: "updateSelectedRows", payload: [] },
          ])
        }}>
        <div style={{ marginBottom: '16px' }}>
          <Title level={4}>Danh sách lớp được chọn:</Title>
          <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #d9d9d9', padding: '8px', borderRadius: '4px' }}>
            {selectedLopHocPhan.map(cls => (
              <div key={cls.id} style={{ padding: '4px 0', borderBottom: '1px solid #f0f0f0' }}>
                <Space>
                  <Tag color="blue">{cls.maLop}</Tag>
                  <Text>{cls.tenLop}</Text>
                  <Text type="secondary">({cls.soLuongSinhVien} SV)</Text>
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
            placeholder="Nhập mã GV hoặc tên giảng viên để tìm kiếm...">
            <Input suffix={<SearchOutlined />} />
          </AutoComplete>
        </div>

        {selectedTeacher && (
          <Card size="small" style={{ marginBottom: '16px', backgroundColor: '#f6ffed', border: '1px solid #b7eb8f' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Space direction="vertical" size="small">
                  <Text><strong>Mã GV:</strong> {selectedTeacher.id}</Text>
                  <Text><strong>Tên:</strong> {selectedTeacher.tenGiangVien}</Text>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical" size="small">
                  <Text><strong>Khoa:</strong> {selectedTeacher.tenKhoa}</Text>
                  <Text><strong>Email:</strong> {selectedTeacher.mail}</Text>
                </Space>
              </Col>
            </Row>
          </Card>
        )}

        <Divider />

        <Row justify="end" gutter={8}>
          <Col>
            <Button onClick={() => {
              setSelectedTeacher(null);
              setTeacherSearchValue('');
            }}>
              Hủy
            </Button>
          </Col>
          <Col>
            <Button type="primary" icon={<CheckOutlined />} onClick={handleConfirmAssign} disabled={!selectedTeacher} s>
              Xác nhận phân công
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default PhanCongGiangVienModal;