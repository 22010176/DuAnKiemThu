import { CheckOutlined, SearchOutlined } from '@ant-design/icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faFilter, faPen, faPlus, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Button, Card, Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Space, Table, Tag, Tooltip, Typography, message } from 'antd';
import { useState } from 'react';


const { Option } = Select;
const { Search, } = Input;
const { Title, Text } = Typography;


function PhanCongGiangVienModal() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teacherSearchValue, setTeacherSearchValue] = useState('');
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [filters, setFilters] = useState({ khoa: '', namHoc: '2024-2025', ky: 'Kỳ 1' });

  // Mock data for classes
  const [classData, setClassData] = useState([
    { id: 1, maLop: 'CNTT01_01', tenLop: 'Lập trình Java - Lớp 1', hocPhan: 'Lập trình Java', maHocPhan: 'CNTT01', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 45, soTinChi: 3, trangThai: 'Đang mở', giangVien: null, maGiangVien: null },
    { id: 2, maLop: 'CNTT02_01', tenLop: 'Cơ sở dữ liệu - Lớp 1', hocPhan: 'Cơ sở dữ liệu', maHocPhan: 'CNTT02', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 40, soTinChi: 3, trangThai: 'Đang mở', giangVien: 'Nguyễn Văn A', maGiangVien: 'GV001' },
    { id: 3, maLop: 'CNTT01_02', tenLop: 'Lập trình Java - Lớp 2', hocPhan: 'Lập trình Java', maHocPhan: 'CNTT01', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 42, soTinChi: 3, trangThai: 'Đang mở', giangVien: null, maGiangVien: null }
  ]);

  // Mock teacher data
  const teacherList = [
    { id: 'GV001', name: 'Nguyễn Văn A', khoa: 'Công nghệ thông tin', email: 'nguyenvana@email.com' },
    { id: 'GV002', name: 'Trần Thị B', khoa: 'Công nghệ thông tin', email: 'tranthib@email.com' },
    { id: 'GV003', name: 'Lê Văn C', khoa: 'Công nghệ thông tin', email: 'levanc@email.com' },
    { id: 'GV004', name: 'Phạm Thị D', khoa: 'Kinh tế', email: 'phamthid@email.com' },
    { id: 'GV005', name: 'Hoàng Văn E', khoa: 'Ngoại ngữ', email: 'hoangvane@email.com' }
  ];

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
          if (item.id !== classId) return item;
          return { ...item, giangVien: null, maGiangVien: null };
        });
        setClassData(updatedClassData);
        message.success('Đã hủy phân công thành công!');
      }
    });
  };

  const selectedClasses = classData.filter(item => selectedRowKeys.includes(item.id));

  return (
    <Modal
      title="Phân công giảng viên"
      open={true}
      // open={isModalVisible}
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
  )
}

export default PhanCongGiangVienModal;