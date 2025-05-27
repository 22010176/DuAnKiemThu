import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faChevronRight, faGear, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Collapse, ConfigProvider } from 'antd'
import { Link, useLocation } from 'react-router'

import logo from '@/assets/Logo.png'
import { useState } from 'react'

function Icon({ icon, className, ...props }) {
  return <FontAwesomeIcon icon={icon} className={[className, 'scale-150'].join(' ')} {...props} />
}

function SubLink({ to, active = false, content }) {
  return (
    <li className={[' list-disc text-lg', active && 'text-orange-400'].join(' ')}>
      <Link to={to} className='font-semibold' style={{ color: active ? "#FB8D18" : "#ffffff" }}>{content}</Link>
    </li>
  )
}

function SubLink2({ icon, to, content }) {
  return (
    <div className='flex gap-5 ps-5 items-center border-t-1 border-white py-5'>
      <Icon icon={icon} className='text-white' />
      <Link to={to} className='font-bold text-lg' style={{ color: "#ffffff" }}>{content}</Link>
    </div>
  )
}

const theme = {
  components: {
    Collapse: {
      contentBg: "#2D3064",
      colorText: "white",
      colorTextHeading: "white",
      headerPadding: "20px 15px"
    }
  },
}

const items = [
  { content: "Bằng cấp", to: "/bang-cap" },
  { content: "Khoa", to: "/khoa" },
  { content: "Giáo viên", to: "/giao-vien" },
  { content: "Thống kê", to: "/thong-ke" },
]
const links = items.map(i => i.to)

const items2 = [
  { content: "Thời khóa biểu", to: "", icon: faCalendar },
  { content: "Báo cáo - Tra cứu", to: "", icon: faMagnifyingGlass },
  { content: "Quản trị hệ thống", to: "", icon: faGear },
]

function Sidebar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(true)

  // console.log(pathname)

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: "#2D3064" }}>
      <img src={logo} />

      {/* Giang Vien */}
      <ConfigProvider theme={theme}>
        <Collapse
          accordion
          expandIconPosition='end'
          bordered={false}
          activeKey={(links.includes(pathname) || open) && "2"}
          expandIcon={({ isActive }) => <FontAwesomeIcon icon={faChevronRight} className='scale-130' rotation={isActive ? 90 : 0} />}
          items={[{
            key: "2",
            label: (
              <div className='flex gap-5 items-center' style={{ color: links.includes(pathname) ? "#FB8D18" : "#ffffff" }} onClick={() => setOpen(e => !e)}>
                <Icon icon={faUser} />
                <h1 className='font-bold text-lg' style={{ color: links.includes(pathname) ? "#FB8D18" : "#ffffff" }}>Giáo viên</h1>
              </div>
            ),
            children: (
              <ul className='flex flex-col gap-2 ps-5 relative'>
                {items.map((i, j) => <SubLink active={pathname === i.to} {...i} key={j} />)}
              </ul>
            ),
          }]} />
      </ConfigProvider>

      {/* Con lai */}
      <div className='border-b-1 border-white'>
        {items2.map((i, j) => <SubLink2 {...i} key={j} />)}
      </div>
    </div>
  )
}

export default Sidebar