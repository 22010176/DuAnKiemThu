import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, DatePicker, Input, message, Modal, Select } from 'antd';

import { CreateHocKy, GetHocKyList, UpdateHocKy } from '@/api/hocKiApi';
import { useData } from './context';

const { RangePicker } = DatePicker;

function DataForm() {
  const [{
    showModal, modelMode, formData },
    dispatch] = useData();
  const { id, tenKi, year, thoiGianBatDau, thoiGianKetThuc } = formData

  async function onSubmit() {
    // console.log(thoiGianBatDau, thoiGianKetThuc)

    if (!thoiGianBatDau) return message.error("Nhập thiếu thông tin!")
    if (!thoiGianKetThuc) return message.error("Nhập thiếu thông tin!")
    if (!tenKi) return message.error("Nhập thiếu thông tin!")
    if (thoiGianKetThuc.diff(thoiGianBatDau, 'month') < 4) return message.error("Thời gian kết thúc phải cách thời gian bắt đầu 4 tháng!")
    // const _bd = thoiGianBatDau.toDate(), _kt = thoiGianKetThuc.toDate();

    let result;
    try {
      if (modelMode == 'add') {
        result = await CreateHocKy({
          tenKi,
          thoiGianBatDau: thoiGianBatDau.toDate(),
          thoiGianKetThuc: thoiGianKetThuc.toDate()
        })
        message.success("Thêm học kì thành công!")
      }
      else if (modelMode == 'edit') {
        result = await UpdateHocKy({
          id: id,
          tenKi,
          thoiGianBatDau: thoiGianBatDau.toDate(),
          thoiGianKetThuc: thoiGianKetThuc.toDate()
        })
        message.success("Cập nhật học kì thành công!")
      }
    }
    catch (error) {
      console.log(error)
      message.error("Lỗi không thể thêm học kì!")
    }
    // console.log(result)
    // console.log({ id, tenKi, thoiGianBatDau, thoiGianKetThuc })
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
      <form className='flex flex-col gap-5' initialValues={{ trangThai: 'Chưa bắt đầu' }}>
        <div className='grid gap-2' key="namHoc" name="namHoc" label="Năm học" rules={[{ required: true, message: 'Vui lòng chọn năm học!' }]}>
          <label className='font-semibold'>Năm học</label>
          <Select
            placeholder="Chọn năm học"
            required
            value={year || undefined}
            options={new Array(5)
              .fill()
              .map((_, i) => {
                const nam = new Date().getFullYear() + i;
                return { value: nam, label: `${nam}-${nam + 1}` }
              })}
            onChange={e => dispatch([
              { type: "updateFormData", payload: { name: "year", value: e } }
            ])} />
        </div>
        <div className='grid gap-2' rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}>
          <label className='font-semibold'>Thời gian</label>
          <RangePicker className="w-full" format="DD/MM/YYYY" placeholder={['Ngày bắt đầu', 'Ngày kết thúc']} required
            disabledDate={(current) => current <= new Date(year, 0, 1) || current > new Date(year + 1, 11, 31)}
            value={[thoiGianBatDau, thoiGianKetThuc]}
            onChange={e => {
              const start = e[0];
              const end = e[1];
              dispatch([
                { type: "updateFormData", payload: { name: "thoiGianBatDau", value: start } },
                { type: "updateFormData", payload: { name: "thoiGianKetThuc", value: end } },
              ])
            }} />
        </div>
        <div className='grid gap-2' >
          <label className='font-semibold'>Tên học kỳ</label>
          <Input
            placeholder="Nhập tên học kỳ"
            value={tenKi}
            required
            onChange={e => {
              dispatch({ type: "updateFormData", payload: { name: "tenKi", value: e.target.value } })
            }} />
        </div>
      </form>
    </Modal>
  )
}

export default DataForm