import { createContext } from "react";

export const Context = createContext()

export const initialState = {
  data: [],
  showModal: false,
  modelMode: "add",
  selectedYear: 'all',
  yearList: [2023, 2024, 2025, 2026],
  kyData: [],
  formData: {
    tenKi: '',
    year: 2024,
    thoiGianBatDau: undefined,
    thoiGianKetThuc: undefined,
  }
}

export const reducer = (state, action) => {
  const _state = { ...state }
  const _actions = Array.isArray(action) ? action : [action]

  for (const { type, payload } of _actions) switch (type) {
    // payload = 2020 | 'all'
    case 'updateSelectedYear':
      _state.selectedYear = payload
      break

    // payload = 'add' | 'edit' | null
    case 'updateModelMode':
      _state.modelMode = payload
      break

    // payload = true | false
    case 'updateModel':
      _state.showModal = payload
      break

    case 'resetForm':
    case 'resetFormData':
      _state.formData = { ...initialState.formData }
      break

    // payload = { name, value }
    case 'updateFormData':
      _state.formData = { ..._state.formData, [payload.name]: payload.value }
      break

    // payload = {}
    case 'setFormData':
      _state.formData = payload
      break

    // payload = []
    case 'updateYearList':
      _state.yearList = payload
      break

    // payload = []
    case 'updateKyData':
      _state.kyData = payload
      break

    default:
      break;
  }

  return _state
}