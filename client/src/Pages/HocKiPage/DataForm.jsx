import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { useContext } from 'react';

import { Context } from './context';
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
  }, dispatch] = useContext(Context);

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
  return (
    <Modal open={showModal} centered width={600} title={
      <h1 className="text-xl font-bold text-blue-900 uppercase">
        {modelMode == 'edit' ? 'Sửa học kì' : 'Thêm học kì mới'}
      </h1>}
      onCancel={() => dispatch([
        { type: "updateModel", payload: false },
        { type: "resetFormData" },
        { type: "updateModelMode" }
      ])}
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
            onChange={e => dispatch({ type: "updateFormData", payload: { name: "year", value: e } })}
            options={yearList.map(i => ({ value: i, label: `${i}-${i + 1}` }))} />
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
          <Input value={tenKi} placeholder="Nhập tên học kỳ"
            onChange={e => dispatch({ type: "updateFormData", payload: { name: "tenKi", value: e.target.value } })} />
          {/* <p className='border border-gray-400 h-8 py-1 px-2 bg-gray-100 opacity-50 rounded'>
            {formData?.tenKi}_{formData?.tenKi + 1}_{((kyData?.nam?.find(i => i.nam == formData?.tenKi)?.count) || 0) + 1}
          </p> */}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DataForm