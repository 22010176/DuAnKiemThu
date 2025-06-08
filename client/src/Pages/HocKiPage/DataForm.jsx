import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, DatePicker, Input, message, Modal, Select } from 'antd';

import { CreateHocKy, GetHocKyList, UpdateHocKy } from '@/api/hocKiApi';
import { useData } from './context';

const { RangePicker } = DatePicker;

function DataForm() {
  const [{
    showModal, modelMode, yearList, formData },
    dispatch] = useData();
  const { id, tenKi, year, thoiGianBatDau, thoiGianKetThuc } = formData

  async function onSubmit() {
    console.log(thoiGianBatDau, thoiGianKetThuc)
    if (!thoiGianBatDau) return message.error("Thời gian bắt đầu không được để trống!")
    if (!thoiGianKetThuc) return message.error("Thời gian kết thúc không được để trống!")
    if (!tenKi) return message.error("Tên kì không được để trống!")

    let result;
    try {
      if (modelMode == 'add') result = await CreateHocKy({
        tenKi,
        thoiGianBatDau: thoiGianBatDau.toDate(),
        thoiGianKetThuc: thoiGianKetThuc.toDate()
      })
      else if (modelMode == 'edit') result = await UpdateHocKy({
        id: id,
        tenKi,
        thoiGianBatDau: thoiGianBatDau.toDate(),
        thoiGianKetThuc: thoiGianKetThuc.toDate()
      })
    } catch (error) {
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
            value={year}
            options={yearList.map(nam => ({ value: nam.nam, label: `${nam.nam}-${nam.nam + 1}` }))}
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