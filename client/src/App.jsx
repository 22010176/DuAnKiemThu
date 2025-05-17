import { BrowserRouter, Route, Routes } from "react-router"
import '@ant-design/v5-patch-for-react-19';

import MainLayout from "@/Layouts/MainLayout"
import KhoaPage from "@/Pages/KhoaPage"
import BangCapPage from "@/Pages/BangCapPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="khoa" element={<KhoaPage />} />
          <Route path="bang-cap" element={<BangCapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
