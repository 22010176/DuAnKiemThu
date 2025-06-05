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
  const [form] = Form.useForm();
  const [bulkForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBulkModalVisible, setIsBulkModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // Mock data
  const [data, setData] = useState([
    { id: 1, maLop: 'CNTT01_01', tenLop: 'Lập trình Java - Lớp 1', hocPhan: 'Lập trình Java', maHocPhan: 'CNTT01', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 45, soTinChi: 3, trangThai: 'Đã phân công', giangVien: 'Nguyễn Văn A' },
    { id: 2, maLop: 'CNTT02_01', tenLop: 'Cơ sở dữ liệu - Lớp 1', hocPhan: 'Cơ sở dữ liệu', maHocPhan: 'CNTT02', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 40, soTinChi: 3, trangThai: 'Chưa phân công', giangVien: null },
    { id: 2, maLop: 'CNTT02_01', tenLop: 'Cơ sở dữ liệu - Lớp 1', hocPhan: 'Cơ sở dữ liệu', maHocPhan: 'CNTT02', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 40, soTinChi: 3, trangThai: 'Chưa phân công', giangVien: null },
    { id: 2, maLop: 'CNTT02_01', tenLop: 'Cơ sở dữ liệu - Lớp 1', hocPhan: 'Cơ sở dữ liệu', maHocPhan: 'CNTT02', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 40, soTinChi: 3, trangThai: 'Chưa phân công', giangVien: null },
    { id: 2, maLop: 'CNTT02_01', tenLop: 'Cơ sở dữ liệu - Lớp 1', hocPhan: 'Cơ sở dữ liệu', maHocPhan: 'CNTT02', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 40, soTinChi: 3, trangThai: 'Chưa phân công', giangVien: null },
    { id: 2, maLop: 'CNTT02_01', tenLop: 'Cơ sở dữ liệu - Lớp 1', hocPhan: 'Cơ sở dữ liệu', maHocPhan: 'CNTT02', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 40, soTinChi: 3, trangThai: 'Chưa phân công', giangVien: null },
    { id: 2, maLop: 'CNTT02_01', tenLop: 'Cơ sở dữ liệu - Lớp 1', hocPhan: 'Cơ sở dữ liệu', maHocPhan: 'CNTT02', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 40, soTinChi: 3, trangThai: 'Chưa phân công', giangVien: null },
    { id: 2, maLop: 'CNTT02_01', tenLop: 'Cơ sở dữ liệu - Lớp 1', hocPhan: 'Cơ sở dữ liệu', maHocPhan: 'CNTT02', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 40, soTinChi: 3, trangThai: 'Chưa phân công', giangVien: null },
    { id: 2, maLop: 'CNTT02_01', tenLop: 'Cơ sở dữ liệu - Lớp 1', hocPhan: 'Cơ sở dữ liệu', maHocPhan: 'CNTT02', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 40, soTinChi: 3, trangThai: 'Chưa phân công', giangVien: null },
    { id: 2, maLop: 'CNTT02_01', tenLop: 'Cơ sở dữ liệu - Lớp 1', hocPhan: 'Cơ sở dữ liệu', maHocPhan: 'CNTT02', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 40, soTinChi: 3, trangThai: 'Chưa phân công', giangVien: null },
    { id: 2, maLop: 'CNTT02_01', tenLop: 'Cơ sở dữ liệu - Lớp 1', hocPhan: 'Cơ sở dữ liệu', maHocPhan: 'CNTT02', khoa: 'Công nghệ thông tin', ky: 'Kỳ 1', namHoc: '2024-2025', soSinhVien: 40, soTinChi: 3, trangThai: 'Chưa phân công', giangVien: null },
  ]);

  const khoaOptions = ['Công nghệ thông tin', 'Kinh tế', 'Ngoại ngữ', 'Cơ khí'];
  const namHocOptions = ['2024-2025', '2023-2024', '2022-2023'];
  const kyOptions = ['Kỳ 1', 'Kỳ 2', 'Kỳ hè'];

  const hocPhanOptions = [
    { ma: 'CNTT01', ten: 'Lập trình Java', tinChi: 3 },
    { ma: 'CNTT02', ten: 'Cơ sở dữ liệu', tinChi: 3 },
    { ma: 'CNTT03', ten: 'Mạng máy tính', tinChi: 2 },
    { ma: 'KT01', ten: 'Kinh tế vi mô', tinChi: 3 }
  ];

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa lớp học phần này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => {
        setData(data.filter(item => item.id !== id));
        message.success('Xóa thành công!');
      }
    });
  };

  const handleSubmit = (values) => {
    const selectedHocPhan = hocPhanOptions.find(hp => hp.ma === values.maHocPhan);

    if (editingRecord) {
      setData(data.map(item =>
        item.id === editingRecord.id
          ? {
            ...item,
            ...values,
            hocPhan: selectedHocPhan?.ten,
            soTinChi: selectedHocPhan?.tinChi
          }
          : item
      ));
      message.success('Cập nhật thành công!');
    } else {
      const newRecord = {
        id: Date.now(),
        ...values,
        hocPhan: selectedHocPhan?.ten,
        soTinChi: selectedHocPhan?.tinChi,
        giangVien: null
      };
      setData([...data, newRecord]);
      message.success('Thêm mới thành công!');
    }
    setIsModalVisible(false);
  };

  const handleBulkSubmit = (values) => {
    const selectedHocPhan = hocPhanOptions.find(hp => hp.ma === values.maHocPhan);
    const newRecords = [];

    for (let i = 1; i <= values.soLop; i++) {
      newRecords.push({
        id: Date.now() + i,
        maLop: `${values.maHocPhan}_${i.toString().padStart(2, '0')}`,
        tenLop: `${selectedHocPhan?.ten} - Lớp ${i}`,
        hocPhan: selectedHocPhan?.ten,
        maHocPhan: values.maHocPhan,
        khoa: values.khoa,
        ky: values.ky,
        namHoc: values.namHoc,
        soSinhVien: values.soSinhVien,
        soTinChi: selectedHocPhan?.tinChi,
        trangThai: 'Chưa phân công',
        giangVien: null
      });
    }

    setData([...data, ...newRecords]);
    message.success(`Tạo thành công ${values.soLop} lớp học phần!`);
    setIsBulkModalVisible(false);
  };

  const selectedTeacher = {};
  const selectedClasses = []
  return (
    <Modal title="Phân công giảng viên" open={true}
      footer={[]} width={700}
      onCancel={() => { }}>
      <div style={{ marginBottom: '16px' }}>
        <Title level={4}>Danh sách lớp được chọn:</Title>
        <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #d9d9d9', padding: '8px', borderRadius: '4px' }}>
          {selectedClasses?.map(cls => (
            <div key={cls?.id} style={{ padding: '4px 0', borderBottom: '1px solid #f0f0f0' }}>
              <Space>
                <Tag color="blue">{cls?.maLop}</Tag>
                <Text>{cls?.tenLop}</Text>
                <Text type="secondary">({cls?.soSinhVien} SV)</Text>
              </Space>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div style={{ marginBottom: '16px' }}>
        <Title level={4}>Chọn giảng viên:</Title>
        <AutoComplete style={{ width: '100%' }} options={[]} placeholder="Nhập mã GV hoặc tên giảng viên để tìm kiếm...">
          <Input suffix={<SearchOutlined />} />
        </AutoComplete>
      </div>

      {selectedTeacher && (
        <Card size="small" style={{ marginBottom: '16px', backgroundColor: '#f6ffed', border: '1px solid #b7eb8f' }}>
          <Row gutter={16}>
            <Col span={12}>
              <Space direction="vertical" size="small">
                <Text><strong>Mã GV:</strong> {selectedTeacher?.id}</Text>
                <Text><strong>Tên:</strong> {selectedTeacher?.name}</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction="vertical" size="small">
                <Text><strong>Khoa:</strong> {selectedTeacher?.khoa}</Text>
                <Text><strong>Email:</strong> {selectedTeacher?.email}</Text>
              </Space>
            </Col>
          </Row>
        </Card>
      )}

      <Divider />

      <Row justify="end" gutter={8}>
        <Col>
          <Button onClick={() => { }}>
            Hủy
          </Button>
        </Col>
        <Col>
          <Button type="primary" icon={<CheckOutlined />}>
            Xác nhận phân công
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default PhanCongGiangVienModal;