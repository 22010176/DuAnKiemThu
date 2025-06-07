import { createContext, useContext } from "react";

export const Context = createContext()

export const initialState = {
  hocPhanData: [],
  lopHocPhanData: [],
  filterLopHocPhan: [],
  hocKiData: [],
  giangVienData: [],
  khoaData: [],
  namHocData: [],
  selectedLopHocPhan: [],
  addModal: false,
  addBulkModal: false,
  giangVienModal: false,
  filterForm: {
    khoaId: 'all',
    namHoc: 'all',
    hocKiId: 'all',
    trangThai: 'all',
    lop: ''
  },
  form: {
    hocPhanId: '',
    hocKiId: '',
    giangVienId: '',
    soLuongSinhVien: 0
  },
  bulkForm: {
    hocPhanId: '',
    hocKiId: '',
    giangVienId: '',
    soLuongSinhVien: 0,
    soLop: 0
  }
}

export const reducer = (state, action) => {
  console.warn('new Dispatch: ')
  const _state = { ...state }
  const _actions = Array.isArray(action) ? action : [action]

  reducerLoop: for (const { type, payload } of _actions) {
    const _payload = typeof payload == 'function' ? payload(_state) : payload

    switch (type) {
      // _payload = { name: '', value }
      case 'updateBulkForm':
        _state.bulkForm[_payload.name] = _payload.value ?? null
        break

      case 'resetBulkForm':
        _state.bulkForm = { ...initialState.bulkForm }
        break
      // _payload = []
      case 'updateFilterLopHocPhan':
        _state.filterLopHocPhan = _payload
        break

      // _payload = []
      case 'updateGiangVienData':
        _state.giangVienData = _payload
        break

      // _payload = true | false
      case 'updateGiangVienModal':
        _state.giangVienModal = _payload
        break

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

      // _payload = { name: '', value }
      case 'updateFilterForm':
        _state.filterForm[_payload.name] = _payload.value ?? null
        break

      // _payload = []
      case 'updateNamHocData':
        _state.namHocData = _payload
        break

      // _payload = []
      case "updateHocKiData":
        _state.hocKiData = _payload
        break

      case 'resetForm':
        _state.form = { ...initialState.form }
        break

      // _payload = [ {}, {}, ... ]
      case 'updateSelectedRows':
        _state.selectedLopHocPhan = _payload
        break

      default:
        console.log('Failed: ', { type, _payload })
        continue reducerLoop
    }
    console.log('Success: ', { type, _payload, _state })
  }

  return _state
}

export function useData() { return useContext(Context) }