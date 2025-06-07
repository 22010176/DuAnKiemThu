import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, InputNumber, Modal, Row, Select, message } from 'antd';
import { useState } from 'react';

import { useData } from "./context";
import { CreateLopHocPhan, GetLopHocPhanList } from "@/api/lopHocPhanApi";

function BulkAddModal() {
  const [{
    addBulkModal, khoaData, hocPhanData, hocKiData, namHocData, bulkForm
  }, dispatch] = useData()
  const { hocPhanId, hocKiId, soLuongSinhVien, soLop } = bulkForm


  const [khoaId, setKhoaId] = useState()
  const [nam, setNam] = useState()

  const handleSubmit = async (values) => {
    const result = []
    for (let i = 0; i < soLop; ++i) {
      const res = await CreateLopHocPhan({ hocPhanId, hocKiId, soLuongSinhVien })
      result.push(res)
    }
    message.info(`Thêm thành công \n` + result.map(i => i.tenLop).join('\t'))
    // console.log({ hocPhanId, hocKiId, giangVienId, soLuongSinhVien, soLop })
    dispatch([
      { type: 'updateAddBulkModal', payload: false },
      { type: 'updateLopHocPhanData', payload: await GetLopHocPhanList() },
      { type: 'resetBulkForm' }
    ])
  };

  return (
    <Modal
      title={<h1 className="text-xl font-bold text-blue-900 uppercase">Tạo hàng loạt lớp học phần</h1>}
      open={addBulkModal}
      // open={true}
      onCancel={() => dispatch([
        { type: 'updateAddBulkModal', payload: false }

      ])}
      footer={[
        <Button htmlType="submit" className="w-min self-end" variant="solid" color="orange" onClick={handleSubmit} key="submit">
          Hoàn thành
          {<FontAwesomeIcon icon={faCheck} />}
        </Button>
      ]}
      width={600}>
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="khoa" label="Khoa" rules={[{ required: true }]}>
              <Select
                placeholder="Chọn khoa"
                value={khoaId}
                onChange={(value) => setKhoaId(value)}
                options={khoaData.map(khoa => ({ value: khoa.id, label: khoa.tenKhoa }))} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="maHocPhan" label="Học phần" rules={[{ required: true }]}>
              <Select
                placeholder="Chọn học phần"
                disabled={!khoaId}
                value={hocPhanId}
                onChange={(value) => dispatch([
                  { type: 'updateBulkForm', payload: { name: 'hocPhanId', value } }
                ])}
                options={hocPhanData.filter(hp => hp.khoaId == khoaId).map(hp => ({ value: hp.id, label: `${hp.maHocPhan}-${hp.tenHocPhan} (${hp.soTinChi} TC)` }))} />
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="namHoc" label="Năm học" rules={[{ required: true }]}>
              <Select
                placeholder="Chọn năm học"
                value={nam}
                onChange={(value) => setNam(value)}
                options={namHocData.map(nam => ({ value: nam.nam, label: `${nam.nam} - ${nam.nam + 1}` }))} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ky" label="Kỳ học" rules={[{ required: true }]}>
              <Select
                placeholder="Chọn kỳ"
                disabled={!nam}
                value={hocKiId}
                onChange={(value) => dispatch([
                  { type: 'updateBulkForm', payload: { name: 'hocKiId', value } }
                ])}
                options={hocKiData.filter(ky => new Date(ky.thoiGianBatDau).getFullYear() == nam).map(ky => ({ value: ky.id, label: ky.tenKi }))} />
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="soLop" label="Số lớp cần tạo" rules={[{ required: true }]}>
              <InputNumber min={1} max={20} placeholder="3" style={{ width: '100%' }}
                value={soLop}
                onChange={(value) => dispatch([
                  { type: 'updateBulkForm', payload: { name: 'soLop', value } }
                ])} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="soSinhVien" label="Số sinh viên mỗi lớp" rules={[{ required: true }]}>
              <InputNumber min={1} max={100} placeholder="45" style={{ width: '100%' }}
                value={soLuongSinhVien}
                onChange={(value) => dispatch([
                  { type: 'updateBulkForm', payload: { name: 'soLuongSinhVien', value } }
                ])} />
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </Modal>
  )
}

export default BulkAddModal;