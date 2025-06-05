import axios from "axios";

export async function GetNamHocList() {
  const result = await axios.get('http://localhost:5249/LopHocPhanThongKe/nam-hoc-ki')
  return result.data
}