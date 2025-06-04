import axios from "axios";

export async function CreateHocKy({ tenKi, thoiGianBatDau, thoiGianKetThuc }) {
  try {
    const response = await axios.post('http://localhost:5249/HocKi',
      { tenKi, thoiGianBatDau, thoiGianKetThuc });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function GetHocKyList() {
  try {
    const response = await axios.get('http://localhost:5249/HocKi');
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function DeleteHocKy(id) {
  try {
    const result = await axios.delete(`http://localhost:5249/HocKi/${id}`)
    return result.data
  } catch (error) {
    return error
  }
}