import '@ant-design/v5-patch-for-react-19';
import { BrowserRouter, Route, Routes } from "react-router";

import MainLayout from "@/Layouts/MainLayout";

import BangCapPage from "@/Pages/BangCapPage";
import KhoaPage from "@/Pages/KhoaPage";
import GiaoVienPage from "@/Pages/GiaovienPage";
import ThongKePage from '@/Pages/ThongKePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="khoa" element={<KhoaPage />} />
          <Route path="bang-cap" element={<BangCapPage />} />
          <Route path="giao-vien" element={<GiaoVienPage />} />
          <Route path="thong-ke" element={<ThongKePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
