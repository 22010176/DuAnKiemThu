import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faChevronDown, faGear, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Collapse, ConfigProvider } from 'antd'
import { Link } from 'react-router'

import logo from '@/assets/Logo.png'

function Icon({ icon, className, ...props }) {
  return <FontAwesomeIcon icon={icon} className={[className, 'text-white scale-150'].join(' ')} {...props} />
}

function SubLink({ to, content }) {
  return (
    <li className='list-disc'>
      <Link to={to} className='font-semibold' style={{ color: "#ffffff" }}>{content}</Link>
    </li>
  )
}

function SubLink2({ icon, to, content }) {
  return (
    <div className='flex gap-5 ps-3.5 items-center border-t-1 border-white py-5'>
      <Icon icon={icon} className='text-white' />
      <Link to={to} className='font-bold' style={{ color: "#ffffff" }}>{content}</Link>
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
  { content: "Giảng viên", to: "/giao-vien" },
  { content: "Thống kê", to: "/thong-ke" },
]

const items2 = [
  { content: "Thời khóa biểu", to: "", icon: faCalendar },
  { content: "Báo cáo - Tra cứu", to: "", icon: faMagnifyingGlass },
  { content: "Quản trị hệ thống", to: "", icon: faGear },
]

function Sidebar() {
  return (
    <div className="w-60 h-full flex flex-col" style={{ backgroundColor: "#2D3064" }}>
      <img src={logo} />

      {/* Giang Vien */}
      <ConfigProvider theme={theme}>
        <Collapse
          expandIconPosition='end'
          bordered={false}
          expandIcon={({ isActive }) => <FontAwesomeIcon icon={faChevronDown} className='scale-130' rotation={isActive ? 0 : 90} />}
          items={[{
            label: (
              <div className='flex gap-5 items-center'>
                <Icon icon={faUser} />
                <h1 className='font-bold'>Giảng viên</h1>
              </div>
            ),
            children: (
              <ul className='flex flex-col gap-2 ps-5 relative'>
                {items.map((i, j) => <SubLink {...i} key={j} />)}
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