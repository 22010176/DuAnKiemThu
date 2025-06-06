import { createContext, useContext } from "react";

export const Context = createContext()

export const initialState = {
  hocPhanData: [],
  lopHocPhanData: [],
  hocKiData: [],
  giangVienData: [],
  khoaData: [],
  namHocData: [],
  addModal: false,
  addBulkModal: false,
  form: {
    maLop: '',
    tenLop: '',
    hocPhanId: '',
    hocKiId: '',
    giangVienId: '',
    soLuongSinhVien: 0
  }
}

export const reducer = (state, action) => {
  const _state = { ...state }
  const _actions = Array.isArray(action) ? action : [action]

  reducerLoop: for (const { type, payload } of _actions) {
    const _payload = typeof payload == 'function' ? payload(_state) : payload

    switch (type) {
      // _payload = []
      case 'updateLopHocPhanData':
        _state.lopHocPhanData = _payload
        break

      // _payload = true | false
      case 'updateAddModal':
        _state.addModal = _payload
        break

      // _payload = true | false
      case 'updateAddBulkModal':
        _state.addBulkModal = _payload
        break

      // _payload = []
      case 'updateKhoaData':
        _state.khoaData = _payload
        break

      // _payload = []
      case 'updateHocPhanData':
        _state.hocPhanData = _payload
        break

      // _payload = { name: '', value }
      case 'updateForm':
        _state.form[_payload.name] = _payload.value ?? null
        break

      case 'updateNamHocData':
        _state.namHocData = _payload
        break

      case "updateHocKiData":
        _state.hocKiData = _payload
        break

      case 'resetForm':
        _state.form = { ...initialState.form }
        break


      default:
        console.log('Failed: ', { type, _payload })
        continue reducerLoop
    }
    console.log({ type, _payload, state })
  }

  return _state
}

export function useData() { return useContext(Context) }