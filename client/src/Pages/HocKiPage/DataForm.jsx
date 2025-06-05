import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { useContext } from 'react';

import { useData } from './context';
import { CreateHocKy, GetHocKyList } from '@/api/hocKiApi';

const { RangePicker } = DatePicker;

function DataForm() {
  const [{
    showModal,
    modelMode,
    yearList,
    formData: {
      tenKi, year, thoiGianBatDau, thoiGianKetThuc
    }
  }, dispatch] = useData();

  // const namHocList = [2023, 2024, 2025]
  async function onSubmit() {
    try {
      await CreateHocKy({ tenKi, thoiGianBatDau, thoiGianKetThuc })
    } catch (error) { console.log(error) }

    const data = await GetHocKyList()
    dispatch([
      { type: "updateModel", payload: false },
      { type: "resetFormData" },
      { type: "updateModelMode" },
      { type: "updateKyData", payload: data },
      { type: "updateSelectedYear", payload: 'all' }
    ])
  }

  console.log('ddddd',{ tenKi, year, thoiGianBatDau, thoiGianKetThuc})
  return (
    <Modal open={showModal} centered width={600} title={
      <h1 className="text-xl font-bold text-blue-900 uppercase">
        {modelMode == 'edit' ? 'Sửa học kì' : 'Thêm học kì mới'}
      </h1>}
      onCancel={() => {
        console.log("Test");
        dispatch([
          { type: "updateModel", payload: false },
          { type: "resetFormData" },
          { type: "updateModelMode" }
        ])
      }}
      footer={[
        <Button htmlType="submit" className="w-min self-end" variant="solid" color="orange" icon={<FontAwesomeIcon icon={faCheck} />}
          onClick={onSubmit}>
          Hoàn thành
        </Button>
      ]}>
      <Form layout="vertical" initialValues={{ trangThai: 'Chưa bắt đầu' }}>
        <Form.Item key="namHoc" name="namHoc" label="Năm học" rules={[{ required: true, message: 'Vui lòng chọn năm học!' }]}>
          <Select placeholder="Chọn năm học"
            value={year}
            options={yearList.map(i => ({ value: i, label: `${i}-${i + 1}` }))}
            onChange={e => {
              dispatch({ type: "updateFormData", payload: { name: "year", value: e } })
            }} />
        </Form.Item>
        <Form.Item key="thoiGian" name="thoiGian" label="Thời gian" rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}>
          <RangePicker className="w-full" format="DD/MM/YYYY" placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
            disabledDate={(current) => current <= new Date(year, 0, 1) || current > new Date(year + 1, 11, 31)}
            value={[thoiGianBatDau, thoiGianKetThuc]}
            onChange={e => {
              const start = e[0].toDate();
              const end = e[1].toDate();

              dispatch([
                { type: "updateFormData", payload: { name: "thoiGianBatDau", value: start } },
                { type: "updateFormData", payload: { name: "thoiGianKetThuc", value: end } },
              ])
            }} />
        </Form.Item>
        <Form.Item key="tenKy" name="tenKy" label="Tên học kỳ" rules={[{ required: true, message: 'Vui lòng nhập tên học kỳ!' }]}>
          <Input
            placeholder="Nhập tên học kỳ"
            value={tenKi}
            onChange={e => {
              dispatch({ type: "updateFormData", payload: { name: "tenKi", value: e.target.value } })
            }} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DataForm