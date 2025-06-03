import { createContext } from "react";

export const Context = createContext()

export const initialState = {
  hocPhanList: [],
  khoaList: [],
  selectedKhoa: null,
  searchText: "",
  showModal: false,
  modalMode: "add",
  form: {
    maHocPhan: "",
    tenHocPhan: "",
    Khoa: null,
    soTinChi: 0,
    soTiet: 0,
    heSoHocPhan: 0
  }
}

export const reducer = (state, action) => {
  const _state = { ...state }
  const _actions = Array.isArray(action) ? action : [action]

  for (const { type, payload } of _actions) switch (type) {
    // display or hide the modal
    case "updateModal":
      _state.showModal = payload // true | false
      break;

    // edit modal form or create modal form
    case "updateModalMode":
      _state.modalMode = payload // 'edit' | 'add' | undefined
      break;

    // reset form state
    case "resetForm":
      _state.form = { ...initialState.form }
      break;

    // update form state
    // name = 'maHocPhan' | 'tenHocPhan' | 'khoa' | 'soTinChi' | 'soTiet' | 'heSoHocPhan'
    case "updateForm":
      _state.form = {
        ..._state.form,
        [payload.name]: payload.value
      }
      break;


    default:
      break;
  }


  return _state
}