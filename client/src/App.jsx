import '@ant-design/v5-patch-for-react-19';
import { BrowserRouter, Route, Routes } from "react-router";

import MainLayout from "@/Layouts/MainLayout";

import BangCapPage from "@/Pages/BangCapPage";
import KhoaPage from "@/Pages/KhoaPage";
import GiaoVienPage from "@/Pages/GiaovienPage";
import ThongKePage from '@/Pages/ThongKePage';
import HocKiPage from './Pages/HocKiPage';
import HocPhanPage from './Pages/HocPhanPage';
import LopHocPhanPage from './Pages/LopHocPhanPage';
import PhanCongGVPage from './Pages/PhanCongGVPage';
import ThongKeLopPage from './Pages/ThongKeLopPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="khoa" element={<KhoaPage />} />
          <Route path="bang-cap" element={<BangCapPage />} />
          <Route path="giao-vien" element={<GiaoVienPage />} />
          <Route path="thong-ke" element={<ThongKePage />} />

          <Route path="hoc-ki" element={<HocKiPage />} />
          <Route path="hoc-phan" element={<HocPhanPage />} />
          <Route path="thoi-khoa-bieu" element={<LopHocPhanPage />} />
          <Route path="phan-cong-gv" element={<PhanCongGVPage />} />
          <Route path="thong-ke-so-lop" element={<ThongKeLopPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
  // return <HocKiPage/>
}

export default App
