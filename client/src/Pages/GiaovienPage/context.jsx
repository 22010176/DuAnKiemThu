import axios from "axios";
import { createContext } from "react";
import structuredClone from '@ungap/structured-clone';

export const Context = createContext()

export const intitialValue = {
  formValue: {
    giangVien: {
      maGiangVien: "",
      tenGiangVien: "",
      gioiTinh: 0,
      sinhNhat: new Date(),
      soDienThoai: "",
      mail: "",
      bangCapId: ""
    },
    khoaId: "",
    chucVuId: ""
  },
  giangVienData: [],
  khoaData: [],
  bangCapData: [],
  chucVuData: []
}

export function reducer(state = {}, action = {}) {
  const _state = structuredClone(state)

  const { type, payload } = action
  // console.log({ type, payload })

  switch (type) {
    case 'updateGVInput':
      _state.formValue.giangVien[payload.name] = payload.value
      break
    case "updateKhoaInput":
      _state.formValue = { ..._state.formValue, khoaId: payload }
      break
    case "updateBangCap":
      _state.bangCapData = [...payload]
      _state.formValue.giangVien.bangCapId = payload[0]?.id
      break;
    case "updateKhoa":
      _state.khoaData = [...payload]
      _state.formValue = { ..._state.formValue, khoaId: payload[0]?.id }
      break
    case "updateChucVu":
      _state.chucVuData = [...payload]
      _state.formValue = {
        ..._state.formValue,
        chucVuId: payload[0]?.id
      }
      break


    default:
      break;
  }

  return _state;
}

export default Context;