import axios from "axios";

export async function GetLopHocPhanList() {
  const result = await axios.get(`http://localhost:5249/LopHocPhan`)
  return result.data
}