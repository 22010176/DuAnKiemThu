import axios from "axios";

export async function GetHeSoLopHocPhan() {
  const result = await axios.get('http://localhost:5249/HeSoLopHocPhan')
  return result.data
}

export async function CreateHeSoLopHocPhan({ soHocSinhToiThieu, heSo }) {
  const result = await axios.post('http://localhost:5249/HeSoLopHocPhan', { soHocSinhToiThieu, heSo })
  return result.data
}

export async function UpdateHeSoLopHocPhan({ id, soHocSinhToiThieu, heSo }) {
  const result = await axios.put(`http://localhost:5249/HeSoLopHocPhan/${id}`, { soHocSinhToiThieu, heSo })
  return result.data

}
export async function DeleteHeSoLopHocPhan({ id }) {
  const result = await axios.delete(`http://localhost:5249/HeSoLopHocPhan/${id}`)
  return result.data

}