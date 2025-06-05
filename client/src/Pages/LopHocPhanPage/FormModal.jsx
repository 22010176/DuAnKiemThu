import { CheckOutlined, SearchOutlined } from '@ant-design/icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faFilter, faPen, faPlus, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Button, Card, Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Space, Table, Tag, Tooltip, Typography, message } from 'antd';
import { useState } from 'react';

function FormModal() {
  const [form] = Form.useForm();
  const [bulkForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBulkModalVisible, setIsBulkModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
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

  return (
    <Modal
      title={<h1 className="text-xl font-bold text-blue-900 uppercase">{editingRecord ? 'Sửa lớp học phần' : 'Thêm lớp học phần mới'}</h1>}
      // open={true}
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button htmlType="submit" className="w-min self-end" variant="solid" color="orange"
          onClick={handleSubmit} key="submit">
          Hoàn thành
          {<FontAwesomeIcon icon={faCheck} />}
        </Button>
      ]}
      width={600}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="maLop" label="Mã lớp" rules={[{ required: true }]}>
              <Input disabled placeholder="VD: CNTT01_01" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="tenLop" label="Tên lớp" rules={[{ required: true }]}>
              <Input disabled placeholder="VD: Lập trình Java - Lớp 1" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="khoa" label="Khoa" rules={[{ required: true }]}>
              <Select placeholder="Chọn khoa">
                {khoaOptions.map(khoa => (
                  <Option key={khoa} value={khoa}>{khoa}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="maHocPhan" label="Học phần" rules={[{ required: true }]}>
              <Select placeholder="Chọn học phần">
                {hocPhanOptions.map(hp => <Option key={hp.ma} value={hp.ma}>{hp.ma} - {hp.ten} ({hp.tinChi} TC)</Option>)}
              </Select>
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="namHoc" label="Năm học" rules={[{ required: true }]}>
              <Select placeholder="Chọn năm học">
                {namHocOptions.map(nam => <Option key={nam} value={nam}>{nam}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="ky" label="Kỳ học" rules={[{ required: true }]}>
              <Select placeholder="Chọn kỳ">
                {kyOptions.map(ky => <Option key={ky} value={ky}>{ky}</Option>)}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="soSinhVien" label="Số sinh viên" rules={[{ required: true }]}>
              <InputNumber min={1} max={100} placeholder="45" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default FormModal;