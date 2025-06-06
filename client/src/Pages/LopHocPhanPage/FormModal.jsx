import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, InputNumber, Modal, Row, Select, message } from 'antd';

import { CreateLopHocPhan, GetLopHocPhanList } from '@/api/lopHocPhanApi';
import { useState } from 'react';
import { useData } from './context';

function FormModal() {
  const [messageApi, contextHolder] = message.useMessage()
  const [{
    addModal, khoaData, hocPhanData, hocKiData, namHocData, giangVienData, form
  }, dispatch] = useData()
  const { hocPhanId, hocKiId, giangVienId, soLuongSinhVien } = form;

  const [khoaId, setKhoaId] = useState()
  const [nam, setNam] = useState()

  const [editingRecord, setEditingRecord] = useState(null);

  const handleSubmit = async () => {
    const result = await CreateLopHocPhan({ hocPhanId, hocKiId, giangVienId, soLuongSinhVien })
    messageApi.success(`Thêm thành công ${result.tenLop}`)
    dispatch([
      { type: "updateAddModal", payload: false },
      { type: "updateLopHocPhanData", payload: await GetLopHocPhanList() },
      { type: 'resetForm' }
    ])
  };
  return (
    <>
      {contextHolder}
      <Modal
        open={addModal}
        width={1200}
        title={<h1 className="text-xl font-bold text-blue-900 uppercase">
          {editingRecord ? 'Sửa lớp học phần' : 'Thêm lớp học phần mới'}
        </h1>}
        onCancel={() => dispatch([
          { type: "updateAddModal", payload: false },
          { type: 'resetForm' }
        ])}
        footer={[
          <Button htmlType="submit" className="w-min self-end" variant="solid" color="orange"
            onClick={handleSubmit} key="submit">
            Hoàn thành
            {<FontAwesomeIcon icon={faCheck} />}
          </Button>
        ]}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="khoa" label="Khoa" rules={[{ required: true }]}>
                <Select
                  placeholder="Chọn khoa"
                  value={khoaId}
                  onChange={a => {
                    setKhoaId(a)
                    dispatch([
                      { type: "updateForm", payload: { name: 'hocPhanId' } }
                    ])
                  }}
                  options={khoaData.map(khoa => ({ value: khoa.id, label: khoa.tenKhoa }))} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="maHocPhan" label="Học phần" rules={[{ required: true }]}>
                <Select
                  placeholder="Chọn học phần"
                  disabled={!khoaId}
                  value={hocPhanId}
                  onChange={a => dispatch([{ type: "updateForm", payload: { name: 'hocPhanId', value: a } }])}
                  options={hocPhanData.filter(hp => hp.khoaId == khoaId).map(hp => ({ value: hp.id, label: `${hp.maHocPhan}-${hp.tenHocPhan} (${hp.soTinChi} TC)` }))} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="namHoc" label="Năm học" rules={[{ required: true }]}>
                <Select
                  placeholder="Chọn năm học"
                  value={nam}
                  onChange={a => {
                    setNam(a)
                    dispatch([
                      { type: "updateForm", payload: { name: 'hocKiId' } }
                    ])
                  }}
                  options={namHocData.map(nam => ({ value: nam.nam, label: `${nam.nam} - ${nam.nam + 1}` }))} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="ky" label="Kỳ học" rules={[{ required: true }]}>
                <Select
                  placeholder="Chọn kỳ"
                  disabled={!nam}
                  value={hocKiId}
                  onChange={a => dispatch([
                    { type: "updateForm", payload: { name: 'hocKiId', value: a } }
                  ])}
                  options={hocKiData.filter(ky => new Date(ky.thoiGianBatDau).getFullYear() == nam).map(ky => ({ value: ky.id, label: ky.tenKi }))} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="soSinhVien" label="Số sinh viên" rules={[{ required: true }]}>
                <InputNumber min={1} max={100} placeholder="45" style={{ width: '100%' }}
                  value={soLuongSinhVien}
                  onChange={a => dispatch([
                    { type: "updateForm", payload: { name: 'soLuongSinhVien', value: a } }
                  ])} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default FormModal;