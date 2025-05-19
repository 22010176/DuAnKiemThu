import axios from "axios"
import { useContext, useEffect } from "react"

import Context from "./context"
import { Button, DatePicker, Input, Radio, Select } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { convertDateToInput, parseDateFromInput } from "@/Utils/FormUtils"

function CreateForm() {
  const [state, dispatch] = useContext(Context)
  console.log(state)
  useEffect(function () {
    axios.get("http://localhost:5249/BangCap")
      .then(res => dispatch({ type: "updateBangCap", payload: res.data }))
    axios.get("http://localhost:5249/Khoa")
      .then(res => dispatch({ type: "updateKhoa", payload: res.data }))
    axios.get('http://localhost:5249/ChucVu')
      .then(res => dispatch({ type: "updateChucVu", payload: res.data }))
    dispatch({ type: "updateGVInput", payload: { name: "maGiangVien", value: `MK-${state.giangVienData.length + 1}` } })
  }, [])

  return (
    <form className="grid gap-5 grid-cols-[2fr_3fr]"
      onSubmit={async function (e) {
        e.preventDefault()
        // const data = Object.fromEntries(new FormData(e.target))
        console.log(JSON.stringify(state.formValue))
        // await axios.post('http://localhost:5249/Khoa', data)

      }
      }>
      <div>
        <label className="font-semibold">Mã giáo viên</label>
        <Input
          disabled
          name="maGiangVien"
          value={state.formValue.giangVien.maGiangVien} />
      </div>
      <div >
        <label className="font-semibold">Khoa</label>
        <br />
        <Select
          className="w-full"
          name="khoaId"
          onChange={e => dispatch({ type: "updateKhoaInput", payload: e })}
          value={state.formValue.khoaId}
          options={state.khoaData.map(i => ({ value: i.id, label: i.tenKhoa }))} />
      </div>
      <div className="col-span-2">
        <label className="font-semibold">Họ tên</label>
        <Input
          name="tenGiangVien"
          value={state.formValue.giangVien.tenGiangVien}
          onChange={e => dispatch({ type: "updateGVInput", payload: { name: e.target.name, value: e.target.value } })} />
      </div>

      <div>
        <label className="mb-5 font-semibold">Giới tính</label>
        <br />
        <Radio.Group
          className="w-full"
          name="gioiTinh"
          value={state.formValue.giangVien.gioiTinh}
          options={[{ value: 0, label: "Nam" }, { value: 1, label: "Nữ" }]}
          onChange={e => dispatch({ type: "updateGVInput", payload: { name: e.target.name, value: e.target.value } })} />
      </div>
      <div>
        <label className="font-semibold">Ngày sinh</label>
        <br />
        <input
          className="w-full border-1 rounded border-gray-300 p-1"
          type="date"
          name="sinhNhat"
          value={convertDateToInput(state.formValue.giangVien.sinhNhat)}
          onChange={e => {
            dispatch({ type: "updateGVInput", payload: { name: e.target.name, value: parseDateFromInput(e.target.value) } })
          }} />
      </div>
      <div>
        <label className="font-semibold">Số điện thoại</label>
        <Input
          name="soDienThoai"
          value={state.formValue.giangVien.soDienThoai}
          onChange={e => dispatch({ type: "updateGVInput", payload: { name: e.target.name, value: e.target.value } })} />
      </div>
      <div>
        <label className="font-semibold">Mail</label>
        <Input
          name="mail"
          value={state.formValue.giangVien.mail}
          onChange={e => dispatch({ type: "updateGVInput", payload: { name: e.target.name, value: e.target.value } })} />
      </div>
      <div>
        <label className="font-semibold">Bằng cấp</label>
        <Select
          name="bangCapId"
          className="w-full"
          value={state.formValue.giangVien.bangCapId}
          options={state.bangCapData.map(i => ({ value: i.id, label: i.tenBangCap }))}
          onChange={e => dispatch({ type: "updateGVInput", payload: { name: "bangCapId", value: e } })} />
      </div>
      <div>
        <label className="font-semibold">Chức vụ</label>
        <Select
          className="w-full"
          name="chucVuId"
          value={state.formValue.chucVuId}
          options={state.chucVuData.map(i => ({ value: i.id, label: i.tenChucVu }))} />
      </div>
      <div className="col-span-2 flex justify-end">
        <Button htmlType="submit" className="w-min" variant="solid" color="orange" icon={<FontAwesomeIcon icon={faCheck} />}>
          Hoàn thành
        </Button>
      </div>
    </form>
  )
}

export default CreateForm